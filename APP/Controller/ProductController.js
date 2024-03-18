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
    if (commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(
        `YOUR ROLE MUST HIGHER THAN ${commonEnums.USER_ROLE.USER}`,
      );
    const productId = req.params.productId;
    const product = req.body;
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
    if (commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(
        `YOUR ROLE MUST HIGHER THAN ${commonEnums.USER_ROLE.USER}`,
      );
    const product = req.body;
    const result = await productService.createProduct(product);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}
export async function createProductImage(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
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
    if (commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(
        `YOUR ROLE MUST HIGHER THAN ${commonEnums.USER_ROLE.USER}`,
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
    if (commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(
        `YOUR ROLE MUST HIGHER THAN ${commonEnums.USER_ROLE.USER}`,
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
export async function getMotherboard(req, res, next) {
  try {
    const dataObj = req.body || null;
    const result = await productService.getProcessor(dataObj);
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
