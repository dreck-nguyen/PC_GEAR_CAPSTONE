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
export async function getPersonalBuildPc(userId) {
  const sqlQuery = `
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
left join (
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
    ,
    pss.*
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join power_supply_specification pss 
    on
    pss.product_id = p.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    pss.product_id
    ,
    pss.specification_id
  ) psu
on
  1 = 1
  and psu.primary_product_id = upb.psu_id
left join (
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
    ,
    ccs.specification_id
    , ccs.product_id
    , ccs.product_specification_type
    , ccs.brand
    , ccs.model::text
    , ccs.airflow::text
    , ccs.fan_rpm
    , ccs."size"::text
    , ccs.color
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join case_cooler_specification ccs 
      on
    ccs.product_id = p.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    ccs.product_id
    ,
    ccs.specification_id
  ) case_cooler
on
  1 = 1
  and case_cooler.primary_product_id = upb.case_cooler_id
left join (
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
  ) monitor
on
  1 = 1
  and monitor.primary_product_id = upb.monitor_id
left join (
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
    ,
    cs.*
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join cooler_specification cs 
    on
    cs.product_id = p.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    cs.product_id
    ,
    cs.specification_id 
  ) cpu_cooler
on
  1 = 1
  and cpu_cooler.primary_product_id = upb.cpu_cooler_id
left join 
(
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
    ,
    ms.*
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join (
    select
      ms.specification_id
      , ms.product_id
      , ms.product_specification_type
      , ms.chipset
      , ms.spu_socket
      , ms.usb_details
      , ms.audio
      , ms.ethernet_controller
      , ms.wifi_antenna
      , ms.memory_slots
      , ms.memory_supports
      , ms.channel_architecture
      , ms.sata
      , ms.m2
      , ms.raid_support
      , ms.expansion_slots
      , ms.air_cooling
      , ms.power_connectors
      , ms.audio_internal
      , ms.rom
      , ms.audio_codec
      , ms.bluetooth
      , ms.wifi
      , ff.form_factor
      , ms.brand
      , gi.interface_type
      , si.storage_interface
      , msr.ram_supports
      , msp.processor_supports
    from
      motherboard_specification ms
    inner join (
      select
        msp.motherboard_id
        , STRING_AGG(CONCAT(pm.model, '|', msp.support_proccessor_min_seq, '-', msp.support_proccessor_max_seq), '; ') as processor_supports
      from
        motherboard_support_processor msp
      inner join proccessor_model pm 
      on
        pm.id = msp.support_proccessor_type
      group by
        msp.motherboard_id
    ) msp
  on
      1 = 1
      and msp.motherboard_id = ms.product_id
    inner join (
      select
        msr.motherboard_id
        , STRING_AGG(CONCAT(rt.ram_type, '|', msr.support_min_ram_seq, '-', msr.support_max_ram_seq), '; ') as ram_supports
      from
        motherboard_support_ram msr
      inner join ram_type rt  
      on
        rt.id = msr.support_ram_type
      group by
        msr.motherboard_id

    ) msr 
      on
      1 = 1
      and msr.motherboard_id = ms.product_id
    inner join graphics_interface gi 
    on
      gi.id = ms.gpu_interface
    inner join storage_interface si 
    on
      si.id = ms.storage_interface
    inner join form_factor ff 
    on
      ff.id = ms.form_factor
    group by
      ms.specification_id
      , ms.product_id
      , ff.form_factor
      , gi.interface_type
      , si.storage_interface
      , msr.ram_supports
      , msp.processor_supports
) ms on
    p.product_id = ms.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    ms.product_id
    ,
    ms.specification_id
    , ms.product_id
    , ms.form_factor
    , ms.interface_type
    , ms.storage_interface
    , ms.ram_supports
    , ms.processor_supports
    , ms.product_id
    , ms.product_specification_type
    , ms.chipset
    , ms.spu_socket
    , ms.usb_details
    , ms.audio
    , ms.ethernet_controller
    , ms.wifi_antenna
    , ms.memory_slots
    , ms.memory_supports
    , ms.channel_architecture
    , ms.sata
    , ms.m2
    , ms.raid_support
    , ms.expansion_slots
    , ms.air_cooling
    , ms.power_connectors
    , ms.audio_internal
    , ms.rom
    , ms.audio_codec
    , ms.bluetooth
    , ms.wifi
    , ms.brand
)ms 
on
  upb.motherboard_id = ms.primary_product_id
left join 
(
select
  p.product_id as primary_product_id,
  p."name",
  p.description,
  pb.product_brand_id ,
  TO_CHAR(p.unit_price,
  'FM999,999,999') as unit_price,
  p.discount,
  p.sold,
  c."name" as category_name,
  pb.product_brand_name as brand_name,
  ARRAY_AGG(pg.image) as image_links,
  ps.specification_id,
  ps.product_id,
  ps.product_specification_type,
  ps.brand,
  pm.model || '-' || ps.model_number as model, 
  ps.socket,
  ps.micro_architecture,
  ps.core_quantity,
  ps.threads_quantity,
  ps.clock_speed,
  ps.boost_speed_max,
  ps."cache",
  rt.ram_type as memory_support,
  ps.channel_architecture,
  ps.power,
  ps.chipset
from
  product p
left join category c on
  c.category_id = p.category_id
left join product_brand pb on
  pb.product_brand_id = p.product_brand_id
inner join product_gallery pg on
  pg.product_id = p.product_id
inner join processor_specification ps on
  p.product_id = ps.product_id
left join motherboard_support_processor msp on
  ps.model = msp.support_proccessor_type
  and ps.model_number between msp.support_proccessor_min_seq and msp.support_proccessor_max_seq
inner join ram_type rt 
on rt.id = ps.memory_support
inner join proccessor_model pm  
on
  1 = 1
  and pm.id = ps.model
group by
  p.product_id,
  c.category_id,
  pb.product_brand_id,
  ps.product_id,
  ps.specification_id ,
  pm.model,
  rt.ram_type
) ps 
on
  upb.processor_id = ps.primary_product_id
left join 
(
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
    ,
    cs.*
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join case_specification cs on
    p.product_id = cs.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    cs.product_id
    ,
    cs.specification_id
) cs 
on
  upb.case_id = cs.primary_product_id
left join 
(
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
    ,
    gs.*
  from
    product p
  left outer join category c on
    c.category_id = p.category_id
  left outer join product_brand pb on
    pb.product_brand_id = p.product_brand_id
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join graphics_specification gs on
    p.product_id = gs.product_id
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    gs.product_id
    ,
    gs.specification_id
) gs 
on
  upb.gpu_id = gs.primary_product_id
left join 
(
  select
  p.product_id as primary_product_id,
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
  rs.specification_id
  , rs.product_id
  , rs.product_specification_type
  , rs.brand
  , rs.warranty
  , rs.memory
  , rt.ram_type
  , rs.cas_latency
  , rs.dimm_type
  , rs.voltage
  , rs.ram_speed
from
  product p
left outer join category c on
  c.category_id = p.category_id
left outer join product_brand pb on
  pb.product_brand_id = p.product_brand_id
inner join product_gallery pg on
  pg.product_id = p.product_id
inner join ram_specification rs on
  p.product_id = rs.product_id
inner join ram_type rt 
on rt.id = rs.ram_type
group by
p.product_brand_id,
  p.product_id,
  c.category_id,
  pb.product_brand_id,
  rs.product_id,
  rs.specification_id,
  rt.ram_type
) rs 
on
  upb.ram_id = rs.primary_product_id
left join 
(
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
    ,
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
  group by
    p.product_id
    ,
    c.category_id
    ,
    pb.product_brand_id
    ,
    ss.product_id
    ,
    ss.specification_id
) ss 
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
    SUM(COALESCE(rs.unit_price::numeric, 0)) +
    SUM(COALESCE(rs.unit_price::numeric, 0) * COALESCE(upb.ram_quantity::numeric, 1)) +
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
left join (
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
  ) psu
on
  1 = 1
  and psu.primary_product_id = upb.psu_id
left join (
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
  ) case_cooler
on
  1 = 1
  and case_cooler.primary_product_id = upb.case_cooler_id
left join (
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
  ) monitor
on
  1 = 1
  and monitor.primary_product_id = upb.monitor_id
left join (
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
  ) cpu_cooler
on
  1 = 1
  and cpu_cooler.primary_product_id = upb.cpu_cooler_id
left join 
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
  inner join product_gallery pg on
    pg.product_id = p.product_id
  inner join (
  select
      ms.specification_id
      , ms.product_id
      , ms.product_specification_type
      , ms.chipset
      , ms.spu_socket
      , ms.usb_details
      , ms.audio
      , ms.ethernet_controller
      , ms.wifi_antenna
      , ms.memory_slots
      , ms.memory_supports
      , ms.channel_architecture
      , ms.sata
      , ms.m2
      , ms.raid_support
      , ms.expansion_slots
      , ms.air_cooling
      , ms.power_connectors
      , ms.audio_internal
      , ms.rom
      , ms.audio_codec
      , ms.bluetooth
      , ms.wifi
      , ff.form_factor
      , ms.brand
      , gi.interface_type
      , si.storage_interface
      , msr.ram_supports
      , msp.processor_supports
    from
      motherboard_specification ms
    inner join (
      select
        msp.motherboard_id
        , STRING_AGG(CONCAT(pm.model, '|', msp.support_proccessor_min_seq, '-', msp.support_proccessor_max_seq), '; ') as processor_supports
      from
        motherboard_support_processor msp
      inner join proccessor_model pm 
      on
        pm.id = msp.support_proccessor_type
      group by
        msp.motherboard_id
    ) msp
  on
      1 = 1
      and msp.motherboard_id = ms.product_id
    inner join (
      select
        msr.motherboard_id
        , STRING_AGG(CONCAT(rt.ram_type, '|', msr.support_min_ram_seq, '-', msr.support_max_ram_seq), '; ') as ram_supports
      from
        motherboard_support_ram msr
      inner join ram_type rt  
      on
        rt.id = msr.support_ram_type
      group by
        msr.motherboard_id
    ) msr 
      on
      1 = 1
      and msr.motherboard_id = ms.product_id
    inner join graphics_interface gi 
    on
      gi.id = ms.gpu_interface
    inner join storage_interface si 
    on
      si.id = ms.storage_interface
    inner join form_factor ff 
    on
      ff.id = ms.form_factor
    group by
      ms.specification_id
      , ms.product_id
      , ff.form_factor
      , gi.interface_type
      , si.storage_interface
      , msr.ram_supports
      , msp.processor_supports
  ) ms on
    p.product_id = ms.product_id
  group by
    p.product_id,
    c.category_id,
    pb.product_brand_id,
    ms.specification_id
    , ms.product_id
    , ms.form_factor
    , ms.interface_type
    , ms.storage_interface
    , ms.ram_supports
    , ms.processor_supports
    , ms.product_id
    , ms.product_specification_type
    , ms.chipset
    , ms.spu_socket
    , ms.usb_details
    , ms.audio
    , ms.ethernet_controller
    , ms.wifi_antenna
    , ms.memory_slots
    , ms.memory_supports
    , ms.channel_architecture
    , ms.sata
    , ms.m2
    , ms.raid_support
    , ms.expansion_slots
    , ms.air_cooling
    , ms.power_connectors
    , ms.audio_internal
    , ms.rom
    , ms.audio_codec
    , ms.bluetooth
    , ms.wifi
    , ms.brand
)ms 
on
  upb.motherboard_id = ms.primary_product_id
left join 
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
  inner join product_gallery pg on
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
  upb.processor_id = ps.primary_product_id
left join 
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
  inner join product_gallery pg on
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
  upb.case_id = cs.primary_product_id
left join 
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
  inner join product_gallery pg on
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
  upb.gpu_id = gs.primary_product_id
left join 
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
  inner join product_gallery pg on
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
  upb.ram_id = rs.primary_product_id
left join 
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
  inner join product_gallery pg on
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
  upb.storage_id = ss.primary_product_id
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
