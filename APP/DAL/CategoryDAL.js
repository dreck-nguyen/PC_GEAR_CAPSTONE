import { Category, SequelizeInstance } from '../utility/DbHelper.js';

export async function getCategoryBreadcrumb() {
  const sqlQuery = `
    select
	c.*,
	ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'product_brand_id',
	tmp.product_brand_id,
	'product_brand_name',
	tmp.product_brand_name
     )
  ) as brand_list
from
	category c
inner join (
	select
		distinct(product_brand_id)
   ,
		product_brand_name
   ,
		category_id
	from
		(
		select
			pb.product_brand_id,
			pb.product_brand_name,
			p.product_id,
			p.category_id,
			COUNT(distinct ms.product_id) as motherboard_count,
			COUNT(distinct rs.product_id) as ram_count,
			COUNT(distinct cs.product_id) as cooler_count,
			COUNT(distinct ms2.product_id) as monitor_count,
			COUNT(distinct ss.product_id) as storage_count,
			COUNT(distinct ccs.product_id) as case_cooler_count,
			COUNT(distinct cs2.product_id) as case_count,
			COUNT(distinct gs.product_id) as graphics_count,
			COUNT(distinct ps.product_id) as processor_count,
			COUNT(distinct pss.product_id) as power_supply_count
		from
			product_brand pb
		inner join 
    product p on
			p.product_brand_id = pb.product_brand_id
		left join 
    motherboard_specification ms on
			p.product_id = ms.product_id
		left join 
    ram_specification rs on
			p.product_id = rs.product_id
		left join 
    cooler_specification cs on
			p.product_id = cs.product_id
		left join 
    monitor_specification ms2 on
			p.product_id = ms2.product_id
		left join 
    storage_specification ss on
			p.product_id = ss.product_id
		left join 
    case_cooler_specification ccs on
			p.product_id = ccs.product_id
		left join 
    case_specification cs2 on
			p.product_id = cs2.product_id
		left join 
    graphics_specification gs on
			p.product_id = gs.product_id
		left join 
    processor_specification ps on
			p.product_id = ps.product_id
		left join 
    power_supply_specification pss on
			p.product_id = pss.product_id
		group by
			pb.product_brand_id,
			pb.product_brand_name,
			p.product_id,
			p.category_id
		order by
			pb.product_brand_name
    ) subtotal
	where
		1 = 1
) tmp ON
	c.category_id = tmp.category_id
WHERE
	c.parent_id IS NOT NULL
GROUP BY
	c.category_id
ORDER BY
	c.index ASC`;

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
