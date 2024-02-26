import * as orderStatusDAL from '../DAL/OrderStatusDAL.js';
export async function getOrderStatus() {
  const result = await orderStatusDAL.getOrderStatus();
  return result;
}
