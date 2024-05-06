import * as productDAL from '../DAL/ProductDAL.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { v4 as uuidv4 } from 'uuid';
export async function getAllProduct() {
  const productsWithDetails = await productDAL.getAllProduct();
  return productsWithDetails;
}
export async function getProductPurpose() {
  const productsWithDetails = await productDAL.getProductPurpose();
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
  // Fetch product details using the provided productId
  let productsWithDetails = await productDAL.getProductById(productId);

  // // Check if the fetched product has a review_list property
  // if (productsWithDetails[0]?.review_list) {
  //   productsWithDetails[0].review_list =
  //     productsWithDetails[0].review_list[0] || [];
  // }

  // Return the modified product details
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
  await deleteAllSpecByProductID(productId);
  return await productDAL.deleteProductByID(productId);
}
export async function deleteProductsByID(productId) {
  return await productDAL.deleteProductsByID(productId);
}
export async function deleteAllSpecByProductID(productId) {
  await productDAL.deleteAllSpecByProductID(productId);
  await productDAL.deleteAllGallery(productId);
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

export async function getMonitorSpecification() {
  const result = await productDAL.getMonitorSpecification();
  return result;
}
export async function getPowerSupplyById(psuId) {
  const [result] = await productDAL.getPowerSupplyById(psuId);
  return result;
}

export async function getPowerSupplySpecification() {
  const result = await productDAL.getPowerSupplySpecification();
  return result;
}
export async function getCpuCoolerById(cpuCoolerId) {
  const [result] = await productDAL.getCpuCoolerById(cpuCoolerId);
  return result;
}

export async function getCpuCoolerSpecification() {
  const result = await productDAL.getCpuCoolerSpecification();
  return result;
}
export async function getCaseCoolerById(caseCoolerId) {
  const [result] = await productDAL.getCaseCoolerById(caseCoolerId);
  return result;
}

export async function getCaseCoolerSpecification() {
  const result = await productDAL.getCaseCoolerSpecification();
  return result;
}
//
export async function getProcessorSpecification() {
  const result = await productDAL.getProcessorSpecification();
  return result;
}
export async function getProcessorById(processorId) {
  const [result] = await productDAL.getProcessorById(processorId);
  return result;
}
export async function getMotherboardSpecification() {
  const result = await productDAL.getMotherboardSpecification();
  return result;
}
export async function getMotherboardById(motherBoardId) {
  const [result] = await productDAL.getMotherboardById(motherBoardId);
  return result;
}
export async function getCaseSpecification() {
  const result = await productDAL.getCaseSpecification();
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
export async function getGraphicsCardSpecification() {
  const result = await productDAL.getGraphicsCardSpecification();
  return result;
}

export async function getRamById(ramId) {
  const [result] = await productDAL.getRamById(ramId);
  return result;
}

export async function getRamSpecification() {
  const result = await productDAL.getRamSpecification();
  return result;
}

export async function getStorageById(storageId) {
  const [result] = await productDAL.getStorageById(storageId);
  return result;
}

export async function getStorageSpecification() {
  const result = await productDAL.getStorageSpecification();
  return result;
}

// TODO
export async function getProcessor(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  const processorBrandId = dataObj?.processor_brand_id || null;
  let result = await productDAL.getProcessor(motherboardId, processorBrandId);
  return result;
}
export async function getMotherboard(dataObj) {
  const storageId = dataObj?.storageDetail?.storage_id || null;
  const ramId = dataObj?.ramDetails?.ram_id || null;
  const caseId = dataObj?.caseDetails?.case_id || null;
  const processorId = dataObj?.processorDetails?.processor_id || null;
  const motherboardBrandId = dataObj?.motherboard_brand_id || null;
  let result = await productDAL.getMotherboard(
    storageId,
    ramId,
    caseId,
    processorId,
    motherboardBrandId,
  );
  return result;
}
export async function getCase(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  const gpuId = dataObj?.motherboardDetail?.gpu_id || null;
  const caseBrandId = dataObj?.case_brand_id || null;
  let result = await productDAL.getCase(motherboardId, gpuId, caseBrandId);
  return result;
}
export async function getGraphicsCard(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  const gpuBrandId = dataObj?.gpu_brand_id || null;

  let result = await productDAL.getGraphicsCard(motherboardId, gpuBrandId);
  return result;
}
export async function getRam(dataObj) {
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;
  const ramBrandId = dataObj?.ram_brand_id || null;

  let result = await productDAL.getRam(motherboardId, ramBrandId);

  return result;
}
export async function getStorage(dataObj) {
  const storageBrandId = dataObj?.storage_brand_id || null;
  const motherboardId = dataObj?.motherboardDetail?.motherboard_id || null;

  let result = await productDAL.getStorage(motherboardId, storageBrandId);
  return result;
}
export async function upsertProcessorSpec(processorId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = processorId;
  await productDAL.upsertProcessorSpec(dataObj);
}
export async function deleteProcessorSpec(processorId) {
  await productDAL.deleteProcessorSpec(processorId);
}

export async function upsertMotherboard(motherboardId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = motherboardId;
  await productDAL.upsertMotherboard(dataObj);
}
export async function deleteMotherboard(id) {
  await productDAL.deleteMotherboard(id);
}

export async function upsertCase(caseId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = caseId;
  await productDAL.upsertCase(dataObj);
}

export async function deleteCase(id) {
  await productDAL.deleteCase(id);
}

export async function upsertGraphicsCard(gpuId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = gpuId;
  await productDAL.upsertGraphicsCard(dataObj);
}

export async function deleteGraphicsCard(id) {
  await productDAL.deleteGraphicsCard(id);
}

export async function upsertRam(ramId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = ramId;
  await productDAL.upsertRam(dataObj);
}
export async function deleteRam(id) {
  await productDAL.deleteRam(id);
}

export async function upsertStorage(storageId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = storageId;
  await productDAL.upsertStorage(dataObj);
}

export async function deleteStorage(id) {
  await productDAL.deleteStorage(id);
}

export async function upsertCaseCooler(caseCoolerId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = caseCoolerId;
  await productDAL.upsertCaseCooler(dataObj);
}

export async function deleteCaseCooler(id) {
  await productDAL.deleteCaseCooler(id);
}

export async function upsertCpuCooler(cpuCoolerId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = cpuCoolerId;
  await productDAL.upsertCpuCooler(dataObj);
}

export async function deleteCpuCooler(id) {
  await productDAL.deleteCpuCooler(id);
}

export async function upsertPsu(psuId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = psuId;
  await productDAL.upsertPsu(dataObj);
}
export async function deletePsu(id) {
  await productDAL.deletePsu(id);
}

export async function upsertMonitor(monitorId, dataObj) {
  dataObj.specification_id = uuidv4();
  dataObj.product_id = monitorId;
  console.log(dataObj);
  await productDAL.upsertMonitor(dataObj);
}

export async function deleteMonitor(id) {
  await productDAL.deleteMonitor(id);
}
