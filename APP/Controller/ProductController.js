import express from 'express';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as productService from '../Service/ProductService.js';
import dotenv from 'dotenv';
import { SequelizeInstance } from '../utility/DbHelper.js';

dotenv.config();

export async function getProductPurpose(req, res, next) {
  try {
    const products = await productService.getProductPurpose();
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}
export async function getAllProduct(req, res, next) {
  try {
    const products = await productService.getAllProduct();
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}
export async function getCommonRule(req, res, next) {
  try {
    const result = commonEnums.COMMON.RULE;
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
}
export async function getProductByName(req, res, next) {
  try {
    const productName = req.query.productName;
    const products = await productService.getProductByName(productName);
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}
export async function getPaginateProduct(req, res, next) {
  try {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const products = await productService.getPaginateProduct(limit, offset);
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}
export async function getProductById(req, res, next) {
  try {
    const productId = req.params.productId;
    const products = await productService.getProductById(productId);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function getProductsByCategory(req, res, next) {
  try {
    const categoryId = req.params.categoryId;
    const products = await productService.getProductsByCategory(categoryId);
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}
export async function updateProductById(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    const productId = req.params.productId;
    const product = req.body;
    const result = await productService.updateProductById(productId, product);
    await await t.commit();
    res.status(200).send(result);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}

export async function createProduct(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );

    const product = req.body;
    const result = await productService.createProduct(product);
    await await t.commit();
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
    await t.rollback();
  }
}
export async function createProductImage(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    const images = req.file;
    const productId = req.params.productId;
    await productService.createProductImage(productId, images.path);
    const result = await productService.getProductById(productId);
    if (!result) throw new Error('NO PRODUCT FOUND');
    await await t.commit();
    res.status(200).send(result);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}
export async function deleteProductById(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    const productId = req.params.productId;
    await productService.deleteProductByID(productId);
    await await t.commit();
    res.status(200).send({ message: 'PRODUCT DELETE SUCCESS' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}
export async function deleteProductsById(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    const productIds = req.body.productIds;
    await productService.deleteProductsByID(productIds);
    await await t.commit();
    res.status(200).send({ message: 'PRODUCTS DELETE SUCCESS' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}

export async function getProcessor(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getProcessor(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getProcessorSpecification(req, res, next) {
  try {
    const result = await productService.getProcessorSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getProcessorById(req, res, next) {
  try {
    const processorId = req.params.processor_id;
    const result = await productService.getProcessorById(processorId);
    res
      .status(200)
      .send(
        result ? result : { message: `NO PROCESSOR FOUND ON ${processorId}` },
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMotherboardSpecification(req, res, next) {
  try {
    const result = await productService.getMotherboardSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMotherboardById(req, res, next) {
  try {
    const motherBoardId = req.params.motherboard_id;
    const result = await productService.getMotherboardById(motherBoardId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCaseSpecification(req, res, next) {
  try {
    const result = await productService.getCaseSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCaseById(req, res, next) {
  try {
    const caseId = req.params.case_id;
    const result = await productService.getCaseById(caseId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getGraphicsCardSpecification(req, res, next) {
  try {
    const result = await productService.getGraphicsCardSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getGraphicsCardById(req, res, next) {
  try {
    const gpuId = req.params.gpu_id;
    const result = await productService.getGraphicsCardById(gpuId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getRamById(req, res, next) {
  try {
    const ramId = req.params.ram_id;
    const result = await productService.getRamById(ramId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getRamSpecification(req, res, next) {
  try {
    const result = await productService.getRamSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getStorageSpecification(req, res, next) {
  try {
    const result = await productService.getStorageSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getStorageById(req, res, next) {
  try {
    const storageId = req.params.storage_id;
    const result = await productService.getStorageById(storageId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCaseCoolerById(req, res, next) {
  try {
    const caseCoolerId = req.params.case_cooler_id;
    const result = await productService.getCaseCoolerById(caseCoolerId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCaseCoolerSpecification(req, res, next) {
  try {
    const result = await productService.getCaseCoolerSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCpuCoolerById(req, res, next) {
  try {
    const cpuCoolerId = req.params.cpu_cooler_id;
    const result = await productService.getCpuCoolerById(cpuCoolerId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCpuCoolerSpecification(req, res, next) {
  try {
    const result = await productService.getCpuCoolerSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getPowerSupplyById(req, res, next) {
  try {
    const psuId = req.params.psu_id;
    const result = await productService.getPowerSupplyById(psuId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getPowerSupplySpecification(req, res, next) {
  try {
    const result = await productService.getPowerSupplySpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMonitorById(req, res, next) {
  try {
    const monitorId = req.params.monitor_id;
    const result = await productService.getMonitorById(monitorId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMonitorSpecification(req, res, next) {
  try {
    const result = await productService.getMonitorSpecification();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMotherboard(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getMotherboard(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getCase(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getCase(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getGraphicsCard(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getGraphicsCard(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getRam(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getRam(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getStorage(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getStorage(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getCaseCooler(req, res, next) {
  try {
    const result = await productService.getCaseCooler();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getCpuCooler(req, res, next) {
  try {
    const result = await productService.getCpuCooler();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getPowerSupply(req, res, next) {
  try {
    const result = await productService.getPowerSupply();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMonitor(req, res, next) {
  try {
    const result = await productService.getMonitor();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getRandomOne(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getRandomOne(dataObj);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function upsertProcessorSpec(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorId = req.params.processor_id;
    const dataObj = req.body;
    await productService.upsertProcessorSpec(processorId, dataObj);
    const result = await productService.getProcessorById(processorId);
    res.status(200).send(result);
    await await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function deleteProcessorSpec(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorId = req.params.processor_id;
    await productService.deleteProcessorSpec(processorId);
    res
      .status(200)
      .send({ mesage: `DELETE PRODUCT SPECIFICATION WITH ${processorId}` });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    await t.rollback();
  }
}

export async function upsertMotherboard(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const motherboardId = req.params.motherboard_id;
    const dataObj = req.body;
    await productService.upsertMotherboard(motherboardId, dataObj);
    const result = await productService.getMotherboardById(motherboardId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteMotherboard(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const motherboardId = req.params.motherboard_id;
    await productService.deleteMotherboard(motherboardId);
    res.status(200).send({
      message: `DELETE MOTHERBOARD SPECIFICATION WITH ${motherboardId}`,
    });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function upsertCase(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const caseId = req.params.case_id;
    const dataObj = req.body;
    await productService.upsertCase(caseId, dataObj);
    const result = await productService.getCaseById(caseId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteCase(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const caseId = req.params.case_id;
    await productService.deleteCase(caseId);
    res
      .status(200)
      .send({ message: `DELETE CASE SPECIFICATION WITH ID ${caseId}` });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function upsertGraphicsCard(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const gpuId = req.params.gpu_id;
    const dataObj = req.body;
    await productService.upsertGraphicsCard(gpuId, dataObj);
    const result = await productService.getGraphicsCardById(gpuId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteGraphicsCard(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const gpuId = req.params.gpu_id;
    await productService.deleteGraphicsCard(gpuId);
    res
      .status(200)
      .send({ mesage: `DELETE GPU SPECIFICATION WITH ID ${gpuId}` });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function upsertRam(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const ramId = req.params.ram_id;
    const dataObj = req.body;
    await productService.upsertRam(ramId, dataObj);
    const result = await productService.getRamById(ramId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteRam(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const ramId = req.params.ram_id;
    await productService.deleteRam(ramId);
    res
      .status(200)
      .send({ message: `DELETE RAM SPECIFICATION WITH ID ${ramId}` });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function upsertStorage(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const storageId = req.params.storage_id;
    const dataObj = req.body;
    await productService.upsertStorage(storageId, dataObj);
    const result = await productService.getStorageById(storageId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteStorage(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const storageId = req.params.storage_id;
    await productService.deleteStorage(storageId);
    res
      .status(200)
      .send({ message: `DELETE STORAGE SPECIFICATION WITH ID ${storageId}` });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function upsertCaseCooler(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const caseCoolerId = req.params.case_cooler_id;
    const dataObj = req.body;
    await productService.upsertCaseCooler(caseCoolerId, dataObj);
    const result = await productService.getCaseCoolerById(caseCoolerId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function deleteCaseCooler(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const caseCoolerId = req.params.case_cooler_id;
    await productService.deleteCaseCooler(caseCoolerId);
    res.status(200).send({
      message: `DELETE CASE COOLER SPECIFICATION WITH ID ${caseCoolerId}`,
    });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function upsertCpuCooler(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const cpuCoolerId = req.params.cpu_cooler_id;
    const dataObj = req.body;
    await productService.upsertCpuCooler(cpuCoolerId, dataObj);
    const result = await productService.getCpuCoolerById(cpuCoolerId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteCpuCooler(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const cpuCoolerId = req.params.cpu_cooler_id;
    await productService.deleteCpuCooler(cpuCoolerId);
    res.status(200).send({
      message: `DELETE CPU COOLER SPECIFICATION WITH ID ${cpuCoolerId}`,
    });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function upsertPsu(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const psuId = req.params.psu_id;
    const dataObj = req.body;
    await productService.upsertPsu(psuId, dataObj);
    const result = await productService.getPowerSupplyById(psuId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deletePsu(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const psuId = req.params.psu_id;
    await productService.deletePsu(psuId);
    res.status(200).send({
      message: `DELETE PSU SPECIFICATION WITH ID ${psuId}`,
    });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function upsertMonitor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const monitorId = req.params.monitor_id;
    const dataObj = req.body;
    await productService.upsertMonitor(monitorId, dataObj);
    const result = await productService.getMonitorById(monitorId);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteMonitor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const monitorId = req.params.monitor_id;
    await productService.deleteMonitor(monitorId);
    res
      .status(200)
      .send({ message: `DELETE MONITOR SPECIFICATION WITH ID ${monitorId}` });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
