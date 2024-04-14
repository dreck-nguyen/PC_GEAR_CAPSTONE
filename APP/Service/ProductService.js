import * as productDAL from '../DAL/ProductDAL.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { v4 as uuidv4 } from 'uuid';
export async function getAllProduct() {
  const productsWithDetails = await productDAL.getAllProduct();
  return productsWithDetails;
}
export async function getProductByName(productName) {
  const productsWithDetails = await productDAL.getProductByName(productName);
  return productsWithDetails;
}
export async function getPaginateProduct(limit, offset) {
  const countProduct = await productDAL.countProduct();
  const productsWithDetails = await productDAL.getPaginateProduct(
    limit,
    offset * limit,
  );
  return { countProduct, productsWithDetails };
}
export async function getProductById(productId) {
  const productsWithDetails = await productDAL.getProductById(productId);
  return productsWithDetails;
}
export async function getProductsByCategory(categoryId) {
  const productsWithDetails = await productDAL.getProductsByCategory(
    categoryId,
  );
  return productsWithDetails;
}
export async function updateProductById(productId, product) {
  const result = await productDAL.updateProductById(productId, product);
  return result;
}
export async function createProduct(product) {
  product.product_id = uuidv4();
  const result = await productDAL.createProduct(product);
  await createProductImage(product.product_id, product.image_link);
  return result;
}
export async function createProductImage(productId, path) {
  const product_gallery_id = uuidv4();
  const result = await productDAL.createProductImage(
    product_gallery_id,
    productId,
    path,
  );
  return result;
}
export async function deleteProductByID(productId) {
  return await productDAL.deleteProductByID(productId);
}
export async function deleteProductsByID(productId) {
  return await productDAL.deleteProductsByID(productId);
}
export async function getMonitor() {
  return await productDAL.getMonitor();
}
export async function getPowerSupply() {
  return await productDAL.getPowerSupply();
}
export async function getCpuCooler() {
  return await productDAL.getCpuCooler();
}
export async function getCaseCooler() {
  return await productDAL.getCaseCooler();
}
//
export async function getMonitorById(monitorId) {
  const [result] = await productDAL.getMonitorById(monitorId);
  return result;
}
export async function getPowerSupplyById(psuId) {
  const [result] = await productDAL.getPowerSupplyById(psuId);
  return result;
}
export async function getCpuCoolerById(cpuCoolerId) {
  const [result] = await productDAL.getCpuCoolerById(cpuCoolerId);
  return result;
}
export async function getCaseCoolerById(caseCoolerId) {
  const [result] = await productDAL.getCaseCoolerById(caseCoolerId);
  return result;
}
//
export async function getProcessorById(processorId) {
  const [result] = await productDAL.getProcessorById(processorId);
  return result;
}
export async function getMotherboardById(motherBoardId) {
  const [result] = await productDAL.getMotherboardById(motherBoardId);
  return result;
}
export async function getCaseById(caseId) {
  const [result] = await productDAL.getCaseById(caseId);
  return result;
}
export async function getGraphicsCardById(gpuId) {
  const [result] = await productDAL.getGraphicsCardById(gpuId);
  return result;
}

export async function getRamById(ramId) {
  const [result] = await productDAL.getRamById(ramId);
  return result;
}

export async function getAutoGenById(autoGenId) {
  const [result] = await productDAL.getAutoGenById(autoGenId);
  return result;
}

export async function getStorageById(storageId) {
  const [result] = await productDAL.getStorageById(storageId);
  return result;
}

