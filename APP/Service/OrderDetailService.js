import * as orderDetailDAL from '../DAL/OrderDetailDAL.js';
export async function getOrderDetailByOrderDetailId(orderDetailId) {
  const [result] = await orderDetailDAL.getOrderDetailByOrderDetailId(
    orderDetailId,
  );
  return result;
}
