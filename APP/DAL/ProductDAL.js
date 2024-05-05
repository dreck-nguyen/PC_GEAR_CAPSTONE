import {
  Product,
  ProductGallery,
  SequelizeInstance,
} from '../utility/DbHelper.js';

export async function countProduct() {
  const sqlQuery = `
SELECT 
  COUNT(*)
FROM
  product
`;

  const productCount = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productCount;
}

export async function getPaginateProduct(limit, offset) {
  const sqlQuery = `
SELECT 
    p.product_id,
    p."name",
    p.description,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    p.quantity,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    pb.product_brand_id
FROM 
    product p
LEFT OUTER JOIN 
    category c ON c.category_id = p.category_id
LEFT OUTER JOIN 
    product_brand pb ON pb.product_brand_id = p.product_brand_id
INNER JOIN 
    product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
ORDER BY 
    p.product_id
LIMIT 
    ${limit} OFFSET ${offset};
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}

export async function getProductPurpose() {
  const sqlQuery = `
select * from build_purpose bp 
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}

export async function getAllProduct() {
  const sqlQuery = `
SELECT 
    p.product_id,
    p."name",
    p.description,
    pb.product_brand_id,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    p.quantity,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links
FROM 
    product p
LEFT OUTER JOIN 
    category c ON c.category_id = p.category_id
LEFT OUTER JOIN 
    product_brand pb ON pb.product_brand_id = p.product_brand_id
INNER JOIN 
    product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}
export async function getProductByName(productName) {
  const sqlQuery = `
SELECT 
    p.product_id,
    p."name",
    p.description,
     pb.product_brand_id,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    p.quantity,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links
FROM 
    product p
LEFT OUTER JOIN 
    category c ON c.category_id = p.category_id
LEFT OUTER JOIN 
    product_brand pb ON pb.product_brand_id = p.product_brand_id
INNER JOIN 
    product_gallery pg ON pg.product_id = p.product_id
WHERE 
  p."name" like '%${productName}%'
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}

export async function getProductById(productId) {
  const sqlQuery = `
SELECT 
    p.product_id,
    p."name",
    p.description,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    p.quantity,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    pb.product_brand_id,
    ARRAY_AGG(pg.image) AS image_links,
    review.review_list
FROM 
    product p
LEFT OUTER JOIN 
    category c ON c.category_id = p.category_id
LEFT OUTER JOIN 
    product_brand pb ON pb.product_brand_id = p.product_brand_id
INNER JOIN 
    product_gallery pg ON pg.product_id = p.product_id
left outer join (
SELECT p.product_id, array_agg(jsonb_build_object(
  'review_user', u.email,
  'product_name', p.name,
  'rating', od.rating,
  'review', od.review
  )) as review_list
FROM order_detail od
JOIN product p ON od.product_id = p.product_id
JOIN "order" o ON od.order_id = o.order_id
JOIN "user" u ON o.user_id = u.user_id
where 1=1
and od.rating is not null 
and od.review is not null 
group by p.product_id
) review 
on p.product_id  = review.product_id
WHERE 1=1
    and p.product_id = :productId
GROUP BY 
    p.product_id, 
    c.category_id, 
    pb.product_brand_id,
    review.review_list
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    replacements: { productId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}

export async function getProductsByCategory(categoryId) {
  const sqlQuery = `
SELECT 
    p.product_id,
    p.category_id,
    p.name,
    p.description,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    p.sold,
    c.name AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    pb.product_brand_id
FROM 
    product p
LEFT JOIN 
    category c
ON 
    c.category_id = p.category_id 
LEFT JOIN 
    product_brand pb 
ON 
    pb.product_brand_id = p.product_brand_id
LEFT JOIN 
    product_gallery pg 
ON 
    pg.product_id = p.product_id
WHERE 
	c.parent_id = '${categoryId}'
	OR (c.parent_id IS not NULL AND p.category_id = '${categoryId}')
GROUP BY 
    p.product_id, p.category_id, p.name, p.description, p.unit_price, p.discount, p.sold, c.name, pb.product_brand_name, pb.product_brand_id;
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}

export async function updateProductById(productId, product) {
  const existingProduct = await Product.findOne({
    where: { product_id: productId },
  });
  const updatedProduct = await existingProduct.update(product, {
    where: { product_id: productId },
    returning: true,
  });

  return updatedProduct;
}

