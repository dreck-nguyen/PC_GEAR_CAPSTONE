import * as brandDAL from '../DAL/BrandDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getAllBrand() {
  const result = await brandDAL.getAllBrand();
  return result;
}

export async function getBrand(productBrandId) {
  const result = await brandDAL.getBrand(productBrandId);
  return result;
}
export async function createBrand(productBrand) {
  productBrand.product_brand_id = uuidv4();
  const result = await brandDAL.createBrand(productBrand);
  return result;
}

export async function updateBrand(productBrandId, productBrand) {
  const [result] = await brandDAL.updateBrand(productBrandId, productBrand);
  if (!result) {
    throw new Error('Brand not found or not modified');
  }
  return result;
}
export async function deleteBrand(productBrandId) {
  // await brandDAL.deleteBrand(productBrandId);
}
