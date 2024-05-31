import { BuildPurpose, SequelizeInstance } from '../utility/DbHelper.js';

// getPcBuildPurpose
export async function getPcBuildPurpose() {
  const sqlQuery = `
  SELECT *
  FROM public.build_purpose;
  `;
  const buildPurposeList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return buildPurposeList;
}

export async function getPcBuildPurposeById(purpose_id) {
  return await BuildPurpose.findByPk(purpose_id);
}

export async function genPcBuildPurpose() {
  const sqlQuery = `
  SELECT Count(purpose_id) as max_record 
  FROM public.build_purpose;
  `;
  const [buildPurposeList] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return buildPurposeList.max_record;
}

export async function upsertPcBuildPurpose(dataObj) {
  const { purpose_id, ...otherAttributes } = dataObj;
  console.log(dataObj);
  const [buildPurpose, created] = await BuildPurpose.findOrCreate({
    where: { purpose_id },
    defaults: { ...otherAttributes },
  });

  if (!created) {
    await buildPurpose.update({ ...otherAttributes });
  }

  return buildPurpose;
}

export async function deletePcBuildPurpose(purposeId) {
  const buildPurpose = await BuildPurpose.findOne({
    where: { purpose_id: purposeId },
  });

  if (!buildPurpose) {
    throw new Error(`BUILD PURPOSE with ID ${purposeId} not found.`);
  }
  await buildPurpose.destroy();
}

