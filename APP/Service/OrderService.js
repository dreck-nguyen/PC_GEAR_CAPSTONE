import * as orderDAL from '../DAL/OrderDAL.js';
import * as orderDetailDAL from '../DAL/OrderDetailDAL.js';
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
  const user_id = loginUser.user_id;
  const order_id = uuidv4();
  cartObject.user_id = user_id;
  cartObject.order_id = order_id;
  cartObject.total = cartObject.order_details.reduce((acc, curr) => {
    acc += curr.quantity;
  }, 0);
  await orderDAL.createOrderByUser(cartObject);
  const orderDetails = cartObject.order_details.map((e) => {
    e.order_detail_id = uuidv4();
    e.order_id = order_id;
    return e;
  });
  for (const order of orderDetails) {
    await orderDetailDAL.createOrderDetail(order);
  }
}
export async function updateOrderStatus(orderId, statusId) {
  await orderDAL.updateOrderStatus(orderId, statusId);
}
