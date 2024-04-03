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
    ARRAY_AGG(pg.image) AS image_links
FROM 
    product p
LEFT OUTER JOIN 
    category c ON c.category_id = p.category_id
LEFT OUTER JOIN 
    product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN 
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
export async function getAllProduct() {
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
    ARRAY_AGG(pg.image) AS image_links
FROM 
    product p
LEFT OUTER JOIN 
    category c ON c.category_id = p.category_id
LEFT OUTER JOIN 
    product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN 
    product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
ORDER BY 
    p.product_id
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
LEFT OUTER JOIN 
    product_gallery pg ON pg.product_id = p.product_id
WHERE 
  p."name" like '%${productName}%'
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
ORDER BY 
    p.product_id
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
ARRAY_AGG(pg.image) AS image_links
FROM 
product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
WHERE p.product_id = '${productId}'
GROUP BY 
p.product_id, c.category_id, pb.product_brand_id
`;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
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
    ARRAY_AGG(pg.image) AS image_links
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
    p.product_id, p.category_id, p.name, p.description, p.unit_price, p.discount, p.sold, c.name, pb.product_brand_name;
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

export async function getMonitor() {
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
ms.*
FROM 
product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
ms.*
FROM 
product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
  ps.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN processor_specification ps  on p.product_id = ps.product_id
WHERE p.product_id = '${processorId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ps.product_id, ps.specification_id
`;

  const processorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return processorList;
}