export async function createProduct(product) {
  const result = await Product.create({
    product_id: product.product_id,
    category_id: product.category_id,
    name: product.name,
    description: product.description,
    unit_price: product.unit_price,
    discount: product.discount,
    quantity: product.quantity,
    sold: product.sold,
    product_brand_id: product.product_brand_id,
  });
  return result;
}

export async function createProductImage(productGalleryId, productId, path) {
  await ProductGallery.create({
    product_gallery_id: productGalleryId,
    product_id: productId,
    image: path,
  });
}
export async function deleteProductByID(productId) {
  const sqlQuery = `
DELETE FROM 
  product 
WHERE
  product_id = '${productId}'
`;

  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
}

export async function deleteProductsByID(productIds) {
  const sqlQuery = `
DELETE FROM 
  product 
WHERE
  product_id IN (:productIds)
`;

  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    replacements: { productIds },
  });
}
export async function deleteAllGallery(productId) {
  const sqlQuery = `
DELETE FROM 
  product_gallery
WHERE
  product_id = :productId
`;

  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    replacements: { productId },
  });
}
export async function deleteAllSpecByProductID(productId) {
  const sqlQuery = `
DELETE FROM public.case_cooler_specification 
WHERE product_id = :productId;

DELETE FROM public.case_specification 
WHERE product_id = :productId;

DELETE FROM public.cooler_specification 
WHERE product_id = :productId;

DELETE FROM public.graphics_specification 
WHERE product_id = :productId;

DELETE FROM public.monitor_specification 
WHERE product_id = :productId;

DELETE FROM public.motherboard_specification 
WHERE product_id = :productId;

DELETE FROM public.motherboard_support_processor 
WHERE motherboard_id = :productId;

DELETE FROM public.motherboard_support_ram  
WHERE motherboard_id = :productId;

DELETE FROM public.power_supply_specification 
WHERE product_id = :productId;

DELETE FROM public.processor_specification 
WHERE product_id = :productId;

DELETE FROM public.ram_specification 
WHERE product_id = :productId;

DELETE FROM public.storage_specification 
WHERE product_id = :productId;
`;

  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    replacements: { productId },
  });
}

export async function getMonitor() {
  const sqlQuery = `
SELECT 
p.product_id,
p."name",
p.description,
pb.product_brand_id,
TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
p.discount,
p.sold,
c."name" AS category_name,
pb.product_brand_name AS brand_name,
ARRAY_AGG(pg.image) AS image_links,
ms.*
FROM 
product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN monitor_specification ms on p.product_id = ms.product_id 
GROUP BY 
p.product_id, c.category_id, pb.product_brand_id, ms.product_id ,ms.specification_id
`;

  const monitorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return monitorList;
}

export async function getPowerSupply() {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  pb.product_brand_id,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  p.discount,
  p.sold,
  c."name" AS category_name,
  pb.product_brand_name AS brand_name,
  ARRAY_AGG(pg.image) AS image_links,
  pss.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN power_supply_specification pss on p.product_id = pss.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, pss.product_id, pss.specification_id
`;

  const powerSupplyList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return powerSupplyList;
}

export async function getCpuCooler() {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  pb.product_brand_id,
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
INNER JOIN cooler_specification cs  on p.product_id = cs.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
`;

  const cpuCoolerList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return cpuCoolerList;
}

export async function getCaseCooler() {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  pb.product_brand_id,
  p.discount,
  p.sold,
  c."name" AS category_name,
  pb.product_brand_name AS brand_name,
  ARRAY_AGG(pg.image) AS image_links,
  ccs.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN case_cooler_specification ccs  on p.product_id = ccs.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ccs.product_id, ccs.specification_id
`;

  const caseCoolerList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseCoolerList;
}

export async function getMonitorById(monitorId) {
  const sqlQuery = `
SELECT 
p.product_id,
p."name",
p.description,
TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
p.discount,
p.sold,
c."name" AS category_name,
pb.product_brand_name AS brand_name,
ARRAY_AGG(pg.image) AS image_links,
pb.product_brand_id,
ms.*
FROM 
product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN monitor_specification ms on p.product_id = ms.product_id
WHERE P.product_id = '${monitorId}'
GROUP BY 
p.product_id, c.category_id, pb.product_brand_id, ms.product_id ,ms.specification_id
`;

  const monitorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return monitorList;
}

export async function getPowerSupplyById(psuId) {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  pb.product_brand_id,
  p.discount,
  p.sold,
  c."name" AS category_name,
  pb.product_brand_name AS brand_name,
  ARRAY_AGG(pg.image) AS image_links,
  pss.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN power_supply_specification pss on p.product_id = pss.product_id
WHERE p.product_id = '${psuId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, pss.product_id, pss.specification_id
`;

  const powerSupplyList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return powerSupplyList;
}

