import * as orderDAL from '../DAL/OrderDAL.js';
import * as userDAL from '../DAL/UserDAL.js';
import * as orderDetailDAL from '../DAL/OrderDetailDAL.js';
import * as cartItemDAL from '../DAL/CartItemDAL.js';
import { v4 as uuidv4 } from 'uuid';

import * as mailHelper from '../utility/MailHelper.js';
export async function getUsersOrder() {
  const result = await orderDAL.getUsersOrder();
  return result;
}

export async function getOrderByUserId(loginUser, limit, offset) {
  const user_id = loginUser.user_id;
  const count = await orderDAL.countUserOrder(user_id);
  const result = await orderDAL.getOrderByUserId(
    user_id,
    limit,
    offset * limit,
  );
  return { count, result, limit, offset };
}
export async function getOrderById(orderId) {
  const result = await orderDAL.getOrderById(orderId);
  return result;
}

export async function createOrderByUser(loginUser, cartObject) {
  const userId = loginUser.user_id;
  const [user] = await userDAL.getUserById(userId);
  if (!user) return;
  const orderId = uuidv4();
  cartObject.userId = userId;
  cartObject.orderId = orderId;
  let quantity = 0;
  let total = 0;
  const cartItems = cartObject.cartItemList
    .map((e) => e.cart_item_id)
    .join(',');
  const cart = await cartItemDAL.getCartItemByUser(userId, cartItems);
  if (!cart.length) return;
  for (const cartItem of cart) {
    if (cartItem.product_id) {
      quantity += Number(cartItem.quantity);
      total += Number(cartItem.unit_price * cartItem.quantity);

      const orderDetails = {
        order_detail_id: uuidv4(),
        order_id: orderId,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        unit_price: cartItem.unit_price,
      };
      await orderDetailDAL.createOrderDetail(orderDetails);
    } else {
      const preBuildPc = cartItem.build_pc;
      if (preBuildPc.motherboard_id && preBuildPc.motherboard_specification) {
        quantity += 1;
        total +=
          preBuildPc.motherboard_specification.unit_price > 0
            ? Number(preBuildPc.motherboard_specification.unit_price)
            : 0;
        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.motherboard_id,
          quantity: 1,
          unit_price: preBuildPc.motherboard_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.processor_id && preBuildPc.processor_specification) {
        quantity += 1;
        total +=
          preBuildPc.processor_specification.unit_price > 0
            ? Number(preBuildPc.processor_specification.unit_price)
            : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.processor_id,
          quantity: 1,
          unit_price: preBuildPc.processor_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.case_id) {
        quantity += 1;
        total +=
          preBuildPc.case_specification.unit_price > 0
            ? Number(preBuildPc.case_specification.unit_price)
            : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.case_id,
          quantity: 1,
          unit_price: preBuildPc.case_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.gpu_id) {
        quantity += 1;
        total +=
          preBuildPc.gpu_specification.unit_price > 0
            ? Number(preBuildPc.gpu_specification.unit_price)
            : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.gpu_id,
          quantity: 1,
          unit_price: preBuildPc.gpu_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.ram_id) {
        quantity += preBuildPc.ram_quantity;
        total +=
          preBuildPc.ram_specification.unit_price > 0 &&
          preBuildPc.ram_quantity > 0
            ? Number(
                preBuildPc.ram_specification.unit_price *
                  preBuildPc.ram_quantity,
              )
            : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.ram_id,
          quantity: preBuildPc.ram_quantity,
          unit_price: preBuildPc.ram_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.storage_id) {
        quantity += preBuildPc.storage_quantity;
        total +=
          preBuildPc.storage_specification.unit_price > 0 &&
          preBuildPc.storage_quantity > 0
            ? Number(
                preBuildPc.storage_specification.unit_price *
                  preBuildPc.storage_quantity,
              )
            : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.storage_id,
          quantity: preBuildPc.storage_quantity,
          unit_price: preBuildPc.storage_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.case_cooler_id) {
        quantity += 1;
        total +=
          preBuildPc.case_cooler.unit_price > 0
            ? Number(preBuildPc.case_cooler.unit_price)
            : 0;
        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.case_cooler_id,
          quantity: 1,
          unit_price: preBuildPc.case_cooler.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.monitor_id) {
        quantity += 1;
        total +=
          preBuildPc.monitor.unit_price > 0
            ? Number(preBuildPc.monitor.unit_price)
            : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.monitor_id,
          quantity: 1,
          unit_price: preBuildPc.monitor.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.cpu_cooler_id) {
        quantity += 1;
        total +=
          preBuildPc.cpu_cooler.unit_price > 0
            ? Number(preBuildPc.cpu_cooler.unit_price)
            : 0;
        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.cpu_cooler_id,
          quantity: 1,
          unit_price: preBuildPc.cpu_cooler.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.psu_id) {
        quantity += 1;
        total +=
          preBuildPc.psu.unit_price > 0 ? Number(preBuildPc.psu.unit_price) : 0;

        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.psu_id,
          quantity: 1,
          unit_price: preBuildPc.psu.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
    }
  }
  const orderStatus = await orderDAL.getOrderStatus();
  const { status_id, status_detail } = orderStatus.filter(
    (e) => e.status_detail,
  )[0];
  cartObject.statusId = status_id;
  cartObject.total = total;
  cartObject.quantity = quantity;
  total += cartObject.shipping_fee;
  await orderDAL.createOrderByUser(cartObject);
  for (const cartItem of cartObject.cartItemList) {
    // await cartItemDAL.deleteCartItem(cartItem.cart_item_id);
  }
  const message = mailHelper.orderPlaceMessage
    .replace('[Customer Name]', user.user_name)
    .replace('[Order Number]', orderId)
    .replace('[Order Date]', new Date().toLocaleDateString())
    .replace('[Total Amount]', total)
    .replace('[Total Item]', quantity);

  const mailOptions = {
    to: user.email || 'hduy01012000@gmail.com',
    html: message,
  };

  await mailHelper.sendMail(mailOptions);
  return orderId;
}
export async function updateOrderStatus(loginUser, orderId, statusId) {
  let status = await orderDAL.getOrderStatus();
  status = status.filter((e) => e.status_id === statusId)[0];
  const [user] = await userDAL.getUserByOrder(orderId);
  const message = mailHelper.orderUpdate
    .replace('[Customer Name]', user.user_name)
    .replace('[New Order Status]', status.status_detail)
    .replace('[Order Number]', orderId)
    .replace('[Brief Description of Update]', `Your order has been an update`)
    .replace('[Staff Name]', loginUser.user_name)
    .replace('[Staff Mail]', loginUser.email);
  await orderDAL.updateOrderStatus(orderId, statusId);
  const mailOptions = {
    to: user.email || 'hduy01012000@gmail.com',
    html: message,
  };
  await mailHelper.sendMail(mailOptions);
}

export async function updateOrderPaymentStatus(orderId, stage, message) {
  await orderDAL.updateOrderPaymentStatus(orderId, stage, message);
}

export async function getOrdersByOrderId(orderId) {
  return await orderDAL.getOrdersByOrderId(orderId);
}

export async function deleteOrderAndOrderDetailByOrderByID(orderId) {
  await orderDAL.deleteOrderByOrderBy(orderId);
}
