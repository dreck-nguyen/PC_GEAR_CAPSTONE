import * as brandService from '../Service/BrandService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';

export async function getAllBrand(req, res, next) {
  try {
    const result = await brandService.getAllBrand();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getBrand(req, res, next) {
  try {
    const productBrandId = req.params.productBrandId;
    const result = await brandService.getBrand(productBrandId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createBrand(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const productBrand = req.body;
    const result = await brandService.createBrand(productBrand);
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function updateBrand(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const productBrandId = req.params.productBrandId;
    const productBrand = req.body;
    await brandService.updateBrand(productBrandId, productBrand);
    await t.commit();
    res.status(200).send({ message: 'UPDATE BRAND SUCCESS' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function deleteBrand(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const productBrandId = req.params.productBrandId;
    await brandService.deleteBrand(productBrandId);
    await t.commit();
    res.status(200).send({ message: 'DELETE BRAND SUCCESS' });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