// getCaseCoolerSpecification
export async function getAutoGenByPurpose(purposeId, total) {
  const sqlQuery = `
  with base as(
select
  *
from
  build_purpose bp
where
  purpose_id = :purposeId
)
, cpu_require as(
select ps.* from proccessor_model pm 
inner join base b
on 1=1
and ( 
  1=1
  and b.cpu_minimum is not null 
  and b.cpu_minimum <= pm.priority)
and (
  1=1
  and b.cpu_maximum is not null 
  and b.cpu_maximum >= pm.priority)
inner join processor_specification ps
on 1=1
and ps.model = pm.id
)
--select
--  *
--from
--  cpu_require
, ram_require as(
select rs.* from ram_type rt
inner join base b
on 1=1
and (
  1=1
  and b.ram_minimum is not null 
  and b.ram_minimum <= rt.priority)
and (
  1=1
  and b.ram_maximum is not null 
  and b.ram_maximum >= rt.priority)
inner join ram_specification rs 
on rs.ram_type = rt.id
)
--select * from ram_require 
, gpu_require as(
select gs.* from graphics_model gm 
inner join base b
on 1=1
and   (b.graphics_minimum is not null and b.graphics_minimum <= gm.priority)
and (b.graphics_maximum is not null and b.graphics_maximum >= gm.priority)
inner join graphics_specification gs 
on gs.chipset = gm.id
)
--select * from gpu_require gr
, storage_require as(
select ss.* from storage_type st 
inner join base b 
on 1=1
and (b.storage_type is not null and b.storage_type = st.id)
inner join storage_specification ss
on st.id = ss.type
and (b.storage_capacity_minimum_required is not null and b.storage_capacity_minimum_required <= ss.capacity)
), combination as(
--select * from storage_require sr
select 
ms.product_id as motherboard_id
, ps.product_id as cpu_id
, rr.product_id as ram_id
, gr.product_id as gpu_id
, SUM(
    COALESCE (
      ms.power
      ,0
      )
    ) 
+ SUM(
  COALESCE (
    ps.power
    ,0
    )
  )
+ SUM(
  COALESCE (
    gr.max_power_consumption
    ,0
    )
  )
+ SUM(
  COALESCE (
    rr.voltage
    ,0
  )
) as minimum_votage_require
from motherboard_specification ms
inner join processor_socket ps2 
on 1=1
and ps2.id = ms.cpu_socket 
inner join processor_chipset pc 
on pc.processor_socket = ps2.id 
left join cpu_require ps 
on ps.chipset is not null and ps.chipset = pc.id
left join motherboard_support_ram msr
on 1=1
and msr.motherboard_id is not null and msr.motherboard_id = ms.product_id
left join ram_require rr
on 1=1
and rr.ram_type is not null and rr.ram_type = msr.support_ram_type
left join gpu_require gr
on 1=1
and gr.interface = ms.gpu_interface
where 1=1
group by 
ms.product_id
, ps.product_id
, rr.product_id
, gr.product_id
), product_basic_info as(
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
    ARRAY_AGG(pg.image) as image_links
from
  product p
left outer join category c on
  c.category_id = p.category_id
left outer join product_brand pb on
  pb.product_brand_id = p.product_brand_id
inner join product_gallery pg on
  pg.product_id = p.product_id
group by
  p.product_id,
  c.category_id,
  pb.product_brand_id
), result as(
select 
cb.motherboard_id as motherboard_id
, jsonb_agg(main.*) as motherboard_basic_information 
, cb.cpu_id as processor_id
, jsonb_agg(cpu.*) as processor_basic_information 
, cb.ram_id as ram_id
, jsonb_agg(ram.*) as ram_basic_information 
, cb.gpu_id as graphics_id
, jsonb_agg(graphic.*) as graphic_basic_information 
, cb.minimum_votage_require
, SUM(COALESCE(main.unit_price, 0)) 
    + SUM(COALESCE(cpu.unit_price, 0)) 
    + SUM(COALESCE(ram.unit_price, 0)) 
    + SUM(COALESCE(graphic.unit_price, 0)) AS total_price
from combination cb
inner join product_basic_info main
on 1=1
and main.primary_product_id= cb.motherboard_id
inner join product_basic_info cpu
on 1=1
and cpu.primary_product_id= cb.cpu_id
inner join product_basic_info ram
on 1=1
and ram.primary_product_id = cb.ram_id
inner join product_basic_info graphic
on 1=1
and graphic.primary_product_id = cb.gpu_id
where 1=1
group by
cb.motherboard_id
, cb.cpu_id
, cb.ram_id
, cb.gpu_id
,cb.minimum_votage_require
) 
select
    rs.motherboard_id as motherboard_id
  , rs.motherboard_basic_information as motherboard_specification
  , rs.processor_id as processor_id
  , rs.processor_basic_information as processor_specification
  , rs.ram_id as ram_id
  , rs.ram_basic_information as ram_specification
  , rs.graphics_id as gpu_id
  , rs.graphic_basic_information as gpu_specification
  , rs.minimum_votage_require as minimum_votage_require
  , TO_CHAR(rs.total_price,
    'FM999,999,999,999') as total_price
from result rs
where 1=1
and (:total = 0 or :total >= total_price)
ORDER BY 
    ABS(total_price - :total) ASC;
  `;
  const caseCoolerSpecification = await SequelizeInstance.query(sqlQuery, {
    replacements: { purposeId, total },
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return caseCoolerSpecification;
}

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
export async function insertPreBuildPcBulk(data) {
  try {
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
    VALUES ${data.map(() => '(?,?,?,?,?,?,?,?)').join(',')};
    `;

    const replacements = data.reduce((acc, combine) => {
      const {
        pre_build_id,
        motherboard_id,
        processor_id,
        case_id,
        gpu_id,
        ram_id,
        storage_id,
        user_id,
      } = combine;
      return acc.concat([
        pre_build_id,
        motherboard_id,
        processor_id,
        case_id,
        gpu_id,
        ram_id,
        storage_id,
        user_id,
      ]);
    }, []);

    await SequelizeInstance.query(sqlQuery, {
      replacements,
      type: SequelizeInstance.QueryTypes.INSERT,
      raw: true,
    });
  } catch (error) {
    throw error;
  }
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
  DELETE FROM public.pre_build_pc WHERE 1 = 1;
  `;
  await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.DELETE,
    raw: true,
  });
}

export async function countSameProfileName(profileName, userId) {
  const sqlQuery = `
  select count(profile_name) from user_pc_build upb where user_id = '${userId}' and profile_name = '${profileName}'
  `;
  return await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
}
export async function copyStaffToPersonalBuildPc(
  buildPcId,
  userId,
  userBuildId,
) {
  const sqlQuery = `
    INSERT INTO public.user_pc_build (
      user_pc_build_id,
      user_id,
      created_at,
      profile_name,
      motherboard_id,
      processor_id,
      cpu_cooler_id,
      case_id,
      gpu_id,
      ram_id,
      storage_id,
      case_cooler_id,
      monitor_id,
      psu_id,
      ram_quantity,
      storage_quantity,
	  purpose_id
    )
    SELECT
      :buildPcId,
      :userId,
      NOW(),
      'Copied ' || profile_name,
      motherboard_id,
      processor_id,
      cpu_cooler_id,
      case_id,
      gpu_id,
      ram_id,
      storage_id,
      case_cooler_id,
      monitor_id,
      psu_id,
      ram_quantity,
      storage_quantity,
	  3
    FROM
      user_pc_build
    WHERE
      user_pc_build_id = :userBuildId
    RETURNING *
  `;

  const replacements = {
    buildPcId: buildPcId,
    userId: userId,
    userBuildId: userBuildId,
  };

  const createPersonalPc = await SequelizeInstance.query(sqlQuery, {
    replacements: replacements,
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });

  return createPersonalPc;
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
      , psu_id
      , ram_quantity
      , storage_quantity
	  , purpose_id)
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
      :psu_id,
      :ram_quantity,
      :storage_quantity,
	  :purpose_id
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
      psu_id = :psu_id,
      ram_quantity = :ram_quantity,
      storage_quantity = :storage_quantity,
	  purpose_id = :purpose_id
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

export async function getPersonalBuildPcFe(userId) {
  const sqlQuery = `
with
  base as (
    select
      p.product_id as primary_product_id,
      p."name",
      p.description,
      p.unit_price,
      TO_CHAR(p.unit_price, 'FM999,999,999') as price,
      p.discount,
      p.sold,
      c."name" as category_name,
      pb.product_brand_name as brand_name,
      ARRAY_AGG(pg.image) as image_links
    from
      product p
      left outer join category c on c.category_id = p.category_id
      left outer join product_brand pb on pb.product_brand_id = p.product_brand_id
      inner join product_gallery pg on pg.product_id = p.product_id
    group by
      p.product_id,
      c.category_id,
      pb.product_brand_id
  )
select
  upb.user_pc_build_id,
  upb.user_id,
  upb.profile_name,
  upb.motherboard_id,
  to_json(
    json_build_object(
      'primary_product_id',
      ms.primary_product_id,
      'name',
      ms.name,
      'description',
      ms.description,
      'unit_price',
      ms.unit_price,
      'price',
      ms.price,
      'discount',
      ms.discount,
      'sold',
      ms.sold,
      'category_name',
      ms.category_name,
      'brand_name',
      ms.brand_name,
      'image_links',
      ms.image_links,
      'satmemory_slots',
      main_spec.memory_slots,
      'sata',
      main_spec.sata,
      'm2',
      main_spec.m2
    )
  ) as motherboard_specification,
  upb.processor_id,
   to_json(
    json_build_object(
      'primary_product_id',
      ps.primary_product_id,
      'name',
      ps.name,
      'description',
      ps.description,
      'unit_price',
      ps.unit_price,
      'price',
      ps.price,
      'discount',
      ps.discount,
      'sold',
      ps.sold,
      'category_name',
      ps.category_name,
      'brand_name',
      ps.brand_name,
      'image_links',
      ps.image_links,
      'power',
      cpu_spec.power
    )
  ) as processor_specification,
  upb.case_id,
  to_json(cs.*) as case_specification,
  upb.gpu_id,
  to_json(
    json_build_object(
      'primary_product_id',
      gs.primary_product_id,
      'name',
      gs.name,
      'description',
      gs.description,
      'unit_price',
      gs.unit_price,
      'price',
      gs.price,
      'discount',
      gs.discount,
      'sold',
      gs.sold,
      'category_name',
      gs.category_name,
      'brand_name',
      gs.brand_name,
      'image_links',
      gs.image_links,
      'max_power_consumption',
      gpu_spec.max_power_consumption
    )
  ) as gpu_specification,
  upb.ram_id,
  to_json(rs.*) as ram_specification,
  upb.storage_id,
  to_json(ss.*) as storage_specification,
  upb.case_cooler_id,
  to_json(case_cooler.*) as case_cooler,
  upb.monitor_id,
  to_json(monitor.*) as monitor,
  upb.cpu_cooler_id,
  to_json(cpu_cooler.*) as cpu_cooler,
  upb.psu_id,
  to_json(
    json_build_object(
      'primary_product_id',
      psu.primary_product_id,
      'name',
      psu.name,
      'description',
      psu.description,
      'unit_price',
      psu.unit_price,
      'price',
      psu.price,
      'discount',
      psu.discount,
      'sold',
      psu.sold,
      'category_name',
      psu.category_name,
      'brand_name',
      psu.brand_name,
      'image_links',
      psu.image_links,
      'power',
      psu_spec.power
    )
  ) as psu,
  upb.ram_quantity,
  upb.storage_quantity,
  build_purpose.purpose_name
from
  public.user_pc_build upb
  left join base AS psu on 1 = 1
  and psu.primary_product_id = upb.psu_id
  left join power_supply_specification as psu_spec
  on psu_spec.product_id = upb.psu_id
  left join base as case_cooler on 1 = 1
  and case_cooler.primary_product_id = upb.case_cooler_id
  left join base as monitor on 1 = 1
  and monitor.primary_product_id = upb.monitor_id
  left join base as cpu_cooler on 1 = 1
  and cpu_cooler.primary_product_id = upb.cpu_cooler_id
  left join base as ms on upb.motherboard_id = ms.primary_product_id
  left join motherboard_specification AS main_spec on upb.motherboard_id = main_spec.product_id
  left join base as ps on upb.processor_id = ps.primary_product_id
  left join processor_specification cpu_spec on cpu_spec.product_id = upb.processor_id
  left join base as cs on upb.case_id = cs.primary_product_id
  left join base as gs on upb.gpu_id = gs.primary_product_id
  left join graphics_specification as gpu_spec on gpu_spec.product_id = upb.gpu_id
  left join base as rs on upb.ram_id = rs.primary_product_id
  left join base as ss on upb.storage_id = ss.primary_product_id
  inner join build_purpose on build_purpose.purpose_id = upb.purpose_id
where
  1 = 1
  AND upb.user_id = '${userId}'
group by
  upb.user_pc_build_id,
  ms.*,
  ps.*,
  cs.*,
  gs.*,
  rs.*,
  ss.*,
  case_cooler.*,
  monitor.*,
  cpu_cooler.*,
  psu.*,
  upb.purpose_id,
  build_purpose.purpose_name,
  main_spec.memory_slots,
  main_spec.sata,
  main_spec.m2,
  ms.primary_product_id,
  ms.name,
  ms.description,
  ms.unit_price,
  ms.price,
  ms.discount,
  ms.sold,
  ms.category_name,
  ms.brand_name,
  ms.image_links,
  cpu_spec.power,
  ps.primary_product_id,
  ps.name,
  ps.description,
  ps.unit_price,
  ps.price,
  ps.discount,
  ps.sold,
  ps.category_name,
  ps.brand_name,
  ps.image_links,
  gpu_spec.max_power_consumption,
  gs.primary_product_id,
  gs.name,
  gs.description,
  gs.unit_price,
  gs.price,
  gs.discount,
  gs.sold,
  gs.category_name,
  gs.brand_name,
  gs.image_links,
  psu_spec.power,
  psu.primary_product_id,
  psu.name,
  psu.description,
  psu.unit_price,
  psu.price,
  psu.discount,
  psu.sold,
  psu.category_name,
  psu.brand_name,
  psu.image_links

`;
  const personalBuildPcList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return personalBuildPcList;
}

export async function getPersonalBuildPc(userId) {
  const sqlQuery = `
with base as (
select
    p.product_id as primary_product_id
    ,
    p."name"
    ,
    p.description
    ,
    p.unit_price
    ,
    TO_CHAR(p.unit_price
    ,
    'FM999,999,999') as price
    ,
    p.discount
    ,
    p.sold
    ,
    c."name" as category_name
    ,
    pb.product_brand_name as brand_name
    ,
    ARRAY_AGG(pg.image) as image_links
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
)
select
  upb.user_pc_build_id
  ,
  upb.user_id
  ,
  upb.profile_name
  ,
  upb.motherboard_id
  ,
  to_json(ms.*) as motherboard_specification
  ,
  upb.processor_id
  ,
  to_json(ps.*) as processor_specification
  ,
  upb.case_id
  ,
  to_json(cs.*) as case_specification
  ,
  upb.gpu_id
  ,
  to_json(gs.*) as gpu_specification
  ,
  upb.ram_id
  ,
  to_json(rs.*) as ram_specification
  ,
  upb.storage_id
  ,
  to_json(ss.*) as storage_specification
  ,
  upb.case_cooler_id
  ,
  to_json(case_cooler.*) as case_cooler
  ,
  upb.monitor_id
  ,
  to_json(monitor.*) as monitor
  ,
  upb.cpu_cooler_id
  ,
  to_json(cpu_cooler.*) as cpu_cooler
  ,
  upb.psu_id
  ,
  to_json(psu.*) as psu
  ,
  upb.ram_quantity
  ,
  upb.storage_quantity
  ,
  build_purpose.purpose_name
from
  public.user_pc_build upb
left join base AS psu
on
  1 = 1
  and psu.primary_product_id = upb.psu_id
left join base as case_cooler
on
  1 = 1
  and case_cooler.primary_product_id = upb.case_cooler_id
left join base as monitor
on
  1 = 1
  and monitor.primary_product_id = upb.monitor_id
left join base as cpu_cooler
on
  1 = 1
  and cpu_cooler.primary_product_id = upb.cpu_cooler_id
left join base as ms 
on
  upb.motherboard_id = ms.primary_product_id
left join 
base as  ps 
on
  upb.processor_id = ps.primary_product_id
left join 
base as  cs 
on
  upb.case_id = cs.primary_product_id
left join 
base as  gs 
on
  upb.gpu_id = gs.primary_product_id
left join 
base as  rs 
on
  upb.ram_id = rs.primary_product_id
left join 
base as  ss 
on
  upb.storage_id = ss.primary_product_id
inner join build_purpose
on
  build_purpose.purpose_id = upb.purpose_id
  where 
    upb.user_id = '${userId}'
group by
  upb.user_pc_build_id
  ,
  ms.*
  ,
  ps.*
  ,
  cs.*
  ,
  gs.*
  ,
  rs.*
  ,
  ss.*
  ,
  case_cooler.*
  ,
  monitor.*
  ,
  cpu_cooler.*
  ,
  psu.*
  ,
  upb.purpose_id
  ,
  build_purpose.purpose_name
`;
  const personalBuildPcList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return personalBuildPcList;
}
export async function getStaffPreBuildPc() {
  const sqlQuery = `
with base as (
select
    p.product_id as primary_product_id
    ,
    p."name"
    ,
    p.description
    ,
    p.unit_price
    ,
    TO_CHAR(p.unit_price
    ,
    'FM999,999,999') as price
    ,
    p.discount
    ,
    p.sold
    ,
    c."name" as category_name
    ,
    pb.product_brand_name as brand_name
    ,
    ARRAY_AGG(pg.image) as image_links
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
)
select
  upb.user_pc_build_id,
  upb.user_id,
  upb.profile_name,
  upb.motherboard_id,
  to_json(ms.*) as motherboard_specification,
  upb.processor_id,
  to_json(ps.*) as processor_specification,
  upb.case_id,
  to_json(cs.*) as case_specification,
  upb.gpu_id,
  to_json(gs.*) as gpu_specification,
  upb.ram_id,
  to_json(rs.*) as ram_specification,
  upb.storage_id,
  to_json(ss.*) as storage_specification,
  upb.case_cooler_id,
  to_json(case_cooler.*) as case_cooler,
  upb.monitor_id,
  to_json(monitor.*) as monitor,
  upb.cpu_cooler_id,
  to_json(cpu_cooler.*) as cpu_cooler,
  upb.psu_id,
  to_json(psu.*) as psu,
  upb.ram_quantity,
  upb.storage_quantity,
  (
    SUM(COALESCE(ms.unit_price::numeric, 0)) +
    SUM(COALESCE(ps.unit_price::numeric, 0)) +
    SUM(COALESCE(cs.unit_price::numeric, 0)) +
    SUM(COALESCE(ss.unit_price::numeric, 0) * COALESCE(upb.storage_quantity::numeric, 1)) +
    SUM(COALESCE(case_cooler.unit_price::numeric, 0)) +
    SUM(COALESCE(monitor.unit_price::numeric, 0)) +
    SUM(COALESCE(cpu_cooler.unit_price::numeric, 0)) +
    SUM(COALESCE(psu.unit_price::numeric, 0)) +
    SUM(COALESCE(gs.unit_price::numeric, 0))
  )::numeric AS total_price,
  build_purpose.purpose_name
from
  public.user_pc_build upb
left join base as  psu
on
  1 = 1
  and psu.primary_product_id = upb.psu_id
left join base as  case_cooler
on
  1 = 1
  and case_cooler.primary_product_id = upb.case_cooler_id
left join base as monitor
on
  1 = 1
  and monitor.primary_product_id = upb.monitor_id
left join base as  cpu_cooler
on
  1 = 1
  and cpu_cooler.primary_product_id = upb.cpu_cooler_id
left join 
base as ms 
on
  upb.motherboard_id = ms.primary_product_id
left join 
base as  ps 
on
  upb.processor_id = ps.primary_product_id
left join 
base as cs 
on
  upb.case_id = cs.primary_product_id
left join 
base as gs 
on
  upb.gpu_id = gs.primary_product_id
left join 
base as ss 
on
  upb.storage_id = ss.primary_product_id
left join 
base as rs 
on
  upb.ram_id = rs.primary_product_id
inner join build_purpose
on build_purpose.purpose_id = upb.purpose_id
where
  upb.user_id IN 
  (select user_id from public."user" u
  inner join user_role ur 
  on ur.role_id = u.role_id 
  where ur."role" = 'STAFF')
group by
  upb.user_pc_build_id,
  ms.*,
  ps.*,
  cs.*,
  gs.*,
  rs.*,
  ss.*,
  case_cooler.*,
  monitor.*,
  cpu_cooler.*,
  psu.*,
  upb.purpose_id,
  build_purpose.purpose_name
`;
  const personalBuildPcList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
  });

  return personalBuildPcList;
}
