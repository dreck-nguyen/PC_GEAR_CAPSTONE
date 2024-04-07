import { OrderDetail, SequelizeInstance } from '../utility/DbHelper.js';

export async function createOrderDetail(orderItem) {
  console.log(`insert order detail`, orderItem);
  await OrderDetail.create({
    order_detail_id: orderItem.order_detail_id,
    order_id: orderItem.order_id,
    product_id: orderItem.product_id,
    quantity: orderItem.quantity,
    unit_price: orderItem.unit_price,
  });
}

export async function deleteOrderDetailByOrderBy(orderId) {
  const sqlQuery = `
DELETE FROM order_item
WHERE  order_id='${orderId}'
`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });

  return orderDetail;
}
