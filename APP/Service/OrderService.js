import * as orderDAL from '../DAL/OrderDAL.js';
import * as orderDetailDAL from '../DAL/OrderDetailDAL.js';
import * as cartItemDAL from '../DAL/CartItemDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getUsersOrder() {
  const result = await orderDAL.getUsersOrder();
  return result;
}

export async function getOrderByUserId(loginUser) {
  const user_id = loginUser.user_id;
  const result = await orderDAL.getOrderByUserId(user_id);
  return result;
}
export async function getOrderById(orderId) {
  const result = await orderDAL.getOrderById(orderId);
  return result;
}

export async function createOrderByUser(loginUser, cartObject) {
  const userId = loginUser.user_id;
  const orderId = uuidv4();
  cartObject.userId = userId;
  cartObject.orderId = orderId;
  let quantity = 0;
  let total = 0;
  const cartItems = cartObject.cartItemList
    .map((e) => e.cart_item_id)
    .join(',');
  const cart = await cartItemDAL.getCartItemByUser(userId, cartItems);

  for (const cartItem of cart) {
    if (cartItem.product_id) {
      quantity += cartItem.quantity;
      total += Number(cartItem.unit_price);

      const orderDetails = {
        order_detail_id: uuidv4(),
        order_id: orderId,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        unit_price: cartItem.unit_price,
      };
      await orderDetailDAL.createOrderDetail(orderDetails);
    } else {
      console.log('````` BUILD PC');
      const preBuildPc = cartItem.build_pc;
      if (preBuildPc.motherboard_id) {
        quantity += 1;
        total += preBuildPc.motherboard_specification.unit_price;
        console.log(quantity, total);
        const orderDetails = {
          order_detail_id: uuidv4(),
          order_id: orderId,
          product_id: preBuildPc.motherboard_id,
          quantity: 1,
          unit_price: preBuildPc.motherboard_specification.unit_price,
        };
        await orderDetailDAL.createOrderDetail(orderDetails);
      }
      if (preBuildPc.processor_id) {
        quantity += 1;
        total += preBuildPc.processor_specification.unit_price;
        console.log(quantity, total);

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
        total += preBuildPc.case_specification.unit_price;
        console.log(quantity, total);

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
        total += preBuildPc.gpu_specification.unit_price;
        console.log(quantity, total);

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
        total += Number(preBuildPc.ram_specification.unit_price);
        console.log(quantity, total);

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
        total += preBuildPc.storage_specification.unit_price;
        console.log(quantity, total);

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
        total += preBuildPc.case_cooler.unit_price;
        console.log(quantity, total);

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
        total += preBuildPc.monitor.unit_price;
        console.log(quantity, total);

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
        total += preBuildPc.cpu_cooler.unit_price;
        console.log(quantity, total);

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
        total += preBuildPc.psu.unit_price;
        console.log(quantity, total);

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
  console.log(cartObject);
  total += cartObject.shipping_fee;
  await orderDAL.createOrderByUser(cartObject);
  for (const cartItem of cartObject.cartItemList) {
    console.log(cartItem.cart_item_id);
    // await cartItemDAL.deleteCartItem(cartItem.cart_item_id);
  }
}
export async function updateOrderStatus(orderId, statusId) {
  await orderDAL.updateOrderStatus(orderId, statusId);
}

export async function updateOrderPaymentStatus(orderId, stage) {
  await orderDAL.updateOrderPaymentStatus(orderId, stage);
}
