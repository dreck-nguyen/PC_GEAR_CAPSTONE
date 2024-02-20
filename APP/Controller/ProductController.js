import express from 'express';
import * as productService from '../Service/ProductService.js';
import dotenv from 'dotenv';
dotenv.config();

// const router = express.Router();
// const secret_key = process.env.SECRET_KEY;
export async function getAllProduct(req, res) {
  try {
    const products = await productService.getAllProduct();
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getProductsByCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const products = await productService.getProductsByCategory(categoryId);
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
}
