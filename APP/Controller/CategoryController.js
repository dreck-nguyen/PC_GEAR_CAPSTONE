import express from 'express';
import * as categoryService from '../Service/CategoryService.js';
import dotenv from 'dotenv';
import { SequelizeInstance } from '../utility/DbHelper.js';
dotenv.config();

const router = express.Router();

export async function getCategoryBreadcrumb(req, res, next) {
  try {
    const categories = await categoryService.getCategoryBreadcrumb();
    console.log(categories);
    res.send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getAllCategory(req, res, next) {
  try {
    const categories = await categoryService.getAllCategory();
    res.send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getCategory(req, res, next) {
  try {
    const categoryId = req.params.categoryId;
    const categories = await categoryService.getCategory(categoryId);
    res.send(categories);
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function deleteCategory(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const categoryId = req.params.categoryId;
    const categories = await categoryService.deleteCategory(categoryId);
    await t.commit();
    res.send(categories);
  } catch (error) {
    await t.rollback();
    res.status(404).send(error);
  }
}

export async function createCategory(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const category = req.body;
    const result = await categoryService.createCategory(category);
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}

export async function updateCategory(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const categoryId = req.params.categoryId;

    const category = req.body;
    const result = await categoryService.updateCategory(categoryId, category);
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(404).send(error);
  }
}
