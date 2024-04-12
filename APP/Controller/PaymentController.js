import * as paymentService from '../Service/PaymentService.js';
import * as orderService from '../Service/OrderService.js';
import dotenv from 'dotenv';
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';
import { SequelizeInstance } from '../utility/DbHelper.js';
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
  var orderId = req.body.orderId;
  try {
    var ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.VNPAY_TMNCODE;
    var secretKey = process.env.VNPAY_SECRETKEY;
    var vnpUrl = process.env.VNPAY_URL;
    var returnUrl = process.env.VNPAY_RETURNURL;
    var date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    const [order] = await orderService.getOrdersByOrderId(orderId);
    if (!order) throw new Error('YOUR PAYMENT METHOD NOT VN PAY');
    var amount = order.total;
    var bankCode = 'NCB';

    var orderInfo = 'PAYMENT ONLINE';
    var orderType = '130000';
    var locale = 'vn';
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

    res.send({ vnpUrl });
  } catch (e) {
    await orderService.deleteOrderAndOrderDetailByOrderByID(orderId);
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

    var tmnCode = process.env.VNPAY_TMNCODE;
    var secretKey = process.env.VNPAY_SECRETKEY;
    var vnpUrl = process.env.VNPAY_URL;
    var returnUrl = process.env.VNPAY_RETURNURL;
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    var orderId = vnp_Params['vnp_TxnRef'];

    if (secureHash === signed) {
      var rspCode = vnp_Params['vnp_ResponseCode'];
      console.log(vnp_Params);
      res.status(200).json({ RspCode: '00', Message: 'success' });
    } else {
      await orderService.deleteOrderAndOrderDetailByOrderByID(orderId);
      res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
  } catch (e) {
    await orderService.deleteOrderAndOrderDetailByOrderByID(orderId);
    console.log(e);
    res.send(e);
  }
}

export async function getVnpayReturn(req, res) {
  console.log(`~~~~~ GOT HERE`);
  const t = await SequelizeInstance.transaction();
  try {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.VNPAY_TMNCODE;
    var secretKey = process.env.VNPAY_SECRETKEY;
    var vnpUrl = process.env.VNPAY_URL;
    var returnUrl = process.env.VNPAY_RETURNURL;

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
    t.commit();
  } catch (e) {
    t.rollback();
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
