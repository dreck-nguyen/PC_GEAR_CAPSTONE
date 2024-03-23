import * as productDAL from '../DAL/ProductDAL.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { v4 as uuidv4 } from 'uuid';
export async function getAllProduct() {
  const productsWithDetails = await productDAL.getAllProduct();
  return productsWithDetails;
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
  return await productDAL.getMonitorById(monitorId);
}
export async function getPowerSupplyById(psuId) {
  return await productDAL.getPowerSupplyById(psuId);
}
export async function getCpuCoolerById(cpuCoolerId) {
  return await productDAL.getCpuCoolerById(cpuCoolerId);
}
export async function getCaseCoolerById(caseCoolerId) {
  return await productDAL.getCaseCoolerById(caseCoolerId);
}
//
export async function getProcessorById(processorId) {
  const result = await productDAL.getProcessorById(processorId);
  return result;
}
export async function getMotherboardById(motherBoardId) {
  const result = await productDAL.getMotherboardById(motherBoardId);
  return result;
}
export async function getCaseById(caseId) {
  const result = await productDAL.getCaseById(caseId);
  return result;
}
export async function getGraphicsCardById(gpuId) {
  const result = await productDAL.getGraphicsCardById(gpuId);
  return result;
}

export async function getAutoGenById(autoGenId) {
  const result = await productDAL.getAutoGenById(autoGenId);
  return result;
}

export async function getStorageById(storageId) {
  const result = await productDAL.getStorageById(storageId);
  return result;
}

// TODO
export async function getProcessor(dataObj) {
  let result = await productDAL.getProcessor();
  if (!dataObj.motherboardDetail.chipset) return result;
  else
    result = result.filter(
      (e) => dataObj.motherboardDetail.chipset === e.chipset,
    );
  return result;
}
export async function getMotherboard(dataObj) {
  let result = await productDAL.getMotherboard();
  console.log(result);
  if (!dataObj) return result;
  else
    result = result.filter(
      (e) =>
        dataObj.processorDetails.chipset &&
        dataObj.processorDetails.chipset === e.chipset &&
        dataObj.ramDetails.ram_type &&
        commonFunction.hasFrequency(
          e.memory_supports,
          dataObj.ramDetails.ram_type,
        ),
    );
  return result;
}
export async function getCase(dataObj) {
  let result = await productDAL.getCase();
  if (!dataObj.gpuDetail['length']) return result;
  else
    result = result.filter(
      (e) =>
        commonFunction.extractNumberFromString(e.gpu_length) >=
        Number(dataObj.gpuDetail['length']),
    );
  return result;
}
export async function getGraphicsCard(dataObj) {
  let result = await productDAL.getGraphicsCard();
  if (!dataObj.caseDetails.gpu_length) return result;
  else {
    result = result.filter(
      (e) =>
        commonFunction.extractNumberFromString(
          dataObj.caseDetails.gpu_length,
        ) >= Number(e.length),
    );
  }
  return result;
}
export async function getRam(dataObj) {
  let result = await productDAL.getRam();
  if (!dataObj.motherboardDetail.memory_supports) return result;
  else
    result = result.filter((e) =>
      commonFunction.hasFrequency(
        dataObj.motherboardDetail.memory_supports,
        e.ram_type,
      ),
    );
  console.log(result);
  return result;
}

export async function getStorage(dataObj) {
  let result = await productDAL.getStorage();
  console.log(result);
  if (!dataObj.storageDetail.interface) return result;
  else
    result = result.filter((e) =>
      e.interface.includes(dataObj.storageDetail.interface),
    );
  return result;
}

export async function getAutoGen(dataObj) {
  let result = await productDAL.getAutoGen();
  console.log(dataObj);
  if (dataObj) {
    result = result
      .filter((e) => {
        dataObj.motherboardDetail &&
          dataObj.motherboardDetail.chipset &&
          e.motherboard_specification.chipset ===
            dataObj.motherboardDetail.chipset;
      })
      .filter(
        (e) =>
          dataObj.motherboardDetail &&
          dataObj.motherboardDetail.memory_supports &&
          commonFunction.hasFrequency(
            dataObj.motherboardDetail.memory_supports,
            e.ram_specification.ram_type,
          ),
      )
      .filter(
        (e) =>
          dataObj.caseDetails &&
          dataObj.caseDetails.gpu_length &&
          commonFunction.extractNumberFromString(
            dataObj.caseDetails.gpu_length,
          ) >= Number(e.gpu_specification['length']),
      )
      .filter(
        (e) =>
          dataObj.gpuDetail &&
          dataObj.gpuDetail.length &&
          commonFunction.extractNumberFromString(
            e.case_specification.gpu_length,
          ) >= Number(dataObj.gpuDetail.length),
      )
      .filter(
        (e) =>
          dataObj.processorDetails &&
          dataObj.processorDetails.chipset &&
          e.motherboard_specification.chipset ===
            dataObj.processorDetails.chipset,
      )
      .filter(
        (e) =>
          dataObj.storageDetail &&
          dataObj.storageDetail.interface &&
          e.motherboard_specification.sata.includes(
            dataObj.storageDetail.interface,
          ),
      )
      .filter(
        (e) =>
          dataObj.ramDetails &&
          dataObj.ramDetails.ram_type &&
          commonFunction.hasFrequency(
            e.motherboard_specification.memory_supports,
            dataObj.ramDetails.ram_type,
          ),
      );
  }
  return result;
}
export async function getMobileAutoGen(dataObj) {
  let result = await productDAL.getAutoGen();
  console.log(dataObj);
  if (dataObj) {
    result = result
      .filter((e) => {
        if (dataObj.motherboardDetail && dataObj.motherboardDetail.chipset) {
          return (
            e.motherboard_specification.chipset ===
            dataObj.motherboardDetail.chipset
          );
        }
        return true;
      })
      .filter((e) => {
        if (
          dataObj.motherboardDetail &&
          dataObj.motherboardDetail.memory_supports
        ) {
          return commonFunction.hasFrequency(
            dataObj.motherboardDetail.memory_supports,
            e.ram_specification.ram_type,
          );
        }
        return true;
      })
      .filter((e) => {
        if (dataObj.caseDetails && dataObj.caseDetails.gpu_length) {
          return (
            commonFunction.extractNumberFromString(
              dataObj.caseDetails.gpu_length,
            ) >= Number(e.gpu_specification['length'])
          );
        }
        return true;
      })
      .filter((e) => {
        if (dataObj.gpuDetail && dataObj.gpuDetail.length) {
          return (
            commonFunction.extractNumberFromString(
              e.case_specification.gpu_length,
            ) >= Number(dataObj.gpuDetail.length)
          );
        }
        return true;
      })
      .filter((e) => {
        if (dataObj.processorDetails && dataObj.processorDetails.chipset) {
          return (
            e.motherboard_specification.chipset ===
            dataObj.processorDetails.chipset
          );
        }
        return true;
      })
      .filter((e) => {
        if (dataObj.storageDetail && dataObj.storageDetail.interface) {
          return e.motherboard_specification.sata.includes(
            dataObj.storageDetail.interface,
          );
        }
        return true;
      })
      .filter((e) => {
        if (dataObj.ramDetails && dataObj.ramDetails.ram_type) {
          return commonFunction.hasFrequency(
            e.motherboard_specification.memory_supports,
            dataObj.ramDetails.ram_type,
          );
        }
        return true;
      });
  }
  const randomIndex = Math.floor(Math.random() * (result.length + 1));
  return result[randomIndex];
}
