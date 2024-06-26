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
	o.*,
	u.user_id,
  u.first_name ,
  u.email ,
  u.phone_number, 
	os.status_detail,
	p.payment_method,
	od.order_details,
	od.total_items,
	TO_CHAR(o.total,
	'FM999,999,999') as total_price,
	sa.recipient_name,
	sa.street_address,
	sa.city
from
	"order" o
inner join 
    order_status os on
	o.status_id = os.status_id
left join 
    payment p on
	o.payment_id = p.payment_id
left join 
    (
	select
		o.order_id,
		SUM(od.quantity) as total_items,
		array_agg(
            jsonb_build_object(
                'order_detail_id',
		od.order_detail_id,
		'product_id',
		od.product_id,
		'product_name',
		p.name,
		'product_img',
		pg.image,
		'quantity',
		od.quantity,
		'unit_price',
		od.unit_price
            )
        ) as order_details
	from
		order_detail od
	inner join 
        "order" o on
		o.order_id = od.order_id
	inner join 
        product p on
		od.product_id = p.product_id
	inner join 
        (
		select
			distinct on
			(product_id) *
		from
			product_gallery
		order by
			product_id,
			product_gallery_id) pg on
		p.product_id = pg.product_id
	where
		1 = 1
	group by
		o.order_id) od on
	od.order_id = o.order_id
left join 
    shipping_address sa on
	sa.address_id = o.address_id
	and sa.user_id = o.user_id
inner join "user" u 
on u.user_id = o.user_id 
where
	1 = 1
group by
	o.order_id,
	os.status_id,
	p.payment_method,
	sa.recipient_name,
	sa.street_address,
	sa.city,
	od.order_details,
	od.total_items,
	u.user_id
order by
	o.created_at desc
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
SELECT
    o.*,
    u.user_id,
    u.first_name,
    u.email,
    u.phone_number,
    os.status_detail,
    p.payment_method,
    od.order_details,
    od.total_items,
    TO_CHAR(o.total, 'FM999,999,999') AS total_price,
    sa.recipient_name,
    sa.street_address,
    sa.city,
	  os.is_final as allow_review
FROM
    "order" o
INNER JOIN
    order_status os ON o.status_id = os.status_id
inner  JOIN
    payment p ON o.payment_id = p.payment_id 
inner JOIN
    (
     SELECT
        o.order_id,
        SUM(od.quantity) AS total_items,
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'order_detail_id', od.order_detail_id,
                'product_id', od.product_id,
                'product_name', p.name,
                'product_img', pg.image,
                'quantity', od.quantity,
                'unit_price', od.unit_price,
                'allow_review', os.is_final
            )
        ) AS order_details
        FROM
            order_detail od
        INNER JOIN
            "order" o ON o.order_id = od.order_id
        INNER JOIN
           order_status os ON o.status_id = os.status_id
        INNER JOIN
            product p ON od.product_id = p.product_id
        INNER JOIN
            (
                SELECT DISTINCT ON (product_id) *
                FROM product_gallery
                ORDER BY product_id, product_gallery_id
            ) pg ON p.product_id = pg.product_id
        GROUP BY
            o.order_id,
            o.status_id
    ) od ON od.order_id = o.order_id
LEFT JOIN
    shipping_address sa ON sa.address_id = o.address_id
INNER JOIN
    "user" u ON u.user_id = o.user_id
WHERE
    o.user_id = :userId
GROUP BY
    o.order_id,
    os.status_id,
    p.payment_method,
    sa.recipient_name,
    sa.street_address,
    sa.city,
    od.order_details,
    od.total_items,
    u.user_id,
	os.is_final
ORDER BY
    o.created_at desc
limit :limit
offset :offset
`;

  const userOrder = await SequelizeInstance.query(sqlQuery, {
    replacements: { userId, limit, offset },
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
      message = :message
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
select
	o.*,
  u.user_id,
  u.first_name,
  u.email,
  u.phone_number,
	os.status_detail,
	p.payment_method,
	od.order_details,
	od.total_items,
	TO_CHAR(o.total,
	'FM999,999,999') as total_price,
	sa.recipient_name,
  sa.recipient_name,
	COALESCE (sa.street_address, o.street_address) as street_address ,
	COALESCE (sa.city, 'HCM') as city,
  os.is_final as allow_review
from
	"order" o
INNER JOIN
    "user" u ON u.user_id = o.user_id
inner join 
    order_status os on
	o.status_id = os.status_id
left join 
    payment p on
	o.payment_id = p.payment_id
left join 
    (
	select
		o.order_id,
		SUM(od.quantity) as total_items,
		array_agg(
            jsonb_build_object(
                'order_detail_id',
		od.order_detail_id,
		'product_id',
		od.product_id,
		'product_name',
		p.name,
		'product_img',
		pg.image,
		'quantity',
		od.quantity,
		'unit_price',
		od.unit_price,
    'allow_review',
    os.is_final
            )
        ) as order_details
	from
		order_detail od
	inner join 
        "order" o on
		o.order_id = od.order_id
  inner join
    order_status os
    on os.status_id = o.status_id
	inner join 
        product p on
		od.product_id = p.product_id
	inner join 
        (
		select
			distinct on
			(product_id) *
		from
			product_gallery
		order by
			product_id,
			product_gallery_id) pg on
		p.product_id = pg.product_id
	where
		o.order_id = '${orderId}'
	group by
		o.order_id
    , os.status_id) od on
	od.order_id = o.order_id
left join 
    shipping_address sa on
	sa.address_id = o.address_id
	and sa.user_id = o.user_id
where
	o.order_id = '${orderId}'
GROUP BY
    o.order_id,
    os.status_id,
    p.payment_method,
    sa.recipient_name,
    sa.street_address,
    sa.city,
    od.order_details,
    od.total_items,
    u.user_id
order by
	o.created_at desc

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
    UPDATE "order"
    SET status_id = (
      SELECT status_id
      FROM order_status
      WHERE status_detail = 'Canceled'
    )
    WHERE order_id = :orderId
  `;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    replacements: { orderId },
    type: SequelizeInstance.QueryTypes.UPDATE,
    raw: true,
  });

  return orderDetail;
}
