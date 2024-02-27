import express from 'express';
import * as productService from '../Service/ProductService.js';
import dotenv from 'dotenv';
import { SequelizeInstance } from '../utility/DbHelper.js';
dotenv.config();

// const router = express.Router();
// const secret_key = process.env.SECRET_KEY;
export async function getAllProduct(req, res, next) {
  try {
    const products = await productService.getAllProduct();
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
export async function createProduct(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
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
