import { Category } from '../utility/DbHelper.js';

export async function getAllCategory() {
  const categories = await Category.findAll();
  console.log(categories);
  return categories;
}