export async function getCpuCoolerById(cpuCoolerId) {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  pb.product_brand_id,
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
INNER JOIN cooler_specification cs  on p.product_id = cs.product_id 
WHERE p.product_id = '${cpuCoolerId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
`;

  const cpuCoolerList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return cpuCoolerList;
}

export async function getCaseCoolerById(caseCoolerId) {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
  pb.product_brand_id,
  p.discount,
  p.sold,
  c."name" AS category_name,
  pb.product_brand_name AS brand_name,
  ARRAY_AGG(pg.image) AS image_links,
  ccs.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
inner join product_gallery pg ON pg.product_id = p.product_id
INNER JOIN case_cooler_specification ccs  on p.product_id = ccs.product_id 
WHERE p.product_id = '${caseCoolerId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ccs.product_id, ccs.specification_id
`;

  const caseCoolerList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseCoolerList;
}

export async function getProcessorById(processorId) {
  const sqlQuery = `

`;

  const processorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return processorList;
}

export async function getMotherboardById(motherBoardId) {
  const sqlQuery = `

`;

  const motherBoardList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherBoardList;
}

export async function getCaseById(caseId) {
  const sqlQuery = `
SELECT 
  p.product_id,
  p."name",
  p.description,
  p.product_brand_id,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
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
INNER JOIN case_specification cs on p.product_id = cs.product_id
WHERE p.product_id = '${caseId}'
GROUP BY 
  p.product_brand_id,p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
`;

  const caseList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}

