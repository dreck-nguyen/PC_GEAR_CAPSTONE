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
