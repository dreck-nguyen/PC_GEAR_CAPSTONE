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
    month,
    TO_CHAR(SUM(monthly_total), 'FM999,999,999,999,999') AS monthly_total,
    TO_CHAR(SUM(monthly_total), 'FM999,999,999,999,999') AS total
FROM (
    SELECT 
        EXTRACT(MONTH FROM o.created_at) AS month,
        SUM(od.quantity * od.unit_price) AS monthly_total
    FROM 
        public."order" o
    JOIN 
        public.order_detail od ON o.order_id = od.order_id
    GROUP BY 
        EXTRACT(MONTH FROM o.created_at)
) AS monthly_totals
GROUP BY 
    month
ORDER BY 
    month;
`;

  const chart = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return chart;
}
