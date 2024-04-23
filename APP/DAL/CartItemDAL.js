import { CartItem, SequelizeInstance } from '../utility/DbHelper.js';

export async function createCartItem(product) {
  await CartItem.create({
    cart_item_id: product.cart_item_id,
    cart_id: product.cart_id,
    product_id: product.product_id,
    quantity: product.quantity,
  });
}

export async function createCartItemByUserPcBuild(
  cartId,
  userPcBuildId,
  countTotal,
) {
  const sqlQuery = `
    INSERT INTO public.cart_item (cart_item_id, cart_id, created_at, personal_build_pc_id, quantity) 
    VALUES (gen_random_uuid(), :cart_id, now(), :userPcBuildId, :countTotal)
    RETURNING *;
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { cart_id: cartId, userPcBuildId: userPcBuildId, countTotal },
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });

  return result;
}
export async function deleteCartItem(cartItemId) {
  const sqlQuery = `
    DELETE FROM public.cart_item WHERE cart_item_id = '${cartItemId}'
  `;
  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
  });
}
export async function getCartItem(cartItemId) {
  const sqlQuery = `
  select *,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  p.product_brand_id 
  from cart c 
  inner join cart_item ci on c.cart_id = ci.cart_id 
  inner join product p on ci.product_id  = p.product_id 
  where ci.cart_item_id = '${cartItemId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function getCartUser(userId) {
  const sqlQuery = `
  select * from cart c 
  where c.user_id = '${userId}' 
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function getCartItemByUserPcBuild(userId, pcBuildId) {
  const sqlQuery = `
 select * from cart c 
  inner join cart_item ci on c.cart_id = ci.cart_id
  where c.user_id = '${userId}' and ci.personal_build_pc_id = '${pcBuildId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function countItemsInCart(pcBuildId) {
  const sqlQuery = `
 with base as (
    SELECT 
        case 
            when motherboard_id is not null then 1
            else 0 
        end as motherboard_count,
        case 
            when processor_id is not null then 1
            else 0 
        end as processor_count,
        case 
            when cpu_cooler_id is not null then 1
            else 0 
        end as cpu_cooler_count,
        case 
            when case_id is not null then 1
            else 0 
        end as case_count,
        case 
            when gpu_id is not null then 1
            else 0 
        end as gpu_count,
        case 
            when ram_id is not null then ram_quantity
            else 0 
        end as ram_count,
        case 
            when storage_id is not null then storage_quantity
            else 0 
        end as storage_count,
        case 
            when case_cooler_id is not null then 1
            else 0 
        end as case_cooler_count,
        case 
            when monitor_id is not null then 1
            else 0 
        end as monitor_count,
        case 
            when psu_id is not null then 1
            else 0 
        end as psu_count 
    FROM public.user_pc_build
    WHERE user_pc_build_id = '${pcBuildId}'
)
SELECT
    SUM(motherboard_count) + 
    SUM(processor_count) + 
    SUM(cpu_cooler_count) + 
    SUM(case_count) + 
    SUM(gpu_count) + 
    SUM(ram_count) + 
    SUM(storage_count) + 
    SUM(case_cooler_count) + 
    SUM(monitor_count) + 
    SUM(psu_count) AS total
FROM
    base
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function getCartItemDetailsByID(cartItemId) {
  const sqlQuery = `
  select 
    ci.*,
    p.product_id,
    p."name",
    p.description,
    pb.product_brand_id,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links
  from 
    cart_item ci 
  inner join product p on ci.product_id  = p.product_id 
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg ON pg.product_id = p.product_id
  where ci.cart_item_id = '${cartItemId}'
  GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ci.cart_item_id
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const result = await CartItem.update(
    { quantity: quantity },
    {
      where: { cart_item_id: cartItemId },
      returning: true,
    },
  );
  return result;
}
export async function removeCartItem(cartItemId) {
  const result = await CartItem.destroy({
    where: { cart_item_id: cartItemId },
  });
  return result;
}
export async function getProductInCartById(cartId) {
  const sqlQuery = `select cart_item_id, product_id,quantity from cart_item where cart_id = '${cartId}'`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function getCartItemByUser(userId, cartItemIds) {
  const sqlQuery = `
  select 
  ci.product_id,
  p.product_brand_id,
  p.unit_price::numeric,
  ci.quantity::numeric,
  ci.personal_build_pc_id,
  to_json(upb.*) as build_pc
from 
  cart c 
inner join cart_item ci
on 1 = 1
and c.cart_id = ci.cart_id 
left join product p
  on 1=1
  and p.product_id = ci.product_id
left join
  (SELECT 
upb.user_pc_build_id,
upb.user_id,
upb.profile_name,
upb.motherboard_id,
to_json(ms.*) AS motherboard_specification,
upb.processor_id,
to_json(ps.*) AS processor_specification,
upb.case_id,
to_json(cs.*) AS case_specification,
upb.gpu_id,
to_json(gs.*) AS gpu_specification,
upb.ram_id,
to_json(rs.*) AS ram_specification,
upb.storage_id,
to_json(ss.*) AS storage_specification
, upb.case_cooler_id
, to_json(case_cooler.*) AS case_cooler
, upb.monitor_id
, to_json(monitor.*) AS monitor
, upb.cpu_cooler_id
, to_json(cpu_cooler.*) AS cpu_cooler
, upb.psu_id
, to_json(psu.*) AS psu
, upb.ram_quantity
, upb.storage_quantity
FROM 
public.user_pc_build upb
left join (
  SELECT 
  p.product_id as primary_product_id,
		p."name",
		p.unit_price::numeric,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		ARRAY_AGG(pg.image) as image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) psu
on 1 = 1
and psu.primary_product_id = upb.psu_id
left join (
  SELECT 
  p.product_id as primary_product_id,
		p."name",
		p.unit_price::numeric,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		ARRAY_AGG(pg.image) as image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) case_cooler
on 1 = 1
and case_cooler.primary_product_id = upb.case_cooler_id
left join (
  SELECT 
  p.product_id as primary_product_id,
		p."name",
		p.unit_price::numeric,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		ARRAY_AGG(pg.image) as image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) monitor
on 1 = 1
and monitor.primary_product_id = upb.monitor_id
left join (
  SELECT 
  p.product_id as primary_product_id,
		p."name",
		p.unit_price::numeric,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		ARRAY_AGG(pg.image) as image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) cpu_cooler
on 1 = 1
and cpu_cooler.primary_product_id = upb.cpu_cooler_id
LEFT JOIN 
(
SELECT 
  p.product_id as primary_product_id,
		p."name",
		p.unit_price::numeric,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		ARRAY_AGG(pg.image) as image_links,
  ms.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN motherboard_specification ms on p.product_id = ms.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ms.product_id, ms.specification_id
)ms 
ON upb.motherboard_id = ms.primary_product_id 
LEFT JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price::numeric,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
    p.discount,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    ps.*
  FROM 
    product p
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN processor_specification ps ON p.product_id = ps.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, ps.product_id, ps.specification_id
) ps 
ON upb.processor_id = ps.primary_product_id 
LEFT JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price::numeric,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
    p.discount,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    cs.*
  FROM 
    product p
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN case_specification cs ON p.product_id = cs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
) cs 
ON upb.case_id = cs.primary_product_id 
LEFT JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price::numeric,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
    p.discount,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    gs.*
  FROM 
    product p
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN graphics_specification gs ON p.product_id = gs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, gs.product_id, gs.specification_id
) gs 
ON upb.gpu_id = gs.primary_product_id 
LEFT JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price::numeric,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
    p.discount,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    rs.*
  FROM 
    product p
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN ram_specification rs ON p.product_id = rs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, rs.product_id, rs.specification_id
) rs 
ON upb.ram_id = rs.primary_product_id 
LEFT JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price::numeric,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
    p.discount,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    ss.*
  FROM 
    product p
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN storage_specification ss ON p.product_id = ss.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, ss.product_id, ss.specification_id
) ss 
ON upb.storage_id = ss.primary_product_id
group by upb.user_pc_build_id, ms.*, ps.*, cs.*, gs.*, rs.*,ss.*, case_cooler.*, monitor.*,cpu_cooler.*,psu.*) upb 
  on 1 =1  
  and upb.user_id = c.user_id 
  and upb.user_pc_build_id  = ci.personal_build_pc_id 
where 1 = 1
and c.user_id = '${userId}'
 AND ci.cart_item_id = any  (
      SELECT UNNEST(STRING_TO_ARRAY('${cartItemIds}', ','))::uuid
  )
GROUP BY 
  upb.*,
  ci.product_id,
  ci.quantity,
  ci.personal_build_pc_id,
  p.unit_price,
  p.product_brand_id;
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function deleteByBuildPc(userPcBuildId) {
  const sqlQuery = `
      DELETE FROM cart_item
      WHERE personal_build_pc_id = :userPcBuildId
    `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { userPcBuildId },
    type: SequelizeInstance.QueryTypes.DELETE,
  });

  return result;
}
