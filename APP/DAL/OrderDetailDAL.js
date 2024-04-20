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
DELETE FROM order_detail
WHERE order_id='${orderId}'
`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });

  return orderDetail;
}

export async function getOrderDetailByOrderDetailId(orderDetailId) {
  const sqlQuery = `
select 
od.order_detail_id 
, od.quantity
, od.unit_price
, p.product_id
, p.name
, pg.image
, array_agg(jsonb_build_object(
  'review_user', review.email,
  'product_name', review.name,
  'rating', review.rating,
  'review', review.review
  )) as review_list
from order_detail od 
inner join product p on p.product_id = od.product_id 
inner join 
(
select
	distinct on
	(product_id) *
from
	product_gallery
order by
	product_id,
	product_gallery_id)
	pg on
p.product_id = pg.product_id
inner join "order" o ON od.order_id = o.order_id
inner join "user" u on u.user_id = o.user_id
left outer join (
SELECT od.review, od.rating, p.name, u.email, p.product_id 
FROM order_detail od
JOIN product p ON od.product_id = p.product_id
JOIN "order" o ON od.order_id = o.order_id
JOIN "user" u ON o.user_id = u.user_id
where 1=1
and od.rating is not null 
and od.review is not null 
) review 
on p.product_id  = review.product_id
where od.order_detail_id = :orderDetailId
group by 
od.order_detail_id 
, od.quantity
, od.unit_price
, p.product_id
, p.name
, pg.image
`;

  const orderDetail = await SequelizeInstance.query(sqlQuery, {
    replacements: {
      orderDetailId,
    },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return orderDetail;
}
