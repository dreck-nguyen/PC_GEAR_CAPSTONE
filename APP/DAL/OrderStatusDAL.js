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

export async function getDashboard() {
  const sqlQuery = `
SELECT 'Product' AS entity_type, COUNT(*) AS entity_count
FROM public.product
UNION
SELECT 'User' AS entity_type, COUNT(*) AS entity_count
FROM public."user" u 
UNION
SELECT 'Order' AS entity_type, COUNT(*) AS entity_count
FROM public."order" o 
`;

  const dashboard = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return dashboard;
}
export async function generateChart() {
  const sqlQuery = `
SELECT 
    EXTRACT(YEAR FROM o.created_at) AS year,
    EXTRACT(MONTH FROM o.created_at) AS month,
    COUNT(DISTINCT o.order_id) AS order_count,
    TO_CHAR(SUM(od.quantity * od.unit_price), 'FM999,999,999,999,999') AS formatted_monthly_total,
    SUM(od.quantity * od.unit_price) AS monthly_total
FROM 
    public."order" o
JOIN 
    public.order_detail od ON o.order_id = od.order_id
GROUP BY 
    EXTRACT(YEAR FROM o.created_at), 
    EXTRACT(MONTH FROM o.created_at)
ORDER BY 
    year, 
    month;

`;

  const chart = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return chart;
}
export async function createOrderDetailRating(
  userId,
  orderDetailId,
  rating,
  review,
) {
  const sqlQuery = `
    UPDATE public.order_detail 
    SET rating = ?, review = ?
    WHERE order_detail_id = ? 
    AND order_id IN (SELECT order_id FROM "order" WHERE user_id = ?)
    RETURNING *
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [rating, review, orderDetailId, userId],
    type: SequelizeInstance.QueryTypes.UPDATE,
  });

  return result;
}
