import * as productDAL from '../DAL/ProductDAL.js';
export async function getAllProduct() {
  const productsWithDetails = await productDAL.getAllProduct();
  console.log(productsWithDetails);
  return productsWithDetails;
}
export async function getProductsByCategory(categoryId) {
  const productsWithDetails = await productDAL.getProductsByCategory(
    categoryId,
  );
  return productsWithDetails;
}