export async function getGraphicsCardById(gpuId) {
  const sqlQuery = `
`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRamById(ramId) {
  const sqlQuery = `

`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorageById(storageId) {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
  p.product_brand_id,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	ss.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
inner join product_gallery pg on
	pg.product_id = p.product_id
inner join storage_specification ss on
	p.product_id = ss.product_id
where
	p.product_id = '${storageId}'
group by
p.product_brand_id,
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	ss.product_id,
	ss.specification_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}
//
export async function getProcessor(motherboardId, brandId) {
  let sqlQuery = `
`;

  const processorList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, brandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return processorList;
}

export async function getMotherboard(
  storageId,
  ramId,
  caseId,
  processorId,
  motherboardBrandId,
) {
  let sqlQuery = `
`;

  const motherboardList = await SequelizeInstance.query(sqlQuery, {
    replacements: { storageId, ramId, caseId, processorId, motherboardBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherboardList;
}

export async function getCase(motherboardId, gpuId, caseBrandId) {
  let sqlQuery = `

`;
  const caseList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, gpuId, caseBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}
export async function getGraphicsCard(motherBoardId, gpuBrandId) {
  let sqlQuery = `

`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherBoardId, gpuBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRam(motherboardId, ramBrandId) {
  let sqlQuery = `

`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, ramBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorage(motherboardId, storageBrandId) {
  let sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
  p.product_brand_id ,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	ss.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
inner join product_gallery pg on
	pg.product_id = p.product_id
inner join storage_specification ss on
	p.product_id = ss.product_id
`;
  if (motherboardId)
    sqlQuery += `
inner join motherboard_specification ms 
on 1=1
and ms.product_id  = :motherboardId
and (ms.sata is not null and ms.m2 is not null or ms.storage_interface = ss.interface)
`;

  sqlQuery += `
where
(:storageBrandId is null
		  or p.product_brand_id = :storageBrandId
    ) 
group by
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	ss.product_id,
	ss.specification_id
  ORDER BY 
  p.unit_price ASC
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, storageBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}
export async function upsertProcessorSpec(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    model,
    socket,
    micro_architecture,
    core_quantity,
    threads_quantity,
    clock_speed,
    boost_speed_max,
    cache,
    memory_support,
    channel_architecture,
    power,
    chipset,
    model_number,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.processor_specification (
      specification_id
      , product_id
      , product_specification_type
      , brand
      , model
      , socket
      , micro_architecture
      , core_quantity
      , threads_quantity
      , clock_speed
      , boost_speed_max
      , "cache"
      , memory_support
      , channel_architecture
      , power
      , chipset
      , model_number
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
      product_specification_type = EXCLUDED.product_specification_type,
      brand = EXCLUDED.brand,
      model = EXCLUDED.model,
      socket = EXCLUDED.socket,
      micro_architecture = EXCLUDED.micro_architecture,
      core_quantity = EXCLUDED.core_quantity,
      threads_quantity = EXCLUDED.threads_quantity,
      clock_speed = EXCLUDED.clock_speed,
      boost_speed_max = EXCLUDED.boost_speed_max,
      "cache" = EXCLUDED.cache,
      memory_support = EXCLUDED.memory_support,
      channel_architecture = EXCLUDED.channel_architecture,
      power = EXCLUDED.power,
      chipset = EXCLUDED.chipset
      model_number = EXCLUDED.model_number
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      model,
      socket,
      micro_architecture,
      core_quantity,
      threads_quantity,
      clock_speed,
      boost_speed_max,
      cache,
      memory_support,
      channel_architecture,
      power,
      chipset,
      model_number,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}
export async function upsertMotherboard(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    chipset,
    spu_socket,
    usb_details,
    audio,
    ethernet_controller,
    wifi_antenna,
    memory_slots,
    memory_supports,
    maximum_capacity,
    channel_architecture,
    sata,
    m2,
    raid_support,
    expansion_slots,
    air_cooling,
    power_connectors,
    audio_internal,
    rom,
    audio_codec,
    bluetooth,
    wifi,
    form_factor,
    brand,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.motherboard_specification (
      specification_id,
      product_id,
      product_specification_type,
      chipset,
      spu_socket,
      usb_details,
      audio,
      ethernet_controller,
      wifi_antenna,
      memory_slots,
      memory_supports,
      channel_architecture,
      sata,
      m2,
      raid_support,
      expansion_slots,
      air_cooling,
      power_connectors,
      audio_internal,
      rom,
      audio_codec,
      bluetooth,
      wifi,
      form_factor,
      brand
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
      product_id = EXCLUDED.product_id,
      product_specification_type = EXCLUDED.product_specification_type,
      chipset = EXCLUDED.chipset,
      spu_socket = EXCLUDED.spu_socket,
      usb_details = EXCLUDED.usb_details,
      audio = EXCLUDED.audio,
      ethernet_controller = EXCLUDED.ethernet_controller,
      wifi_antenna = EXCLUDED.wifi_antenna,
      memory_slots = EXCLUDED.memory_slots,
      memory_supports = EXCLUDED.memory_supports,
      channel_architecture = EXCLUDED.channel_architecture,
      sata = EXCLUDED.sata,
      m2 = EXCLUDED.m2,
      raid_support = EXCLUDED.raid_support,
      expansion_slots = EXCLUDED.expansion_slots,
      air_cooling = EXCLUDED.air_cooling,
      power_connectors = EXCLUDED.power_connectors,
      audio_internal = EXCLUDED.audio_internal,
      rom = EXCLUDED.rom,
      audio_codec = EXCLUDED.audio_codec,
      bluetooth = EXCLUDED.bluetooth,
      wifi = EXCLUDED.wifi,
      form_factor = EXCLUDED.form_factor,
      brand = EXCLUDED.brand
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      chipset,
      spu_socket,
      usb_details,
      audio,
      ethernet_controller,
      wifi_antenna,
      memory_slots,
      memory_supports,
      channel_architecture,
      sata,
      m2,
      raid_support,
      expansion_slots,
      air_cooling,
      power_connectors,
      audio_internal,
      rom,
      audio_codec,
      bluetooth,
      wifi,
      form_factor,
      brand,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertCase(dataObj) {
  const {
    specification_id,
    product_id,
    cabinet_type,
    side_panel_type,
    motherboard_supports,
    internal_drive_size,
    gpu_length,
    support_psu_size,
    front_panel,
    cpu_cooler_support_size,
  } = dataObj;
  const sqlQuery = `
    INSERT INTO public.case_specification 
    (specification_id, product_id, cabinet_type, side_panel_type
      , motherboard_supports, internal_drive_size, gpu_length, support_psu_size, front_panel, cpu_cooler_support_size) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        cabinet_type = EXCLUDED.cabinet_type,
        side_panel_type = EXCLUDED.side_panel_type,
        motherboard_supports = EXCLUDED.motherboard_supports,
        internal_drive_size = EXCLUDED.internal_drive_size,
        gpu_length = EXCLUDED.gpu_length,
        support_psu_size = EXCLUDED.support_psu_size,
        front_panel = EXCLUDED.front_panel,
        cpu_cooler_support_size = EXCLUDED.cpu_cooler_support_size
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      cabinet_type,
      side_panel_type,
      motherboard_supports,
      internal_drive_size,
      gpu_length,
      support_psu_size,
      front_panel,
      cpu_cooler_support_size,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertGraphicsCard(dataObj) {
  const {
    specification_id,
    product_id,
    chipset,
    memory,
    benchmark,
    max_power_consumption,
    base_clock_speed,
    length,
    cooler_type,
    interface_type,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.graphics_specification 
    (specification_id, product_id, chipset, memory, benchmark, max_power_consumption, base_clock_speed, length, cooler_type, interface) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        chipset = EXCLUDED.chipset,
        memory = EXCLUDED.memory,
        benchmark = EXCLUDED.benchmark,
        max_power_consumption = EXCLUDED.max_power_consumption,
        base_clock_speed = EXCLUDED.base_clock_speed,
        length = EXCLUDED.length,
        cooler_type = EXCLUDED.cooler_type,
        interface = EXCLUDED.interface
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      chipset,
      memory,
      benchmark,
      max_power_consumption,
      base_clock_speed,
      length,
      cooler_type,
      interface_type,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertRam(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    warranty,
    memory,
    ram_type,
    cas_latency,
    dimm_type,
    voltage,
    ram_speed,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.ram_specification 
    (specification_id, product_id, product_specification_type
      , brand, warranty, memory, ram_type, cas_latency, dimm_type, voltage,ram_speed) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        warranty = EXCLUDED.warranty,
        memory = EXCLUDED.memory,
        ram_type = EXCLUDED.ram_type,
        cas_latency = EXCLUDED.cas_latency,
        dimm_type = EXCLUDED.dimm_type,
        voltage = EXCLUDED.voltage,
        ram_speed = EXCLUDED.ram_speed
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      warranty,
      memory,
      ram_type,
      cas_latency,
      dimm_type,
      voltage,
      ram_speed,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertStorage(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    model,
    type,
    interface_type,
    form_factor,
    capacity,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.storage_specification 
    (specification_id, product_id, product_specification_type, brand, model, "type", form_factor, capacity, "interface") 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        model = EXCLUDED.model,
        "type" = EXCLUDED."type",
        form_factor = EXCLUDED.form_factor,
        capacity = EXCLUDED.capacity,
        "interface" = EXCLUDED.interface
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      model,
      type,
      form_factor,
      capacity,
      interface_type,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertCaseCooler(dataObj) {
  const { specification_id, product_id, model, airflow, fan_rpm, size } =
    dataObj;

  const sqlQuery = `
    INSERT INTO public.case_cooler_specification 
    (specification_id, product_id, model, airflow, fan_rpm, "size") 
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        model = EXCLUDED.model,
        airflow = EXCLUDED.airflow,
        fan_rpm = EXCLUDED.fan_rpm,
        "size" = EXCLUDED."size"
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      model,
      airflow,
      fan_rpm,
      size,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}
export async function upsertCpuCooler(dataObj) {
  const {
    specification_id,
    product_id,
    model,
    cpu_cooler,
    fan_rpm,
    noise_level,
    fan_number,
    cpu_cooler_size,
    fan_cfm,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.cooler_specification 
    (specification_id, product_id, model, cpu_cooler, fan_rpm, noise_level, fan_number, cpu_cooler_size,fan_cfm) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        model = EXCLUDED.model,
        cpu_cooler = EXCLUDED.cpu_cooler,
        fan_rpm = EXCLUDED.fan_rpm,
        noise_level = EXCLUDED.noise_level,
        fan_number = EXCLUDED.fan_number,
        cpu_cooler_size = EXCLUDED.cpu_cooler_size,
        fan_cfm = EXCLUDED.fan_cfm
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      model,
      cpu_cooler,
      fan_rpm,
      noise_level,
      fan_number,
      cpu_cooler_size,
      fan_cfm,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertPsu(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    model,
    form_factor,
    power,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.power_supply_specification 
    (specification_id, product_id, product_specification_type, brand, model, form_factor, power) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        model = EXCLUDED.model,
        form_factor = EXCLUDED.form_factor,
        power = EXCLUDED.power
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      model,
      form_factor,
      power,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertMonitor(dataObj) {
  const {
    specification_id,
    product_id,
    model,
    screen_size,
    resolution,
    response_time,
    aspect_ratio,
    refresh_rate,
    panel_type,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.monitor_specification 
    (specification_id, product_id, model, screen_size, resolution, response_time, aspect_ratio, refresh_rate, panel_type) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        model = EXCLUDED.model,
        screen_size = EXCLUDED.screen_size,
        resolution = EXCLUDED.resolution,
        response_time = EXCLUDED.response_time,
        aspect_ratio = EXCLUDED.aspect_ratio,
        refresh_rate = EXCLUDED.refresh_rate,
        panel_type = EXCLUDED.panel_type
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      model,
      screen_size,
      resolution,
      response_time,
      aspect_ratio,
      refresh_rate,
      panel_type,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function getProcessorMode(model) {
  const sqlQuery = `
  select * from proccessor_model pm where pm.model = :model
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { model },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function getRamType(ramType) {
  const sqlQuery = `
  select * from ram_type rt where rt.ram_type = :ramType
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { ramType },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function getCpuType(cpuType) {
  const sqlQuery = `
  select * from proccessor_model pm  where pm.model = :cpuType
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { cpuType },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function getFormFactor(formFactor) {
  const sqlQuery = `
  select * from form_factor where form_factor = :formFactor
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { formFactor },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function getGpuInterface(gpuInterface, gpuVersion) {
  const sqlQuery = `
  select * from graphics_interface gi  where interface_type = :gpuInterface and gpu_version = :gpuVersion
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { gpuInterface, gpuVersion },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function getStorageInterface(storageInterface) {
  const sqlQuery = `
   SELECT * FROM storage_interface WHERE storage_interface = '${storageInterface}'
`;
  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { storageInterface: storageInterface },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
export async function upsertMotherboardSupportRam(
  motherboardId,
  ramTypeId,
  ramMinRate,
  ramMaxRate,
) {
  const sqlQuery = `
      INSERT INTO public.motherboard_support_ram (
        motherboard_id,
        support_ram_type,
        support_min_ram_seq,
        support_max_ram_seq,
        created_at
      ) VALUES (
        '${motherboardId}',
        '${ramTypeId}',
        '${ramMinRate}',
        '${ramMaxRate}',
        now()
      )
      ON CONFLICT (motherboard_id, support_ram_type) DO UPDATE
      SET
        support_min_ram_seq = EXCLUDED.support_min_ram_seq,
        support_max_ram_seq = EXCLUDED.support_max_ram_seq,
        created_at = now()
      RETURNING *;
    `;
  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, ramTypeId, ramMinRate, ramMaxRate },
    type: SequelizeInstance.QueryTypes.INSERT, // Use QueryTypes.INSERT for the INSERT query
    raw: true, // Return raw data (without Sequelize model instances)
  });

  return result;
}
export async function upsertMotherboardSupportProcessor(
  motherboardId,
  cpuTypeId,
  cpuMinRate,
  cpuMaxRate,
) {
  const sqlQuery = `
   INSERT INTO public.motherboard_support_processor (motherboard_id, support_proccessor_type, support_proccessor_min_seq, support_proccessor_max_seq, created_at)
VALUES
    ('${motherboardId}', '${cpuTypeId}', '${cpuMinRate}', '${cpuMaxRate}', now())
ON CONFLICT (motherboard_id, support_proccessor_type)
DO UPDATE SET
    support_proccessor_min_seq = EXCLUDED.support_proccessor_min_seq,
    support_proccessor_max_seq = EXCLUDED.support_proccessor_max_seq
    RETURNING *;
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, cpuTypeId, cpuMinRate, cpuMaxRate },
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });
}
