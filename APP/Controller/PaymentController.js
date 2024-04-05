import * as paymentService from '../Service/PaymentService.js';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as orderService from '../Service/OrderService.js';
import dotenv from 'dotenv';
import config from 'config';
import dateFormat from 'dateformat';
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';
dotenv.config();

export async function getPayment(req, res, next) {
  try {
    const result = await paymentService.getPayment();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createPaymentUrl(req, res, next) {
  try {
    var ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.VNPAY_TMNCODE || config.get('vnp_TmnCode');
    var secretKey = process.env.VNPAY_SECRETKEY || config.get('vnp_HashSecret');
    var vnpUrl = process.env.VNPAY_URL || config.get('vnp_Url');
    var returnUrl = process.env.VNPAY_RETURNURL || config.get('vnp_ReturnUrl');

    var date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    var orderId = req.body.orderId;
    var amount = Number(req.body.amount);
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl);

    res.send(vnpUrl);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}

export async function getVnpayIpn(req, res) {
  try {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.VNPAY_TMNCODE || config.get('vnp_TmnCode');
    var secretKey = process.env.VNPAY_SECRETKEY || config.get('vnp_HashSecret');
    var vnpUrl = process.env.VNPAY_URL || config.get('vnp_Url');
    var returnUrl = process.env.VNPAY_RETURNURL || config.get('vnp_ReturnUrl');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];
      console.log(vnp_Params);
      res.status(200).json({ RspCode: '00', Message: 'success' });
    } else {
      res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}

export async function getVnpayReturn(req, res) {
  console.log(`~~~~~ GOT HERE`);
  try {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.VNPAY_TMNCODE || config.get('vnp_TmnCode');
    var secretKey = process.env.VNPAY_SECRETKEY || config.get('vnp_HashSecret');
    var vnpUrl = process.env.VNPAY_URL || config.get('vnp_Url');
    var returnUrl = process.env.VNPAY_RETURNURL || config.get('vnp_ReturnUrl');

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    const orderId = vnp_Params['vnp_TxnRef'];

    if (secureHash === signed) {
      console.log(vnp_Params);
      await orderService.updateOrderPaymentStatus(orderId, true);
      res.send({ code: vnp_Params['vnp_ResponseCode'], success: true });
    } else {
      await orderService.updateOrderPaymentStatus(orderId, false);
      res.send({ code: '97', success: false });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
