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
// TODO
export async function getProcessor(dataObj) {
  let result = await productDAL.getProcessor();
  if (!dataObj.motherBoardDetails.chipset) return result;
  else
    result = result.filter(
      (e) => dataObj.motherBoardDetails?.chipset === e.chipset,
    );
  return result;
}
export async function getMotherboard(dataObj) {
  let result = await productDAL.getMotherboard();
  if (!dataObj) return result;
  else
    result = result.filter((e) => {
      if (
        dataObj.processorDetails?.chipset &&
        dataObj.processorDetails.chipset !== e.chipset
      )
        return false;

      if (
        dataObj.ramDetails?.ram_type &&
        !e.memory_supports
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
          })
          .includes(dataObj.ramDetails.ram_type)
      )
        return false;

      return true;
    });
  return result;
}
export async function getCase(dataObj) {
  let result = await productDAL.getCase();
  if (!dataObj.gpu.length) return result;
  else
    result = result.filter(
      (e) =>
        e.cabinet_type === 'ATX Mid Tower' ||
        e.cabinet_type === 'E-ATX' ||
        commonFunction.extractNumberFromString(e.gpu_length) >=
          Number(dataObj.gpu.length),
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
    result = result.filter((e) => {
      !dataObj.motherboardDetail.memory_supports
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
        })
        .includes(e.ram_type);
    });
  return result;
}
export async function getStorage(dataObj) {
  let result = await productDAL.getStorage();
  if (!dataObj) return result;
  else
    result = result.filter(
      (e) =>
        commonFunction.extractNumberFromString(
          dataObj.storageDetail.gpu_length,
        ) >= Number(e.length),
    );
  return result;
}
