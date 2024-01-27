import * as categoryDAL from '../DAL/CategoryDAL.js';
export async function getAllCategory() {
  const categories = await categoryDAL.getAllCategory();
  return categories;
}
