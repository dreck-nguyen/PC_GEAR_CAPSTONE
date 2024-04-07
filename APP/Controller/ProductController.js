import express from 'express';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as productService from '../Service/ProductService.js';
import dotenv from 'dotenv';
import { SequelizeInstance } from '../utility/DbHelper.js';

dotenv.config();

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
    console.log(product);
    const result = await productService.updateProductById(productId, product);
    res.status(200).send(result);
    await t.commit();
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
    console.log(product);
    const result = await productService.createProduct(product);
    res.status(201).send(result);
    await t.commit();
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
    console.log(loginUser);
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    const images = req.file;
    console.log(images);
    const productId = req.params.productId;
    await productService.createProductImage(productId, images.path);
    const result = await productService.getProductById(productId);
    if (!result) throw new Error('NO PRODUCT FOUND');
    res.status(200).send(result);
    await t.commit();
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
    res.status(200).send({ message: 'PRODUCT DELETE SUCCESS' });
    await t.commit();
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
    res.status(200).send({ message: 'PRODUCTS DELETE SUCCESS' });
    await t.commit();
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

export async function getProcessorById(req, res, next) {
  try {
    const processorId = req.params.processor_id;
    const result = await productService.getProcessorById(processorId);
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

export async function getAutoGenById(req, res, next) {
  try {
    const autoGenId = req.params.auto_gen_id;
    const result = await productService.getAutoGenById(autoGenId);
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

export async function getAutoGen(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getAutoGen(dataObj);
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
    t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
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
    t.commit();
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
    t.commit();
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
    t.commit();
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
    t.commit();
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
    t.commit();
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
    t.commit();
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
    t.commit();
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
    t.commit();
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
    t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
