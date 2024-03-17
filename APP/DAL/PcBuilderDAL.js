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
 SELECT specification_id, product_id, product_specification_type, brand, chipset, memory, benchmark, max_power_consumption, clock_speed, base_clock_speed, length, frame_sync, cooler_typer, interface, support_api
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
 SELECT specification_id, product_id, product_specification_type, brand, model, screen_size, resolution, response_time, aspect_ration, refresh_rate, panel_type
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
  SELECT specification_id, product_id, product_specification_type, brand, model, form_factor, power, effeciency, color
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
  SELECT specification_id, product_id, product_specification_type, brand, model, socket, micro_architecture, core_quantity, threads_quantity, clock_speed, boost_speed_max, "cache", memory_support, ecc_memory, channel_architecture, power, graphic_chipset,chipset
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
  SELECT specification_id, product_id, product_specification_type, brand, warranty, memory, ram_type, cas_latency, dimm_type, voltage
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
 SELECT specification_id, product_id, product_specification_type, brand, model, "type", rpm, cache_memory, interface, form_factor, capacity
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
  SELECT specification_id, product_id, product_specification_type, chipset, spu_socket, usb_details, audio, ethernet_controller, ps_2, wifi_antenna, button, memory_slots, memory_supports, maximum_capacity, channel_architecture, sata, m2, dimm2, optane_memory_support, raid_support, expansion_slots, usb_internal, multi_gpu_support, air_cooling, liquid_cooling, power_connectors, "security", audio_internal, "diagnostics", rom, audio_codec, bluetooth, wifi, form_factor, pacakage_weight, box_dimessions,brand
  FROM public.motherboard_specification;
  `;
  const motherboardSpecification = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return motherboardSpecification;
}

export async function insertPreBuildPc(combine) {
  //   const sqlQuery = `
  //   INSERT INTO public.pre_build_pc (pre_build_id, motherboard_id, processor_id, cpu_cooler_id, case_id, gpu_id, ram_id, storage_id, case_cooler_id, monitor_id, created_by)
  //   VALUES(
  //     ${combine.pre_build_id}
  //     , ${combine.motherboard_id}
  //     , ${combine.processor_id}
  //     , ${combine.cpu_cooler}
  //     , ${combine.case_id}
  //     , ${combine.gpu_id}
  //     , ${combine.ram_id}
  //     , ${combine.storage}
  //     , ${combine.case_cooler_id}
  //     , ${combine.monitor_id}
  //     , ${combine.user_id});
  //   `;
  //   await SequelizeInstance.query(sqlQuery, {
  //     type: SequelizeInstance.QueryTypes.INSERT,
  //     raw: true,
  //   });
  // }
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
