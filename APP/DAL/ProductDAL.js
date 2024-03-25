import {
  Product,
  ProductGallery,
  SequelizeInstance,
} from '../utility/DbHelper.js';

export async function getAllProduct() {
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
ARRAY_AGG(pg.image) AS image_links
FROM 
product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
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
    p."name",
    p.description,
    p.unit_price,
    p.discount,
    p.sold,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links
FROM 
    product p
LEFT OUTER JOIN 
    category c
ON 
    c.category_id = p.category_id 
    OR (c.parent_id IS NULL AND c.category_id = '${categoryId}')
    OR (c.category_id = '${categoryId}' OR c.parent_id = '${categoryId}')
LEFT OUTER JOIN 
    product_brand pb 
ON 
    pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN 
    product_gallery pg 
ON 
    pg.product_id = p.product_id
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id;
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
  console.log(existingProduct);
  const [updatedRows, updatedProductDetails] = await Product.update(product, {
    where: { product_id: productId },
    returning: true,
  });

  return [updatedRows, updatedProductDetails];
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
  rs.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN ram_specification rs  on p.product_id = rs.product_id
WHERE p.product_id = '${ramId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, rs.product_id, rs.specification_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorageById(storageId) {
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
  ss.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN storage_specification ss on p.product_id = ss.product_id
WHERE p.product_id = '${storageId}'
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ss.product_id, ss.specification_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getAutoGenById(autoGenId) {
  const sqlQuery = `
SELECT 
pbp.pre_build_id,
pbp.motherboard_id,
to_json(ms.*) AS motherboard_specification,
pbp.processor_id,
to_json(ps.*) AS processor_specification,
pbp.case_id,
to_json(cs.*) AS case_specification,
pbp.gpu_id,
to_json(gs.*) AS gpu_specification,
pbp.ram_id,
to_json(rs.*) AS ram_specification,
pbp.storage_id,
to_json(ss.*) AS storage_specification,
SUM(ms.unit_price::numeric) +
SUM(ps.unit_price::numeric) +
SUM(cs.unit_price::numeric) +
SUM(gs.unit_price::numeric) +
SUM(rs.unit_price::numeric) +
SUM(ss.unit_price::numeric) AS total_price
FROM 
public.pre_build_pc pbp
INNER JOIN 
(
SELECT 
  p.product_id as primary_product_id,
  p."name",
  p.description,
  p.unit_price,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
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
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ms.product_id, ms.specification_id
)ms 
ON pbp.motherboard_id = ms.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN processor_specification ps ON p.product_id = ps.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, ps.product_id, ps.specification_id
) ps 
ON pbp.processor_id = ps.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN case_specification cs ON p.product_id = cs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
) cs 
ON pbp.case_id = cs.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN graphics_specification gs ON p.product_id = gs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, gs.product_id, gs.specification_id
) gs 
ON pbp.gpu_id = gs.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN ram_specification rs ON p.product_id = rs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, rs.product_id, rs.specification_id
) rs 
ON pbp.ram_id = rs.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN storage_specification ss ON p.product_id = ss.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, ss.product_id, ss.specification_id
) ss 
ON pbp.storage_id = ss.primary_product_id
WHERE pbp.pre_build_id = '${autoGenId}'
group by pbp.pre_build_id, ms.*, ps.*, cs.*, gs.*, rs.*,ss.*
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
INNER JOIN processor_specification ps  on p.product_id = ps.product_id 
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
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ms.product_id, ms.specification_id
`;

  const motherBoardList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherBoardList;
}

export async function getCase() {
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
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
`;

  const caseList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}

export async function getGraphicsCard() {
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
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, gs.product_id, gs.specification_id
`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRam() {
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
  rs.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN ram_specification rs  on p.product_id = rs.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, rs.product_id, rs.specification_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorage() {
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
  ss.*
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
INNER JOIN storage_specification ss on p.product_id = ss.product_id 
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ss.product_id, ss.specification_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getAutoGen() {
  const sqlQuery = `
SELECT 
pbp.pre_build_id,
pbp.motherboard_id,
to_json(ms.*) AS motherboard_specification,
pbp.processor_id,
to_json(ps.*) AS processor_specification,
pbp.case_id,
to_json(cs.*) AS case_specification,
pbp.gpu_id,
to_json(gs.*) AS gpu_specification,
pbp.ram_id,
to_json(rs.*) AS ram_specification,
pbp.storage_id,
to_json(ss.*) AS storage_specification,
SUM(ms.unit_price::numeric) +
SUM(ps.unit_price::numeric) +
SUM(cs.unit_price::numeric) +
SUM(gs.unit_price::numeric) +
SUM(rs.unit_price::numeric) +
SUM(ss.unit_price::numeric) AS total_price
FROM 
public.pre_build_pc pbp
INNER JOIN 
(
SELECT 
  p.product_id as primary_product_id,
  p."name",
  p.description,
  p.unit_price,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
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
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ms.product_id, ms.specification_id
)ms 
ON pbp.motherboard_id = ms.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN processor_specification ps ON p.product_id = ps.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, ps.product_id, ps.specification_id
) ps 
ON pbp.processor_id = ps.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN case_specification cs ON p.product_id = cs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, cs.product_id, cs.specification_id
) cs 
ON pbp.case_id = cs.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN graphics_specification gs ON p.product_id = gs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, gs.product_id, gs.specification_id
) gs 
ON pbp.gpu_id = gs.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN ram_specification rs ON p.product_id = rs.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, rs.product_id, rs.specification_id
) rs 
ON pbp.ram_id = rs.primary_product_id 
INNER JOIN 
(
  SELECT 
    p.product_id as primary_product_id,
    p."name",
    p.description,
    p.unit_price,
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
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  INNER JOIN storage_specification ss ON p.product_id = ss.product_id 
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id, ss.product_id, ss.specification_id
) ss 
ON pbp.storage_id = ss.primary_product_id
group by pbp.pre_build_id, ms.*, ps.*, cs.*, gs.*, rs.*,ss.*
`;
  const autoGenList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return autoGenList;
}
