import { Order, SequelizeInstance } from '../utility/DbHelper.js';

export async function getUsersOrder() {
  const sqlQuery = `
select 
  o.order_id
  , u.user_id
  , u.first_name 
  , u.email 
  , u.phone_number 
  , o.shipping_fee
  , os.status_detail 
  , p.payment_method 
  , array_agg(
  jsonb_build_object(
  'order_detail_id', od.order_detail_id,
  'product_id', od.product_id,
  'quantity', od.quantity,
  'unit_price', od.unit_price
  )) as order_details,
  o.quantity  total_items,
  o.total as total_price,
  sa.recipient_name ,
  sa.recipient_name ,
  sa.street_address ,
  sa.city 
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
inner join public.user u
on 1=1
and u.user_id = o.user_id
left outer join 
  shipping_address sa
  on 1 = 1
  and sa.address_id = o.address_id
  and sa.user_id = o.user_id
group by o.order_id,os.status_id,p.payment_id,u.user_id,sa.recipient_name ,
  sa.recipient_name ,
  sa.street_address ,sa.city 
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
  sum(od.quantity) as total_items,
  sa.recipient_name ,
  sa.recipient_name ,
  sa.street_address ,
  sa.city 
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
left outer join 
  shipping_address sa
  on 1 = 1
  and sa.address_id = o.address_id
  and sa.user_id = o.user_id
where 1 = 1
  and o.user_id = '${userId}'
group by o.order_id,os.status_id,p.payment_id,sa.recipient_name ,
  sa.recipient_name ,
  sa.street_address ,sa.city 
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
    address_id:
      orderObject?.address_id || '1f41abde-ebad-4fa5-868e-2cfab685a370',
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
SELECT 
  o.order_id,
  u.user_id,
  u.first_name,
  u.email,
  u.phone_number,
  o.shipping_fee,
  os.status_detail,
  p.payment_method,
  ARRAY_AGG(jsonb_build_object(
      'order_detail_id', od.order_detail_id,
      'product_id', od.product_id,
      'product_name', p2."name",
      'product_image', pg.image,
      'quantity', od.quantity,
      'unit_price', od.unit_price
  )) AS order_details,
  o.quantity AS total_items,
  o.total AS total_price
FROM 
  "order" o
LEFT JOIN
  order_status os 
  ON 1 = 1
  AND o.status_id = os.status_id 
LEFT JOIN 
  payment p 
  ON 1 = 1
  AND o.payment_id = p.payment_id 
LEFT OUTER JOIN
  order_detail od 
  ON 1 = 1
  AND o.order_id = od.order_id
INNER JOIN public.user u 
  ON u.user_id = o.user_id
LEFT JOIN product p2 
  ON 1 = 1
  AND p2.product_id = od.product_id 
LEFT JOIN (
    SELECT 
      product_id,
      MIN(image) AS image
    FROM 
      product_gallery
    GROUP BY 
      product_id
) pg
ON p2.product_id = pg.product_id
WHERE 1 = 1
  AND o.order_id = '${orderId}'
GROUP BY o.order_id, os.status_id, p.payment_id, u.user_id;

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
inner join payment p
 on 1 =1 
 and o.payment_id = p.payment_id 
where 1=1
  and o.order_id = '${orderId}'
  and p.payment_method = 'VN PAY'
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
