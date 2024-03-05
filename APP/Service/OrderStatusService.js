import * as orderStatusDAL from '../DAL/OrderStatusDAL.js';
export async function getOrderStatus() {
  const result = await orderStatusDAL.getOrderStatus();
  return result;
}

export async function getOrderStatusByStatusId(userId, orderStatusId) {
  const result = await orderStatusDAL.getOrderStatusByStatusId(
    userId,
    orderStatusId,
  );
  return result;
}
