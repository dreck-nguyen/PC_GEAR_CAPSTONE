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
    INSERT INTO public.user_pc_build (user_pc_build_id, user_id, created_at, profile_name, motherboard_id, processor_id, cpu_cooler_id, case_id, gpu_id, ram_id, storage_id, case_cooler_id, monitor_id)
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
      :monitor_id
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
      monitor_id = :monitor_id
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
