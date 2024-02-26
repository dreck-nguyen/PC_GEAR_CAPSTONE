import { OrderDetail } from '../utility/DbHelper.js';

export async function createOrderDetail(orderItem) {
  await OrderDetail.create({
    order_detail_id: orderItem.order_detail_id,
    order_id: orderItem.order_id,
    product_id: orderItem.product_id,
    quantity: orderItem.quantity,
    unit_price: orderItem.unit_price,
  });
}