// TODO
export async function getProcessor(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  let result = await productDAL.getProcessor(motherboardId);
  return result;
}
export async function getMotherboard(dataObj) {
  const storageId = dataObj?.storageDetail?.storage_id || null;
  const ramId = dataObj?.ramDetails?.ram_id || null;
  const caseId = dataObj?.caseDetails?.case_id || null;
  const processorId = dataObj?.processorDetails?.processor_id || null;
  console.log(storageId, ramId, caseId, processorId);
  let result = await productDAL.getMotherboard(
    storageId,
    ramId,
    caseId,
    processorId,
  );
  return result;
}
export async function getCase(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  const gpuId = dataObj?.motherboardDetail?.gpu_id || null;
  let result = await productDAL.getCase(motherboardId, gpuId);
  return result;
}
export async function getGraphicsCard(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  let result = await productDAL.getGraphicsCard(motherboardId);
  return result;
}
export async function getRam(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  let result = await productDAL.getRam(motherboardId);

  console.log(result);
  return result;
}
export async function getStorage(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;

  let result = await productDAL.getStorage(motherboardId);
  return result;
}
export async function getAutoGen(dataObj) {
  let result = await productDAL.getAutoGen();

  if (dataObj?.motherboardDetail) {
    result = result.filter(
      (e) =>
        e.motherboard_specification.chipset ===
        dataObj.motherboardDetail.chipset,
    );
    console.log(1, result.length);
  }

  if (dataObj?.motherboardDetail && dataObj.motherboardDetail.memory_supports) {
    result = result.filter((e) =>
      commonFunction.hasFrequency(
        dataObj.motherboardDetail.memory_supports,
        e.ram_specification.ram_type,
      ),
    );
    console.log(2, result.length);
  }

  if (dataObj?.caseDetails && dataObj.caseDetails.gpu_length) {
    const minLength = commonFunction.extractNumberFromString(
      dataObj.caseDetails.gpu_length,
    );
    result = result.filter(
      (e) => Number(e.gpu_specification.length) >= minLength,
    );
    console.log(3, result.length);
  }

  if (dataObj?.gpuDetail && dataObj.gpuDetail.length) {
    const minLength = commonFunction.extractNumberFromString(
      dataObj.gpuDetail.length,
    );
    result = result.filter(
      (e) => Number(e.case_specification.gpu_length) >= minLength,
    );
    console.log(4, result.length);
  }

  if (dataObj?.processorDetails) {
    result = result.filter(
      (e) =>
        e.motherboard_specification.chipset ===
        dataObj.processorDetails.chipset,
    );
    console.log(5, result.length);
  }

  if (dataObj?.storageDetail && dataObj.storageDetail.interface) {
    result = result.filter((e) =>
      e.motherboard_specification.sata.includes(
        dataObj.storageDetail.interface,
      ),
    );
    console.log(6, result.length);
  }

  if (dataObj?.ramDetails && dataObj.ramDetails.ram_type) {
    result = result.filter((e) =>
      commonFunction.hasFrequency(
        e.motherboard_specification.memory_supports,
        dataObj.ramDetails.ram_type,
      ),
    );
    console.log(7, result.length);
  }

  return result;
}
export async function getRandomOne(dataObj) {
  const priceRange = dataObj?.price_range || 0;
  const purpose = commonFunction.checkPurpose(dataObj?.purpose || '');
  let result = await productDAL.getAutoGen(priceRange);
  if (dataObj) {
    result = result.filter((e) => {
      const motherboardDetail = dataObj.motherboardDetail;
      const caseDetails = dataObj.caseDetails;
      const gpuDetail = dataObj.gpuDetail;
      const processorDetails = dataObj.processorDetails;
      const storageDetail = dataObj.storageDetail;
      const ramDetails = dataObj.ramDetails;

      // Filter conditions for motherboard chipset
      if (
        motherboardDetail &&
        motherboardDetail.chipset &&
        e.motherboard_specification.chipset !== motherboardDetail.chipset
      ) {
        return false;
      }

      // Filter conditions for motherboard memory support
      if (
        motherboardDetail &&
        motherboardDetail.memory_supports &&
        !commonFunction.hasFrequency(
          motherboardDetail.memory_supports,
          e.ram_specification.ram_type,
        )
      ) {
        return false;
      }

      // Filter conditions for case GPU length
      if (
        caseDetails &&
        caseDetails.gpu_length &&
        commonFunction.extractNumberFromString(caseDetails.gpu_length) <
          Number(e.gpu_specification.length)
      ) {
        return false;
      }

      // Filter conditions for GPU length
      if (
        gpuDetail &&
        gpuDetail.length &&
        commonFunction.extractNumberFromString(
          e.case_specification.gpu_length,
        ) < Number(gpuDetail.length)
      ) {
        return false;
      }

      // Filter conditions for processor chipset
      if (
        processorDetails &&
        processorDetails.chipset &&
        e.motherboard_specification.chipset !== processorDetails.chipset
      ) {
        return false;
      }

      // Filter conditions for storage interface
      if (
        storageDetail &&
        storageDetail.interface &&
        !e.motherboard_specification.sata.includes(storageDetail.interface)
      ) {
        return false;
      }

      // Filter conditions for RAM type
      if (
        ramDetails &&
        ramDetails.ram_type &&
        !commonFunction.hasFrequency(
          e.motherboard_specification.memory_supports,
          ramDetails.ram_type,
        )
      ) {
        return false;
      }

      return true;
    });
  }
  if (purpose !== null) {
    result = result.filter((e) => {
      const storage = commonFunction.filterByPurposeForStorageForObject(
        e.storage_specification,
        dataObj.purpose,
      );
      const ram = commonFunction.filterByPurposeForRAMForObject(
        e.ram_specification,
        dataObj.purpose,
      );
      const graphicCard = commonFunction.filterByPurposeForGPUForObject(
        e.gpu_specification,
        dataObj.purpose,
      );
      const processor = commonFunction.filterByPurposeForObject(
        e.processor_specification,
        dataObj.purpose,
      );
      console.log(`${storage} ,${ram}, ${graphicCard} , ${processor}`);
      return storage && ram && graphicCard && processor;
    });
  }

  const randomIndex = Math.floor(Math.random() * result.length);
  return result[randomIndex];
}
export async function upsertProcessorSpec(processorId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = processorId;
  await productDAL.upsertProcessorSpec(dataObj);
}

export async function upsertMotherboard(motherboardId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = motherboardId;
  await productDAL.upsertMotherboard(dataObj);
}

export async function upsertCase(caseId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = caseId;
  await productDAL.upsertCase(dataObj);
}

export async function upsertGraphicsCard(gpuId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = gpuId;
  await productDAL.upsertGraphicsCard(dataObj);
}

export async function upsertRam(ramId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = ramId;
  await productDAL.upsertRam(dataObj);
}

export async function upsertStorage(storageId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = storageId;
  await productDAL.upsertStorage(dataObj);
}
export async function upsertCaseCooler(caseCoolerId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = caseCoolerId;
  await productDAL.upsertCaseCooler(dataObj);
}

export async function upsertCpuCooler(cpuCoolerId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = cpuCoolerId;
  await productDAL.upsertCpuCooler(dataObj);
}

export async function upsertPsu(psuId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = psuId;
  await productDAL.upsertPsu(dataObj);
}

export async function upsertMonitor(monitorId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = monitorId;
  await productDAL.upsertMonitor(dataObj);
}
