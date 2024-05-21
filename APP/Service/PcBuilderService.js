import * as pcBuilderDAL from '../DAL/PcBuilderDAL.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { v4 as uuidv4 } from 'uuid';
export async function getPcBuildPurpose() {
  return await pcBuilderDAL.getPcBuildPurpose();
}

export async function getPcBuildPurposeById(purposeId) {
  return await pcBuilderDAL.getPcBuildPurposeById(purposeId);
}

export async function deletePcBuildPurpose(purposeId) {
  await pcBuilderDAL.deletePcBuildPurpose(purposeId);
}

export async function getAutoGenByPurpose(purposeId, total) {
  const [result] = await pcBuilderDAL.getAutoGenByPurpose(purposeId, total);
  return result;
}

export async function genPcBuildPurposeId() {
  return (await pcBuilderDAL.genPcBuildPurpose()) + 1;
}

export async function upsertPcBuildPurpose(purposeId, dataObj) {
  if (purposeId === null) dataObj.purpose_id = await genPcBuildPurposeId();
  return await pcBuilderDAL.upsertPcBuildPurpose(dataObj);
}

export async function pcBuilderService(userId) {
  const result = [];
  //   caseCoolerSpecification
  const caseCoolerSpecification =
    await pcBuilderDAL.getCaseCoolerSpecification();

  // getCaseSpecification
  const caseSpecification = await pcBuilderDAL.getCaseSpecification();

  //   getCoolerSpecification
  const coolerSpecification = await pcBuilderDAL.getCoolerSpecification();

  //   getGraphicsSpecification
  const graphicsSpecification = await pcBuilderDAL.getGraphicsSpecification();

  //   getMonitorSpecification
  const monitorSpecification = await pcBuilderDAL.getMonitorSpecification();

  //   getPowerSupplySpecification
  const powerSupplySpecification =
    await pcBuilderDAL.getPowerSupplySpecification();

  //   getProcessorSpecification
  const processorSpecification = await pcBuilderDAL.getProcessorSpecification();

  //   getStorageSpecification
  const storageSpecification = await pcBuilderDAL.getStorageSpecification();

  //   getRamSpecification
  const ramSpecification = await pcBuilderDAL.getRamSpecification();

  //   getMotherboardSpecification
  const motherboardSpecification =
    await pcBuilderDAL.getMotherboardSpecification();

  const preBuildPc = motherboardSpecification.reduce((acc, curr) => {
    const rs = {};
    const processors = { chipset: curr.chipset, socket: curr.spu_socket };
    // Processor Section
    rs['processors'] = processors;

    // Ram Section
    const ramDetails = {
      quantity: Number(curr.memory_slots.split('x')[0]),
      details: curr.memory_supports
        .replace('DDR3 ', '')
        .replace('DDR4 ', '')
        .replace('DDR5 ', '')
        .split(', ')
        .map((frequency) => {
          const formattedFrequency = `${curr.memory_supports.split(' ')[0]}-${
            frequency.trim().includes('MHz')
              ? frequency.trim()
              : frequency.trim() + ' MHz'
          }`;
          return formattedFrequency;
        }),
    };

    rs['ram_details'] = ramDetails;

    // Storage Section
    const m2 = curr.m2.split(' x ')[1];

    const storage = {
      quantity: Number(curr.sata.split('x')[0].trim()),
      type: curr.sata.split('x')[1].trim(),
      m2: m2,
    };
    rs['storage'] = storage;

    const caseFit = caseSpecification.filter((e) =>
      e.motherboard_supports.includes(curr.form_factor),
    );

    const ramSpec = ramSpecification.filter((ram) =>
      ramDetails.details.includes(ram.ram_type),
    );
    const storageSpec = storageSpecification.filter(
      (storage) => storage.interface === m2,
    );

    const processorSpec = processorSpecification.filter(
      (processor) => processor.chipset === processors.chipset,
    );

    const gpuFitByCaseLengthAllow = caseFit.reduce((acc, cur) => {
      const gpuLength = commonFunction.extractNumberFromString(cur.gpu_length);
      const gpuFit = graphicsSpecification
        .filter((gpu) => Number(gpu.length) <= gpuLength)
        .map((e) => ({
          case_id: curr.product_id,
          ...e,
        }));

      acc.push(...gpuFit);
      return acc;
    }, []);
    const cpuCoolerFitByCase = caseFit.reduce((acc, cur) => {
      const cpuCoolerSupportSize =
        commonFunction.extractNumberFromCpuCoolerSupportSize(
          cur.cpu_cooler_support_size,
        );
      const cpuCoolerSpec = coolerSpecification
        .filter(
          (cpuCooler) =>
            Number(
              commonFunction.extractNumberFromCpuCoolerSupportSize(
                cpuCooler.cpu_cooler_size,
              ),
            ) <= cpuCoolerSupportSize,
        )
        .map((e) => ({
          case_id: curr.product_id,
          ...e,
        }));
      acc.push(...cpuCoolerSpec);
      return acc;
    }, []);

    const processorsFit = processorSpec.map((e) => ({
      product_id: e.product_id,
      power: e.power,
    }));
    const casFit = caseFit.map((e) => e.product_id);
    const ramFit = ramSpec.map((e) => e.product_id);
    const storageFit = storageSpec.map((e) => e.product_id);
    const gpuFit = gpuFitByCaseLengthAllow.map((e) => ({
      case_id: e.case_id,
      gpu_id: e.product_id,
      max_power_consumption: e.max_power_consumption,
    }));
    const cpuCoolerFit = cpuCoolerFitByCase.map((e) => ({
      case_id: e.case_id,
      cpu_cooler_id: e.product_id,
    }));

    const procFit = processorSpec.map((e) => ({
      product_id: e.product_id,
      power: e.power,
    }));
    rs['caseFit'] = casFit;
    rs['ramFit'] = ramFit;
    rs['storageQuantity'] = storage.quantity;
    rs['storageFit'] = storageFit;
    rs['gpuFit'] = gpuFit;
    rs['cpuCoolerFit'] = cpuCoolerFit;
    console.log(`~~~~~processorsFit`, processorsFit.length);
    console.log(`~~~~~cpuCoolerFit`, cpuCoolerFit.length);
    console.log(`~~~~~casFit`, casFit.length);
    console.log(`~~~~~gpuFit`, gpuFit.length);
    console.log(`~~~~~ramFit`, ramFit.length);
    console.log(`~~~~~storageFit`, storageFit.length);
    console.log(`~~~~~caseCoolerSpecification`, caseCoolerSpecification.length);
    console.log(`~~~~~caseCoolerSpecification`, monitorSpecification.length);
    const combinations = [];
    if (
      processorsFit.length &&
      cpuCoolerFit.length &&
      casFit.length &&
      gpuFit.length &&
      ramFit.length &&
      storageFit.length &&
      caseCoolerSpecification.length &&
      monitorSpecification.length
    )
      for (const processor of processorsFit) {
        for (const cas of casFit) {
          for (const gpu of gpuFit) {
            for (const ram of ramFit) {
              for (const storage of storageFit) {
                const combination = {
                  pre_build_id: uuidv4(),
                  motherboard_id: curr.product_id || null,
                  processor_id: processor.product_id || null,
                  case_id: cas || null,
                  gpu_id: gpu.gpu_id || null,
                  ram_id: ram || null,
                  storage_id: storage || null,
                };
                combinations.push(combination);
              }
            }
          }
        }
      }
    rs['combinations'] = combinations;
    console.log(combinations.length);
    if (combinations.length > 0) {
      acc.push(rs);
    }
    return acc;
  }, []);
  await pcBuilderDAL.clearPreBuildPC();
  console.log(`INSERTING AUTO GEN `);

  const insertData = [];

  for (const preBuild of preBuildPc) {
    for (const combine of preBuild.combinations) {
      if (combine) {
        combine['user_id'] = userId;
        insertData.push(combine);
      }
    }
  }
  console.log(insertData.length);
  await pcBuilderDAL.insertPreBuildPcBulk(insertData);
  // Await all insertions simultaneously
}
