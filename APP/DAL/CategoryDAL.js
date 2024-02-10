import { Category, SequelizeInstance } from '../utility/DbHelper.js';

export async function getCategoryBreadcrumb() {
  const sqlQuery = `
    select * from category
      inner join 
      (select category_id
         from category 
         where parent_id is null) c
    on category.parent_id = c.category_id`;

  const categories = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return categories;
}

export async function getAllCategory() {
  const sqlQuery = `
    select * from category`;
  const categories = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return categories;
}
