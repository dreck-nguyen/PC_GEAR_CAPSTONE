import * as shopDAL from '../DAL/ShopDAL.js';
export async function getAllProduct() {
  const productsWithDetails = await shopDAL.getAllProduct();
  return productsWithDetails;
}
