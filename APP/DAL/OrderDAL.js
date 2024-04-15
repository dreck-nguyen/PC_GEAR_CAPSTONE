import { Order, SequelizeInstance } from '../utility/DbHelper.js';
export async function countUserOrder(userId) {
  const sqlQuery = `
select 
COUNT(*)
from 
  "order" o
where user_id = :userId
  ;
`;

  const userOrder = await SequelizeInstance.query(sqlQuery, {
    replacements: { userId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userOrder;
}
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
  TO_CHAR(o.total,
	'FM999,999,999') as total_price,
  sa.recipient_name ,
  sa.recipient_name ,
  COALESCE (sa.street_address, o.street_address) as street_address ,
  COALESCE (sa.city, o.district) as district
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
  ;
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

export async function getOrderByUserId(userId, limit, offset) {
  const sqlQuery = `
select 
  o.*
  , os.status_detail 
  , p.payment_method 
  , array_agg(jsonb_build_object(
  'order_detail_id', od.order_detail_id,
  'product_id', od.product_id,
  'product_name', p2."name" ,
  'product_img', pg.image  ,
  'quantity', od.quantity,
  'unit_price', od.unit_price
  )) as order_details,
  sum(od.quantity) as total_items,
  TO_CHAR(o.total,
	'FM999,999,999') as total_price,
  sa.recipient_name ,
  sa.recipient_name ,
  sa.street_address ,
  sa.city,
  array_agg(jsonb_build_object('email', review.email,
	'product_id', review.product_id,
	'product_name', review.name,
	'image_links', review.image,
	'rating', review.rating,
	'review', review.review)) as review_list
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
inner join product p2 
on 1=1
and p2.product_id = od.product_id 
inner join product_gallery pg 
on 1=1
and pg.product_id = od.product_id 
left outer join 
  shipping_address sa
  on 1 = 1
  and sa.address_id = o.address_id
  and sa.user_id = o.user_id
left outer join (
select
	u.email,
	od.product_id,
	p.name,
	pg.image,
	od.rating,
	od.review
from
	"order" o
inner join order_detail od on
	o.order_id = od.order_id
inner join "user" u on
	o.user_id = u.user_id
inner join product p on
	od.product_id = p.product_id
left outer join (
	select
		product_id,
		array_agg(image) as image
	from
		product_gallery
	group by
		product_id,
		product_gallery_id
) pg on
	p.product_id = pg.product_id
group by
	u.email,
	od.product_id ,
	p.name,
	pg.image,
	od.rating,
	od.review) review
  on review.product_id = od.product_id
where 1 = 1
  and o.user_id = '${userId}'
group by o.order_id,os.status_id,p.payment_id,sa.recipient_name ,
  sa.recipient_name ,
  sa.street_address ,sa.city,review.email, review.product_id, review.name, review.image, review.rating, review.review
order by o.created_at desc
limit ${limit}
offset ${offset}
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
export async function updateOrderPaymentStatus(orderId, stage, message) {
  const sqlQuery = `
    UPDATE
      public."order"
    SET
      payment_date = now(),
      vnpay_status = :stage,
      vnpay_message = :message
    WHERE
      order_id = :orderId
  `;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    replacements: { orderId, stage, message },
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
 TO_CHAR(o.total,
	'FM999,999,999') as total_price
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
  const sqlQuery = `DELETE FROM public."order" WHERE order_id='${orderId}'`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });

  return orderDetail;
}
