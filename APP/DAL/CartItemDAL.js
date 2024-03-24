import { CartItem, SequelizeInstance } from '../utility/DbHelper.js';

export async function createCartItem(product) {
  await CartItem.create({
    cart_item_id: product.cart_item_id,
    cart_id: product.cart_id,
    product_id: product.product_id,
    quantity: product.quantity,
  });
}

export async function getCartItem(cartItemId) {
  const sqlQuery = `
  select * from cart c 
  inner join cart_item ci on c.cart_id = ci.cart_id 
  inner join product p on ci.product_id  = p.product_id 
  where ci.cart_item_id = '${cartItemId}'
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function getCartItemDetailsByID(cartItemId) {
  const sqlQuery = `
  select 
    ci.*,
    p.product_id,
    p."name",
    p.description,
    TO_CHAR(p.unit_price, 'FM999,999,999') AS unit_price,
    p.discount,
    c."name" AS category_name,
    pb.product_brand_name AS brand_name,
    ARRAY_AGG(pg.image) AS image_links,
    ps.technical_specification
  from 
    cart_item ci 
  inner join product p on ci.product_id  = p.product_id 
  LEFT OUTER JOIN category c ON c.category_id = p.category_id
  LEFT OUTER JOIN product_brand pb ON pb.product_brand_id = p.product_brand_id
  LEFT OUTER JOIN product_gallery pg ON pg.product_id = p.product_id
  LEFT OUTER JOIN product_specification ps ON ps.product_id = p.product_id
  where ci.cart_item_id = '${cartItemId}'
  GROUP BY 
  p.product_id, c.category_id, pb.product_brand_id, ps.product_id, ci.cart_item_id
  `;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const result = await CartItem.update(
    { quantity: quantity },
    {
      where: { cart_item_id: cartItemId },
      returning: true,
    },
  );
  return result;
}
export async function removeCartItem(cartItemId) {
  const result = await CartItem.destroy({
    where: { cart_item_id: cartItemId },
  });
  return result;
}
export async function getProductInCartById(cartId) {
  const sqlQuery = `select cart_item_id, product_id,quantity from cart_item where cart_id = '${cartId}'`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}
