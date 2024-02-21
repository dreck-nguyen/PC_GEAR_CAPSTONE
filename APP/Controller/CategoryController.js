import express from 'express';
import * as categoryService from '../Service/CategoryService.js';
import dotenv from 'dotenv';
import { SequelizeInstance } from '../utility/DbHelper.js';
dotenv.config();

const router = express.Router();
// const secret_key = process.env.SECRET_KEY;

export async function getCategoryBreadcrumb(req, res) {
  try {
    const categories = await categoryService.getCategoryBreadcrumb();
    res.send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getAllCategory(req, res) {
  try {
    const categories = await categoryService.getAllCategory();
    res.send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function createCategory(req, res) {
  const t = await SequelizeInstance.transaction();
  try {
    const category = req.body;
    const result = await categoryService.createCategory(category);
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}
