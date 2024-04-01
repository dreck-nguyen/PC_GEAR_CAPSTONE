import { SequelizeInstance } from '../utility/DbHelper.js';
// getCaseCoolerSpecification
export async function getCaseCoolerSpecification() {
  const sqlQuery = `
  SELECT *
  FROM public.case_cooler_specification;
  `;
  const caseCoolerSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseCoolerSpecification;
}

// getCoolerSpecification
export async function getCoolerSpecification() {
  const sqlQuery = `
  SELECT *
  FROM public.cooler_specification;
  `;
  const coolerSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return coolerSpecification;
}

// getCaseSpecification
export async function getCaseSpecification() {
  const sqlQuery = `
  SELECT
    * 
  FROM public.case_specification;
  `;
  const caseSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseSpecification;
}

// getGraphicsSpecification
export async function getGraphicsSpecification() {
  const sqlQuery = `
 SELECT *
 FROM public.graphics_specification;
  `;
  const graphicsSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return graphicsSpecification;
}

// getMonitorSpecification
export async function getMonitorSpecification() {
  const sqlQuery = `
 SELECT *
FROM public.monitor_specification;
  `;
  const monitorSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return monitorSpecification;
}

// getPowerSupplySpecification
export async function getPowerSupplySpecification() {
  const sqlQuery = `
  SELECT *
FROM public.power_supply_specification;
  `;
  const powerSupplySpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return powerSupplySpecification;
}

// getProcessorSpecification
export async function getProcessorSpecification() {
  const sqlQuery = `
  SELECT *
  FROM public.processor_specification;
  `;
  const processorSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return processorSpecification;
}

// getRamSpecification
export async function getRamSpecification() {
  const sqlQuery = `
  SELECT *
FROM public.ram_specification;
  `;
  const ramSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return ramSpecification;
}

// getStorageSpecification
export async function getStorageSpecification() {
  const sqlQuery = `
 SELECT *
FROM public.storage_specification;
  `;
  const storageSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return storageSpecification;
}

// getMotherboardSpecification
export async function getMotherboardSpecification() {
  const sqlQuery = `
  SELECT *
  FROM public.motherboard_specification;
  `;
  const motherboardSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherboardSpecification;
}

export async function insertPreBuildPc(combine) {
  const sqlQuery = `
  INSERT INTO public.pre_build_pc (
    pre_build_id
    , motherboard_id
    , processor_id
    , case_id
    , gpu_id
    , ram_id
    , storage_id
    , created_by
  ) 
  VALUES(
    :pre_build_id
    , :motherboard_id
    , :processor_id
    , :case_id
    , :gpu_id
    , :ram_id
    , :storage_id
    , :user_id
  );
`;
  await SequelizeInstance.query(sqlQuery, {
    replacements: combine,
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });
}

export async function clearPreBuildPC() {
  const sqlQuery = `
  DELETE FROM public.pre_build_pc WHERE pre_build_id=gen_random_uuid();
  `;
  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
}

export async function createPersonalBuildPc(dataObj) {
  const sqlQuery = `
    INSERT INTO public.user_pc_build (
      user_pc_build_id
      , user_id
      , created_at
      , profile_name
      , motherboard_id
      , processor_id
      , cpu_cooler_id
      , case_id
      , gpu_id
      , ram_id
      , storage_id
      , case_cooler_id
      , monitor_id
      , psu_id)
    VALUES (
      :user_pc_build_id,
      :user_id,
      now(),
      :profile_name,
      :motherboard_id,
      :processor_id,
      :cpu_cooler_id,
      :case_id,
      :gpu_id,
      :ram_id,
      :storage_id,
      :case_cooler_id,
      :monitor_id,
      :psu_id
    )
    RETURNING *
  `;
  const createPersonalPc = await SequelizeInstance.query(sqlQuery, {
    replacements: dataObj,
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });

  return createPersonalPc;
}

export async function updatePersonalBuildPc(updatedData) {
  const sqlQuery = `
    UPDATE public.user_pc_build 
    SET 
      profile_name = :profile_name,
      motherboard_id = :motherboard_id,
      processor_id = :processor_id,
      cpu_cooler_id = :cpu_cooler_id,
      case_id = :case_id,
      gpu_id = :gpu_id,
      ram_id = :ram_id,
      storage_id = :storage_id,
      case_cooler_id = :case_cooler_id,
      monitor_id = :monitor_id,
      psu_id = :psu_id
    WHERE 
      user_pc_build_id = :user_pc_build_id
    RETURNING *
  `;

  const updateResult = await SequelizeInstance.query(sqlQuery, {
    replacements: updatedData,
    type: SequelizeInstance.QueryTypes.UPDATE,
    raw: true,
  });

  return updateResult;
}
export async function deletePersonalBuildPc(userId, userPcBuildId) {
  const sqlQuery = `
    DELETE FROM public.user_pc_build 
    WHERE 
      user_pc_build_id = :userPcBuildId
      AND user_id = :userId
    RETURNING *
  `;

  const updateResult = await SequelizeInstance.query(sqlQuery, {
    replacements: { userPcBuildId, userId },
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
  return updateResult;
}
export async function getPersonalBuildPc(userId) {
  const sqlQuery = `
 
SELECT 
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
  p.description,
  p.unit_price,
  TO_CHAR(p.unit_price, 'FM999,999,999') AS price,
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
  ) psu
on 1 = 1
and psu.primary_product_id = upb.psu_id
left join (
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
  ARRAY_AGG(pg.image) AS image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) case_cooler
on 1 = 1
and case_cooler.primary_product_id = upb.case_cooler_id
left join (
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
  ARRAY_AGG(pg.image) AS image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) monitor
on 1 = 1
and case_cooler.primary_product_id = upb.monitor_id
left join (
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
  ARRAY_AGG(pg.image) AS image_links
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id
  ) cpu_cooler
on 1 = 1
and case_cooler.primary_product_id = upb.cpu_cooler_id
LEFT JOIN 
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
ON upb.motherboard_id = ms.primary_product_id 
LEFT JOIN 
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
ON upb.processor_id = ps.primary_product_id 
LEFT JOIN 
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
ON upb.case_id = cs.primary_product_id 
LEFT JOIN 
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
ON upb.gpu_id = gs.primary_product_id 
LEFT JOIN 
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
ON upb.ram_id = rs.primary_product_id 
LEFT JOIN 
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
ON upb.storage_id = ss.primary_product_id
WHERE upb.user_id = '${userId}'
group by upb.user_pc_build_id, ms.*, ps.*, cs.*, gs.*, rs.*,ss.*, case_cooler.*, monitor.*,cpu_cooler.*,psu.*

`;
  const personalBuildPcList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return personalBuildPcList;
}
