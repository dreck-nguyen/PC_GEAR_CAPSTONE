import {
  Product,
  ProductGallery,
  ProcessorSpecification,
  MotherboardSpecification,
  SequelizeInstance,
  CaseSpecification,
  GpuSpecification,
  RamSpecification,
  StorageSpecification,
  CaseCoolerSpecification,
  CpuCoolerSpecification,
  PsuSpecification,
  MonitorSpecification,
} from '../utility/DbHelper.js';
import * as commonFunction from '../Common/CommonFunction.js';

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
    unit_price: commonFunction.validateNumber(product.unit_price),
    discount: commonFunction.validateNumber(product.discount),
    quantity: commonFunction.validateNumber(product.quantity),
    sold: commonFunction.validateNumber(product.sold),
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
select * from monitor_specification ms where product_id = :monitorId
`;

  const monitorList = await SequelizeInstance.query(sqlQuery, {
    replacements: { monitorId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return monitorList;
}
export async function getMonitorSpecification() {
  const sqlQuery = `
select * from monitor_specification ms 
`;

  const monitorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return monitorList;
}

export async function getPowerSupplyById(psuId) {
  const sqlQuery = `
  select * from power_supply_specification pss where product_id =:psuId
`;

  const powerSupplyList = await SequelizeInstance.query(sqlQuery, {
    replacements: { psuId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return powerSupplyList;
}

export async function getPowerSupplySpecification() {
  const sqlQuery = `
  select * from power_supply_specification pss 
`;

  const powerSupplyList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return powerSupplyList;
}

export async function getCpuCoolerById(cpuCoolerId) {
  const sqlQuery = `
select * from cooler_specification cs where cs.product_id = :cpuCoolerId
`;

  const cpuCoolerList = await SequelizeInstance.query(sqlQuery, {
    replacements: { cpuCoolerId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return cpuCoolerList;
}

export async function getCpuCoolerSpecification() {
  const sqlQuery = `
select * from cooler_specification cs 
`;

  const cpuCoolerList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return cpuCoolerList;
}

export async function getCaseCoolerById(caseCoolerId) {
  const sqlQuery = `
select * from case_cooler_specification ccs where product_id =:caseCoolerId
`;

  const caseCoolerList = await SequelizeInstance.query(sqlQuery, {
    replacements: { caseCoolerId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseCoolerList;
}

export async function getCaseCoolerSpecification() {
  const sqlQuery = `
  select * from case_cooler_specification ccs 
`;

  const caseCoolerList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseCoolerList;
}

export async function getProcessorSpecification() {
  const sqlQuery = `
select
  specification_id
  , product_id
  , pm.model
  , micro_architecture
  , clock_speed
  , boost_speed_max
  , "cache"
  , rm.model as memory_support
  , power
  , pc.*
from
  public.processor_specification ps
inner join (
SELECT pc.id, processor_chipset, pc.created_at, pm.model as  processor_socket, pc.processor_socket as processor_socket_id
, processor_chipset || '-' || pm.model  as label 
FROM public.processor_chipset pc
inner join proccessor_model pm
on pm.id =pc.processor_socket 
)
pc 
on pc.id  = ps.chipset 
inner join proccessor_model pm 
on pm.id = ps.model
inner join ram_model rm
on rm.id = ps.memory_support 
`;

  const processorList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return processorList;
}

export async function getProcessorById(processorId) {
  const sqlQuery = `
select
  specification_id
  , product_id
  , pm.model
  , micro_architecture
  , clock_speed
  , boost_speed_max
  , "cache"
  , rm.model as memory_support
  , power
  , pc.*
from
  public.processor_specification ps
inner join (
select pc.*, pc.processor_chipset || '-' || ps.socket as label  from processor_chipset pc
inner join processor_socket ps 
on pc.processor_socket = ps.id 
)
pc 
on pc.id  = ps.chipset 
inner join proccessor_model pm 
on pm.id = ps.model
inner join ram_model rm
on rm.id = ps.memory_support  
where ps.product_id = :processorId

`;
  const proccessorModel = await SequelizeInstance.query(sqlQuery, {
    replacements: { processorId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return proccessorModel;
}

export async function getMotherboardSpecification() {
  const sqlQuery = `
select
  specification_id
  , product_id
  , ps.socket as cpu_socket
  , usb_details
  , audio
  , memory_slots
  , sata
  , m2
  , power_connectors
  , wifi
  , ff.form_factor
  , gi.interface_type  as gpu_interface
  , si.storage_interface as storage_interface
  , mc.chipset
