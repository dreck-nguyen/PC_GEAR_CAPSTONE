import * as categoryDAL from '../DAL/CategoryDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getAllCategory() {
  const categories = await categoryDAL.getAllCategory();
  return categories;
}

export async function getCategoryBreadcrumb() {
  const categories = await categoryDAL.getCategoryBreadcrumb();
  return categories;
}
export async function createCategory(category) {
  category.category_id = uuidv4();
  const result = await categoryDAL.createCategory(category);
  return result;
}
