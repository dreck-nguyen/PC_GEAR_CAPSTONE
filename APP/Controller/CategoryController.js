import express from 'express';
import * as categoryService from '../Service/CategoryService.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
// const secret_key = process.env.SECRET_KEY;
export async function getAllCategory(req, res) {
  try {
    const categories = await categoryService.getAllCategory();
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}