from
  public.motherboard_specification ms
inner join processor_socket ps
on ms.cpu_socket = ps.id
inner join form_factor ff 
on ff.id = ms.form_factor
inner join graphics_interface gi
on gi.id = ms.gpu_interface
inner join storage_interface si 
on si.id = ms.storage_interface
inner join motherboard_chipset mc 
on mc.id = ms.chipset 
`;

  const motherBoardList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherBoardList;
}

export async function getMotherboardById(motherBoardId) {
  const sqlQuery = `
select
  specification_id
  , product_id
  , ps.socket as cpu_socket
  , usb_details
  , audio
  , memory_slots
  , sata
  , m2
  , power_connectors
  , wifi
  , ff.form_factor
  , gi.interface_type  as gpu_interface
  , si.storage_interface as storage_interface
  , mc.chipset
from
  public.motherboard_specification ms
inner join processor_socket ps
on ms.cpu_socket = ps.id
inner join form_factor ff 
on ff.id = ms.form_factor
inner join graphics_interface gi
on gi.id = ms.gpu_interface
inner join storage_interface si 
on si.id = ms.storage_interface
inner join motherboard_chipset mc 
on mc.id = ms.chipset
where ms.product_id = :motherBoardId
`;

  const motherBoardList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherBoardId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherBoardList;
}

export async function getCaseSpecification() {
  const sqlQuery = `
  select * from case_specification 
`;

  const caseList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}

export async function getCaseById(caseId) {
  const sqlQuery = `
  select * from case_specification where product_id =:caseId

`;

  const caseList = await SequelizeInstance.query(sqlQuery, {
    replacements: { caseId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}

export async function getGraphicsCardSpecification() {
  const sqlQuery = `
select
  specification_id
  , product_id
  , gc.graphics_chipset  || '-' || gm.graphics_model  as chipset
  , memory
  , max_power_consumption
  , base_clock_speed
  , length
  , cooler_type
  , gi.interface_type  as interface
from
  public.graphics_specification gs
inner join graphics_interface gi 
on gi.id = gs.interface 
inner join graphics_model gm
on gm.id = gs.chipset
inner join graphics_chipset gc 
on gc.id  = gm.graphics_chipset 
`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getGraphicsCardById(gpuId) {
  const sqlQuery = `
select
  specification_id
  , product_id
  , gc.graphics_chipset  || '-' || gm.graphics_model  as chipset
  , memory
  , max_power_consumption
  , base_clock_speed
  , length
  , cooler_type
  , gi.interface_type  as interface
from
  public.graphics_specification gs
inner join graphics_interface gi 
on gi.id = gs.interface 
inner join graphics_model gm
on gm.id = gs.chipset
inner join graphics_chipset gc 
on gc.id  = gm.graphics_chipset
where gs.product_id = :gpuId
`;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    replacements: { gpuId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRamSpecification() {
  const sqlQuery = `
select
  specification_id
  , product_id
  , memory
  , rm.model || '-' || rt.data_rate || '-' || rt.data_transfer_rate as ram_type
  , cas_latency
  , dimm_type
  , voltage
from
  public.ram_specification rs 
