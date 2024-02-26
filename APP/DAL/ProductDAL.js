import { Product, SequelizeInstance } from '../utility/DbHelper.js';

export async function getAllProduct() {
  const sqlQuery = `
  SELECT 
  p.product_id,
  p."name",
  p.description,
  p.unit_price,
  p.discount,
  p.sold,
  c."name" AS category_name,
  pb.product_brand_name AS brand_name,
  ARRAY_AGG(pg.image) AS image_links,
  ps.technical_specification
FROM 
  product p
LEFT OUTER JOIN category c ON c.category_id = p.category_id
LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
LEFT OUTER JOIN product_specification ps ON ps.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ps.product_id;

  `;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}
export async function getProductsByCategory(categoryId) {
  const sqlQuery = `
  SELECT 
  p.product_id,
  p."name",
  p.description,
  p.unit_price,
  p.discount,
  p.sold,
  c."name" AS category_name,
  pb.product_brand_name AS brand_name,
  ARRAY_AGG(pg.image) AS image_links,
  ps.technical_specification
FROM 
  product p
LEFT OUTER JOIN 
  category c
ON 
  c.category_id = p.category_id 
  AND c.category_id = '${categoryId}'
LEFT OUTER JOIN 
  product_brand pb 
ON pb.product_brand_id = p.product_brand_id
LEFT OUTER JOIN 
  product_gallery pg 
ON pg.product_id = p.product_id
LEFT OUTER JOIN 
  product_specification ps 
ON ps.product_id = p.product_id
GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ps.product_id;
  `;

  const productsWithDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return productsWithDetails;
}
export async function createProduct(product) {
  const result = await Product.create({
    product_id: product.product_id,
    category_id: product.category_id,
    name: product.name,
    description: product.description,
    unit_price: product.unit_price,
    discount: product.discount,
    quantity: product.quantity,
    sold: product.sold,
    product_brand_id: product.product_brand_id,
  });
  return result;
}
