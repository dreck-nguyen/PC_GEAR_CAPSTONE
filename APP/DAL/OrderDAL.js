import { Order, SequelizeInstance } from '../utility/DbHelper.js';

export async function getUsersOrder() {
  const sqlQuery = `
select 
  o.order_id
  , o.user_id 
  , o.shipping_fee
  , os.status_detail 
  , p.payment_method 
  , array_agg(jsonb_build_object(
  'order_detail_id', od.order_detail_id,
  'product_id', od.product_id,
  'quantity', od.quantity,
  'unit_price', od.unit_price
  )) as order_details,
  sum(od.quantity) as total_items
from 
  "order" o
left join
  order_status os 
  on 1=1
  and o.status_id = os.status_id 
left join 
  payment p 
  on 1=1
  and o.payment_id = p.payment_id 
left outer join
  order_detail od 
  on 1=1
  and o.order_id = od.order_id
group by o.order_id,os.status_id,p.payment_id
`;

  const userOrder = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userOrder;
}

export async function getOrderStatus() {
  const sqlQuery = `
select 
 *
from 
  order_status
`;

  const orderStatus = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return orderStatus;
}

export async function getOrderByUserId(userId) {
  const sqlQuery = `
select 
  o.*
  , os.status_detail 
  , p.payment_method 
  , array_agg(jsonb_build_object(
  'order_detail_id', od.order_detail_id,
  'product_id', od.product_id,
  'quantity', od.quantity,
  'unit_price', od.unit_price
  )) as order_details,
  sum(od.quantity) as total_items
from 
  "order" o
left join
  order_status os 
  on 1=1
  and o.status_id = os.status_id 
left join 
  payment p 
  on 1=1
  and o.payment_id = p.payment_id 
left outer join
  order_detail od 
  on 1=1
  and o.order_id = od.order_id
where
  o.user_id = '${userId}'
group by o.order_id,os.status_id,p.payment_id
`;

  const userOrder = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userOrder;
}

export async function createOrderByUser(orderObject) {
  await Order.create({
    order_id: orderObject.orderId,
    user_id: orderObject.userId,
    status_id: orderObject.statusId,
    payment_id: orderObject.payment_id,
    shipping_fee: orderObject.shipping_fee,
    quantity: orderObject.quantity,
    total: orderObject.total,
  });
}
export async function updateOrderPaymentStatus(orderId, stage) {
  const sqlQuery = `
    UPDATE
      public."order"
    SET
      payment_date = now(),
      vnpay_status = :stage
    WHERE
      order_id = :orderId
  `;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    replacements: { orderId, stage },
    type: SequelizeInstance.QueryTypes.UPDATE,
    raw: true,
  });

  return orderDetail;
}

export async function updateOrderStatus(orderId, statusId) {
  await Order.update(
    { status_id: statusId },
    {
      where: {
        order_id: orderId,
      },
    },
  );
}

export async function getOrderById(orderId) {
  const sqlQuery = `
select 
  o.order_id
  , o.user_id 
  , o.shipping_fee
  , os.status_detail 
  , p.payment_method 
  , array_agg(jsonb_build_object(
  'order_detail_id', od.order_detail_id,
  'product_id', od.product_id,
  'quantity', od.quantity,
  'unit_price', od.unit_price
  )) as order_details,
  sum(od.quantity) as total_items
from 
  "order" o
left join
  order_status os 
  on 1=1
  and o.status_id = os.status_id 
left join 
  payment p 
  on 1=1
  and o.payment_id = p.payment_id 
left outer join
  order_detail od 
  on 1=1
  and o.order_id = od.order_id
where
  o.order_id = '${orderId}'
group by o.order_id,os.status_id,p.payment_id
`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return orderDetail;
}
export async function getOrdersByOrderId(orderId) {
  const sqlQuery = `
select 
  o.total::numeric
from 
  "order" o
where
  o.order_id = '${orderId}'
`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return orderDetail;
}
export async function deleteOrderByOrderBy(orderId) {
  const sqlQuery = `
DELETE FROM order
WHERE  order_id='${orderId}'
`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });

  return orderDetail;
}