inner join ram_type rt 
on rs.ram_type  = rt.id 
inner join ram_model rm 
on rt.ram_type = rm.id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getRamById(ramId) {
  const sqlQuery = `
select
  specification_id
  , product_id
  , memory
  , rm.model || '-' || rt.data_rate || '-' || rt.data_transfer_rate as ram_type
  , cas_latency
  , dimm_type
  , voltage
from
  public.ram_specification rs 
inner join ram_type rt 
on rs.ram_type  = rt.id 
inner join ram_model rm 
on rt.ram_type = rm.id
where rs.product_id = '${ramId}'
;
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorageSpecification() {
  const sqlQuery = `
  select
  specification_id
  , product_id
  , model
  , st.storage_type as "type"
  , si.storage_interface as interface
  , form_factor
  , capacity
  , ss.voltage
from
  public.storage_specification ss
inner join storage_type st 
on ss."type"  = st.id
inner join storage_interface si 
on si.id = ss.interface 

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
  specification_id
  , product_id
  , model
  , st.storage_type as "type"
  , si.storage_interface as interface
  , form_factor
  , capacity
  , ss.voltage
from
  public.storage_specification ss
inner join storage_type st 
on ss."type"  = st.id
inner join storage_interface si 
on si.id = ss.interface 
where ss.product_id = :storageId
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    replacements: { storageId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}
//
export async function getProcessor(motherboardId, brandId) {
  let sqlQuery = `
with cpu_spec as(
select ps.* 
from processor_specification ps
inner join proccessor_model pm 
on 1=1
and pm.id = ps.model
inner join processor_chipset pc
on 1=1
and pc.id = ps.chipset
inner join  processor_socket ps2
on 1=1
and ps2.id = pc.processor_socket
), cpu_main as(
select cr.* from cpu_spec cr
inner join (
select pm.*  from motherboard_support_processor msp 
inner join proccessor_model pm 
on msp.support_proccessor_type = pm.id
and(:motherboardId is null or msp.motherboard_id = :motherboardId)
) msp
on msp.id = cr.model
)
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
where p.product_id in (select product_id from cpu_main)
AND (:brandId is null or pb.product_brand_id = :brandId)
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
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
  with base as(
    select distinct ms.* from motherboard_specification ms
    inner join storage_specification ss
    on ms.storage_interface = ss.interface
    and (${storageId ? `'${storageId}'` : null} is null or ss.product_id = ${
    storageId ? `'${storageId}'` : null
  }) 
    inner join case_support_form_factor csff 
    on csff.form_factor = ms.form_factor
    and (${caseId ? `'${caseId}'` : null} is null or csff.case_id = ${
    caseId ? `'${caseId}'` : null
  }) 
    inner join motherboard_support_ram msr
    on msr.motherboard_id = ms.product_id 
    inner join ram_specification rs 
    on rs.ram_type = msr.support_ram_type
    and (${ramId ? `'${ramId}'` : null} is null or rs.product_id = ${
    ramId ? `'${ramId}'` : null
  }) 
    inner join motherboard_support_processor msp 
    on msp.motherboard_id = ms.product_id 
    inner join processor_specification ps 
    on ps.model = msp.support_proccessor_type 
    and (${
      processorId ? `'${processorId}'` : null
    } is null or ps.product_id = ${processorId ? `'${processorId}'` : null}) 
)
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
where p.product_id in (select product_id from base)
AND (:motherboardBrandId is null or pb.product_brand_id = :motherboardBrandId)
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
`;

  const motherboardList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherboardList;
}

export async function getCase(motherboardId, caseBrandId) {
  const sqlQuery = `
with base as(
  select cs.* from case_specification cs 
  inner join case_support_form_factor csff 
  on csff.case_id = cs.product_id
  inner join motherboard_specification ms 
  on ms.form_factor = csff.form_factor
  and (:motherboardId is null or ms.product_id = :motherboardId)
)
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
where p.product_id in (select product_id from base)
AND (:caseBrandId is null or pb.product_brand_id = :caseBrandId )
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
    ;
`;
  const caseList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, caseBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseList;
}
export async function getGraphicsCard(motherBoardId, gpuBrandId) {
  const sqlQuery = `
  WITH base AS (
    SELECT gs.*
    FROM graphics_specification gs 
    INNER JOIN motherboard_specification ms 
    ON ms.gpu_interface = gs.interface
    AND (:motherBoardId IS NULL OR ms.product_id = :motherBoardId)
  )
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
    p.product_id IN (SELECT product_id FROM base)
    AND (:gpuBrandId IS NULL OR pb.product_brand_id = :gpuBrandId)
  GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
  `;

  const gpuList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherBoardId, gpuBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return gpuList;
}

export async function getRam(motherboardId, processorId, ramBrandId) {
  let sqlQuery = `
  with base as(
select * from ram_specification rs 
inner join motherboard_support_ram msr 
on msr.support_ram_type = rs.ram_type
and (:motherboardId is null or msr.motherboard_id = :motherboardId)
inner join proccessor_support_ram psr 
on psr.ram_type = rs.ram_type
and (:processorId is null or psr.processor_id = :processorId)
)
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
where p.product_id in (select product_id from base)
AND (:ramBrandId is null or pb.product_brand_id = :ramBrandId)
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, processorId, ramBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}

export async function getStorage(motherboardId, storageBrandId) {
  let sqlQuery = `
  with base as(
select ss.* from storage_specification ss
inner join motherboard_specification ms
on ms.storage_interface = ss.interface
and (:motherboardId is null or ms.product_id = :motherboardId)
)
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
where p.product_id in (select product_id from base)
AND (:storageBrandId is null or pb.product_brand_id = :storageBrandId)
GROUP BY 
    p.product_id, c.category_id, pb.product_brand_id
`;

  const ramList = await SequelizeInstance.query(sqlQuery, {
    replacements: { motherboardId, storageBrandId },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramList;
}
export async function upsertProcessorSpec(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [processorSpec, created] = await ProcessorSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await processorSpec.update({ ...otherAttributes });
  }

  return processorSpec;
}
export async function deleteProcessorSpec(processorId) {
  const processorSpec = await ProcessorSpecification.findOne({
    where: { product_id: processorId },
  });

  if (!processorSpec) {
    throw new Error(
      `Processor specification with ID ${processorId} not found.`,
    );
  }
  await processorSpec.destroy();
}
export async function upsertMotherboard(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [motherboardSpec, created] =
    await MotherboardSpecification.findOrCreate({
      where: { product_id },
      defaults: { ...otherAttributes },
    });

  if (!created) {
    await motherboardSpec.update({ ...otherAttributes });
  }

  return motherboardSpec;
}

export async function deleteMotherboard(id) {
  const motherboardSpec = await MotherboardSpecification.findOne({
    where: { product_id: id },
  });

  if (!motherboardSpec) {
    throw new Error(`MOTHERBOARD specification with ID ${id} not found.`);
  }
  await motherboardSpec.destroy();
}

export async function upsertCase(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [caseSpec, created] = await CaseSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await caseSpec.update({ ...otherAttributes });
  }

  return caseSpec;
}

export async function deleteCase(id) {
  const caseSpec = await CaseSpecification.findOne({
    where: { product_id: id },
  });

  if (!caseSpec) {
    throw new Error(`CASE specification with ID ${id} not found.`);
  }
  await caseSpec.destroy();
}

export async function upsertGraphicsCard(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [gpuSpec, created] = await GpuSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await gpuSpec.update({ ...otherAttributes });
  }

  return gpuSpec;
}
export async function deleteGraphicsCard(id) {
  const gpuSpec = await GpuSpecification.findOne({
    where: { product_id: id },
  });

  if (!gpuSpec) {
    throw new Error(`GPU specification with ID ${id} not found.`);
  }
  await gpuSpec.destroy();
}

export async function upsertRam(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [ramSpec, created] = await RamSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await ramSpec.update({ ...otherAttributes });
  }

  return ramSpec;
}
export async function deleteRam(id) {
  const ramSpec = await RamSpecification.findOne({
    where: { product_id: id },
  });

  if (!ramSpec) {
    throw new Error(`RAM specification with ID ${id} not found.`);
  }
  await ramSpec.destroy();
}

export async function upsertStorage(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [storageSpec, created] = await StorageSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await storageSpec.update({ ...otherAttributes });
  }

  return storageSpec;
}

export async function deleteStorage(id) {
  const storageSpec = await StorageSpecification.findOne({
    where: { product_id: id },
  });

  if (!storageSpec) {
    throw new Error(`STORAGE specification with ID ${id} not found.`);
  }
  await storageSpec.destroy();
}

export async function upsertCaseCooler(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [spec, created] = await CaseCoolerSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await spec.update({ ...otherAttributes });
  }

  return spec;
}
export async function deleteCaseCooler(id) {
  const spec = await CaseCoolerSpecification.findOne({
    where: { product_id: id },
  });

  if (!spec) {
    throw new Error(`CASE COOLER specification with ID ${id} not found.`);
  }
  await spec.destroy();
}

export async function upsertCpuCooler(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [spec, created] = await CpuCoolerSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await spec.update({ ...otherAttributes });
  }

  return spec;
}
export async function deleteCpuCooler(id) {
  const spec = await CpuCoolerSpecification.findOne({
    where: { product_id: id },
  });

  if (!spec) {
    throw new Error(`CPU COOLER specification with ID ${id} not found.`);
  }
  await spec.destroy();
}

export async function upsertPsu(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [spec, created] = await PsuSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await spec.update({ ...otherAttributes });
  }

  return spec;
}

export async function deletePsu(id) {
  const spec = await PsuSpecification.findOne({
    where: { product_id: id },
  });

  if (!spec) {
    throw new Error(`CPU COOLER specification with ID ${id} not found.`);
  }
  await spec.destroy();
}

export async function upsertMonitor(dataObj) {
  const { product_id, ...otherAttributes } = dataObj;
  const [spec, created] = await MonitorSpecification.findOrCreate({
    where: { product_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await spec.update({ ...otherAttributes });
  }

  return spec;
}

export async function deleteMonitor(id) {
  const spec = await MonitorSpecification.findOne({
    where: { product_id: id },
  });

  if (!spec) {
    throw new Error(`MONITOR specification with ID ${id} not found.`);
  }
  await spec.destroy();
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
