import * as shopDAL from '../DAL/ShopDAL.js';
export async function getAllProduct() {
  const productsWithDetails = await shopDAL.getAllProduct();
  return productsWithDetails;
}
export async function getProductsByCategory(categoryId) {
  const productsWithDetails = await shopDAL.getProductsByCategory(categoryId);
  return productsWithDetails;
}
