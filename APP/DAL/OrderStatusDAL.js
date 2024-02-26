import { OrderStatus } from '../utility/DbHelper.js';

export async function getOrderStatus() {
  const result = await OrderStatus.findAll();
  return result;
}
