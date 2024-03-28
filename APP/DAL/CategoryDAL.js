import { Category, SequelizeInstance } from '../utility/DbHelper.js';

export async function getCategoryBreadcrumb() {
  const sqlQuery = `
    select * from category
    where 1 = 1
    and parent_id is not null
    order by category.index ASC`;

  const categories = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return categories;
}

export async function getAllCategory() {
  const sqlQuery = `
    select * from category
    order by category.index ASC`;
  const categories = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return categories;
}

export async function getCategory(categoryId) {
  const sqlQuery = `
    select * from category
    where category_id = '${categoryId}'`;
  const categories = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return categories;
}
export async function deleteCategory(categoryId) {
  const sqlQuery = `
    delete from category
    where categoryId = ${categoryId}`;
  const categories = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return categories;
}

export async function updateCategory(categoryId, category) {
  const result = await Category.update(
    {
      parent_id: category.parent_id,
      name: category.name,
      status: category.status,
      description: category.description,
      image: category.image,
    },
    {
      where: {
        category_id: categoryId,
      },
    },
  );
  console.log(category);
  return result;
}
export async function createCategory(category) {
  const result = await Category.update({
    parent_id: category.parent_id,
    name: category.name,
    status: category.status,
    description: category.description,
    image: category.image,
    category_id: category.category_id,
  });
  console.log(category);
  return result;
}
