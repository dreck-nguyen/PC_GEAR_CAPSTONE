import express from 'express';
import jwt from 'jsonwebtoken';
import * as shopService from '../Service/ShopService.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
// const secret_key = process.env.SECRET_KEY;
export async function getAllProduct(req, res) {
  try {
    const products = await shopService.getAllProduct();
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

export async function getProductsByCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const products = await shopService.getProductsByCategory(categoryId);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}