export async function getMotherboardById(motherBoardId) {
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
  ms.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN motherboard_specification ms on p.product_id = ms.product_id
WHERE p.product_id = '${motherBoardId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ms.product_id, ms.specification_id
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
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN case_specification cs on p.product_id = cs.product_id
WHERE p.product_id = '${caseId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
`;

  const caseList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}

export async function getGraphicsCardById(gpuId) {
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
  gs.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN graphics_specification gs  on p.product_id = gs.product_id
WHERE p.product_id = '${gpuId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, gs.product_id, gs.specification_id
`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRamById(ramId) {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	rs.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join ram_specification rs on
	p.product_id = rs.product_id
where
	p.product_id = '${ramId}'
group by
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	rs.product_id,
	rs.specification_id
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
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join storage_specification ss on
	p.product_id = ss.product_id
where
	p.product_id = '${storageId}'
group by
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

export async function getAutoGenById(autoGenId) {
  const sqlQuery = `
select
	pbp.pre_build_id,
	pbp.motherboard_id,
	to_json(ms.*) as motherboard_specification,
	pbp.processor_id,
	to_json(ps.*) as processor_specification,
	pbp.case_id,
	to_json(cs.*) as case_specification,
	pbp.gpu_id,
	to_json(gs.*) as gpu_specification,
	pbp.ram_id,
	to_json(rs.*) as ram_specification,
	pbp.storage_id,
	to_json(ss.*) as storage_specification,
	SUM(ms.unit_price::numeric) +
SUM(ps.unit_price::numeric) +
SUM(cs.unit_price::numeric) +
SUM(gs.unit_price::numeric) +
SUM(rs.unit_price::numeric) +
SUM(ss.unit_price::numeric) as total_price
from
	public.pre_build_pc pbp
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		ms.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join motherboard_specification ms on
		p.product_id = ms.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ms.product_id,
		ms.specification_id
)ms 
on
	pbp.motherboard_id = ms.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		ps.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join processor_specification ps on
		p.product_id = ps.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ps.product_id,
		ps.specification_id
) ps 
on
	pbp.processor_id = ps.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		cs.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join case_specification cs on
		p.product_id = cs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		cs.product_id,
		cs.specification_id
) cs 
on
	pbp.case_id = cs.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		gs.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join graphics_specification gs on
		p.product_id = gs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		gs.product_id,
		gs.specification_id
) gs 
on
	pbp.gpu_id = gs.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		rs.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join ram_specification rs on
		p.product_id = rs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		rs.product_id,
		rs.specification_id
) rs 
on
	pbp.ram_id = rs.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
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
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join storage_specification ss on
		p.product_id = ss.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ss.product_id,
		ss.specification_id
) ss 
on
	pbp.storage_id = ss.primary_product_id
where
	pbp.pre_build_id = '${autoGenId}'
group by
	pbp.pre_build_id,
	ms.*,
	ps.*,
	cs.*,
	gs.*,
	rs.*,
	ss.*
`;
  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

//
export async function getProcessor() {
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
  ps.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN processor_specification ps on p.product_id = ps.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ps.product_id, ps.specification_id
`;

  const processorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return processorList;
}

export async function getMotherboard() {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	ms.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join motherboard_specification ms on
	p.product_id = ms.product_id
group by
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	ms.product_id,
	ms.specification_id
`;

  const motherBoardList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherBoardList;
}

export async function getCase() {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	cs.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join case_specification cs on
	p.product_id = cs.product_id
group by
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	cs.product_id,
	cs.specification_id
`;

  const caseList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}

export async function getGraphicsCard() {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	gs.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join graphics_specification gs on
	p.product_id = gs.product_id
group by
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	gs.product_id,
	gs.specification_id
`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRam() {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
	TO_CHAR(p.unit_price,
	'FM999,999,999') as unit_price,
	p.discount,
	p.sold,
	c."name" as category_name,
	pb.product_brand_name as brand_name,
	ARRAY_AGG(pg.image) as image_links,
	rs.*
from
	product p
left outer join category c on
	c.category_id = p.category_id
left outer join product_brand pb on
	pb.product_brand_id = p.product_brand_id
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join ram_specification rs on
	p.product_id = rs.product_id
group by
	p.product_id,
	c.category_id,
	pb.product_brand_id,
	rs.product_id,
	rs.specification_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorage() {
  const sqlQuery = `
select
	p.product_id,
	p."name",
	p.description,
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
left outer join product_gallery pg on
	pg.product_id = p.product_id
inner join storage_specification ss on
	p.product_id = ss.product_id
group by
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

export async function getAutoGen() {
  const sqlQuery = `
select
	pbp.pre_build_id,
	pbp.motherboard_id,
	to_json(ms.*) as motherboard_specification,
	pbp.processor_id,
	to_json(ps.*) as processor_specification,
	pbp.case_id,
	to_json(cs.*) as case_specification,
	pbp.gpu_id,
	to_json(gs.*) as gpu_specification,
	pbp.ram_id,
	to_json(rs.*) as ram_specification,
	pbp.storage_id,
	to_json(ss.*) as storage_specification,
	SUM(ms.unit_price::numeric) +
SUM(ps.unit_price::numeric) +
SUM(cs.unit_price::numeric) +
SUM(gs.unit_price::numeric) +
SUM(rs.unit_price::numeric) +
SUM(ss.unit_price::numeric) as total_price
from
	public.pre_build_pc pbp
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		ms.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join motherboard_specification ms on
		p.product_id = ms.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ms.product_id,
		ms.specification_id
)ms 
on
	pbp.motherboard_id = ms.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		ps.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join processor_specification ps on
		p.product_id = ps.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ps.product_id,
		ps.specification_id
) ps 
on
	pbp.processor_id = ps.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		cs.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join case_specification cs on
		p.product_id = cs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		cs.product_id,
		cs.specification_id
) cs 
on
	pbp.case_id = cs.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		gs.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join graphics_specification gs on
		p.product_id = gs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		gs.product_id,
		gs.specification_id
) gs 
on
	pbp.gpu_id = gs.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links,
		rs.*
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join ram_specification rs on
		p.product_id = rs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		rs.product_id,
		rs.specification_id
) rs 
on
	pbp.ram_id = rs.primary_product_id
inner join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
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
	left outer join product_gallery pg on
		pg.product_id = p.product_id
	inner join storage_specification ss on
		p.product_id = ss.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ss.product_id,
		ss.specification_id
) ss 
on
	pbp.storage_id = ss.primary_product_id
