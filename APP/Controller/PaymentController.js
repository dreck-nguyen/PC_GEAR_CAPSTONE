import * as paymentService from '../Service/PaymentService.js';
import * as orderService from '../Service/OrderService.js';
import dotenv from 'dotenv';
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';
import { SequelizeInstance } from '../utility/DbHelper.js';
// import transporter from '../utility/MailHelper.js';
import * as mailHelper from '../utility/MailHelper.js';
import * as userDAL from '../DAL/UserDAL.js';
dotenv.config();

dotenv.config();

export async function getPayment(req, res, next) {
  try {
    let result = await paymentService.getPayment();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createPaymentUrl(req, res, next) {
  var orderId = req?.body?.orderId || null;
  try {
    if (!orderId) throw new Error(' order_id is null');
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
    if (!orderId) throw new Error('YOUR PAYMENT METHOD NOT VN PAY');
    let [order] = await orderService.getOrdersByOrderId(orderId);
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
    if (orderId)
      await orderService.deleteOrderAndOrderDetailByOrderByID(orderId);
    console.log(e);
    res.send(e);
  }
}

export async function getVnpayIpn(req, res) {
  let orderId = '';
  try {
    if (!orderId) throw new Error(' order_id is null');
    var vnp_Params = req.query;
    orderId = vnp_Params['vnp_TxnRef'] ?? null;
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
  let vnp_Params = req.query;
  let t = await SequelizeInstance.transaction();

  let orderId = vnp_Params['vnp_TxnRef'] ?? null;
  try {
    var total = Number(vnp_Params['vnp_Amount']) || 1000000;
    if (!orderId) throw new Error(' order_id is null');
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
    let [user] = await userDAL.getUserByOrder(orderId);

    console.log(`~~~~~~`, orderId);
    if (secureHash === signed) {
      console.log(vnp_Params);
      let code = vnp_Params['vnp_ResponseCode'];
      let message = handleErrorCode(code);
      let messageMail = mailHelper.paymentConfirm
        .replace('[Customer Name]', user.user_name)
        .replace('[Order Number]', orderId)
        .replace('[Payment Method]', `VN PAY`)
        .replace('[Total Amount]', total)
        .replace('[Payment Status]', message);
      await orderService.updateOrderPaymentStatus(orderId, true, message);
      let mailOptions = {
        to: user.email,
        html: messageMail,
      };
      await mailHelper.sendMail(mailOptions);
      res.send({ code: vnp_Params['vnp_ResponseCode'], success: true });
    } else {
      // await orderService.updateOrderPaymentStatus(orderId, false);
      res.send({ code: '97', success: false });
    }
    await t.commit();
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
function handleErrorCode(errorCode) {
  let errorMessage = '';
  switch (errorCode) {
    case '00':
      errorMessage = 'Transaction successful';
      break;
    case '07':
      errorMessage =
        'Transaction successful but flagged for suspicious activity.';
      break;
    case '09':
      errorMessage =
        "Transaction unsuccessful: Customer's card/account not registered for Internet Banking service.";
      break;
    case '10':
      errorMessage =
        "Transaction unsuccessful: Customer's authentication failed more than 3 times.";
      break;
    case '11':
      errorMessage =
        'Transaction unsuccessful: Payment waiting period expired. Please retry transaction.';
      break;
    case '12':
      errorMessage =
        "Transaction unsuccessful: Customer's card/account is locked.";
      break;
    case '13':
      errorMessage =
        'Transaction unsuccessful: Incorrect transaction authentication password (OTP) entered. Please retry transaction.';
      break;
    case '24':
      errorMessage = 'Transaction canceled by customer.';
      break;
    case '51':
      errorMessage =
        "Transaction unsuccessful: Insufficient funds in customer's account.";
      break;
    case '65':
      errorMessage =
        "Transaction unsuccessful: Customer's account has exceeded daily transaction limit.";
      break;
    case '75':
      errorMessage = 'Payment bank is under maintenance.';
      break;
    case '79':
      errorMessage =
        'Transaction unsuccessful: Customer entered incorrect payment password too many times. Please retry transaction.';
      break;
    case '99':
      errorMessage =
        'Other errors (errors not listed in the given error codes).';
      break;
    default:
      errorMessage = 'Invalid error code';
  }
  return errorMessage;
}

// console.log(handleErrorCode(errorCode));
export async function sendMail(req, res) {
  try {
    let email = process.env.FEATURE_MAIL;
    // let pass = process.env.FEATURE_PASSWORD;
    let mailOptions = {
      from: 'noreplyemail@gmail.com',
      to: 'hduy01012000@gmail.com',
      subject: 'Test Email',
      text: 'Hello, this is a test email!',
    };
    let result = await mailHelper.sendMail(mailOptions);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
}
