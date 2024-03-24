import { OrderStatus, SequelizeInstance } from '../utility/DbHelper.js';

export async function getOrderStatus() {
  const result = await OrderStatus.findAll();
  return result;
}

export async function getOrderStatusByStatusId(userId, orderStatusId) {
  const sqlQuery = `
select 
  o.order_id
  , o.user_id 
  , o.shipping_fee
  , os.status_details 
  , p.payment_method 
  , array_agg(jsonb_build_object(
  'order_detail_id', od.order_detail_id,
  'product_id', od.product_id,
  'quantity', od.quantity,
  'unit_price', od.unit_price
  )) as order_details,
  sum(od.quantity) as total_items
  , os.status_id 
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
where 1=1
  and o.user_id = '${userId}'
  and o.status_id = '${orderStatusId}'
group by o.order_id,os.status_id,p.payment_id
`;

  const userOrder = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userOrder;
}
