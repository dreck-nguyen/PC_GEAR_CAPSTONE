import { CartItem } from '../utility/DbHelper.js';

export async function createCartItem(product) {
  await CartItem.create({
    cart_item_id: product.cart_item_id,
    cart_id: product.cart_id,
    product_id: product.product_id,
    quantity: product.quantity,
    unit_price: product.unit_price,
  });
}
export async function getCartItem(cartItemId) {
  const result = await CartItem.findOne({
    where: { cart_item_id: cartItemId },
  });
  return result.dataValues;
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const result = await CartItem.update(
    { quantity: quantity },
    {
      where: { cart_item_id: cartItemId },
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