group by
	pbp.pre_build_id,
	ms.*,
	ps.*,
	cs.*,
	gs.*,
	rs.*,
	ss.*
`;
  const autoGenList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return autoGenList;
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
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.processor_specification (
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
      "cache",
      memory_support,
      channel_architecture,
      power,
      chipset
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      brand
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      maximum_capacity = EXCLUDED.maximum_capacity,
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
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}

export async function upsertCase(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    cabinet_type,
    side_panel_type,
    color,
    motherboard_supports,
    internal_drive_size,
    gpu_length,
    support_psu_size,
    front_panel,
    cpu_cooler_support_size,
  } = dataObj;
  const sqlQuery = `
    INSERT INTO public.case_specification 
    (specification_id, product_id, product_specification_type, brand, cabinet_type, side_panel_type, color, motherboard_supports, internal_drive_size, gpu_length, support_psu_size, front_panel, cpu_cooler_support_size) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        cabinet_type = EXCLUDED.cabinet_type,
        side_panel_type = EXCLUDED.side_panel_type,
        color = EXCLUDED.color,
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
      product_specification_type,
      brand,
      cabinet_type,
      side_panel_type,
      color,
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
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.graphics_specification 
    (specification_id, product_id, product_specification_type, brand, chipset, memory, benchmark, max_power_consumption, base_clock_speed, length, cooler_type, interface) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
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
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.ram_specification 
    (specification_id, product_id, product_specification_type, brand, warranty, memory, ram_type, cas_latency, dimm_type, voltage) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        warranty = EXCLUDED.warranty,
        memory = EXCLUDED.memory,
        ram_type = EXCLUDED.ram_type,
        cas_latency = EXCLUDED.cas_latency,
        dimm_type = EXCLUDED.dimm_type,
        voltage = EXCLUDED.voltage
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
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    model,
    airflow,
    fan_rpm,
    size,
    color,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.case_cooler_specification 
    (specification_id, product_id, product_specification_type, brand, model, airflow, fan_rpm, "size", color) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        model = EXCLUDED.model,
        airflow = EXCLUDED.airflow,
        fan_rpm = EXCLUDED.fan_rpm,
        "size" = EXCLUDED."size",
        color = EXCLUDED.color
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      model,
      airflow,
      fan_rpm,
      size,
      color,
    ],
    type: SequelizeInstance.QueryTypes.UPSERT,
  });

  return result;
}
export async function upsertCpuCooler(dataObj) {
  const {
    specification_id,
    product_id,
    product_specification_type,
    brand,
    model,
    cpu_cooler,
    fan_rpm,
    noise_level,
    fan_number,
    cpu_cooler_size,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.cooler_specification 
    (specification_id, product_id, product_specification_type, brand, model, cpu_cooler, fan_rpm, noise_level, fan_number, cpu_cooler_size) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
        model = EXCLUDED.model,
        cpu_cooler = EXCLUDED.cpu_cooler,
        fan_rpm = EXCLUDED.fan_rpm,
        noise_level = EXCLUDED.noise_level,
        fan_number = EXCLUDED.fan_number,
        cpu_cooler_size = EXCLUDED.cpu_cooler_size
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      specification_id,
      product_id,
      product_specification_type,
      brand,
      model,
      cpu_cooler,
      fan_rpm,
      noise_level,
      fan_number,
      cpu_cooler_size,
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
    product_specification_type,
    brand,
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
    (specification_id, product_id, product_specification_type, brand, model, screen_size, resolution, response_time, aspect_ratio, refresh_rate, panel_type) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (product_id) DO UPDATE SET
        product_specification_type = EXCLUDED.product_specification_type,
        brand = EXCLUDED.brand,
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
      product_specification_type,
      brand,
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
