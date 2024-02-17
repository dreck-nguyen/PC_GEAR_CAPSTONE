import { SequelizeInstance } from '../utility/DbHelper.js';

export async function getAllProduct() {
  const sqlQuery = `
    select 
  p.product_id
   , p."name" 
   , p.description 
   , p.unit_price 
   , p.discount 
   , p.sold 
   ,c."name"  as category_name
   , pb.product_brand_name as brand_name
   , STRING_AGG(pg.image, ',') AS image_links
   , ps.technical_specification 
   from product p
left outer join category c 
on c.category_id  = p.category_id 
left outer join product_brand pb 
on pb.product_brand_id  = p.product_brand_id 
left outer join product_gallery pg
on pg.product_id = p.product_id 
left outer join product_specification ps 
on ps.product_id  = p.product_id 
group by p.product_id , c.category_id , pb.product_brand_id , pg.product_gallery_id , ps.product_id 
  `;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}
export async function getProductsByCategory(categoryId) {
  const sqlQuery = `
    select 
  p.product_id
   , p."name" 
   , p.description 
   , p.unit_price 
   , p.discount 
   , p.sold 
   , c."name"  as category_name
   , pb.product_brand_name as brand_name
   , STRING_AGG(pg.image, ',') AS image_links
   , ps.technical_specification 
   from product p
inner join category c 
on c.category_id  = p.category_id 
and c.category_id = '${categoryId}'
left outer join product_brand pb 
on pb.product_brand_id  = p.product_brand_id 
left outer join product_gallery pg
on pg.product_id = p.product_id 
left outer join product_specification ps 
on ps.product_id  = p.product_id 
group by p.product_id , c.category_id , pb.product_brand_id , pg.product_gallery_id , ps.product_id 
  `;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}
