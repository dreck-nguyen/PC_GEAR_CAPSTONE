import * as cartItemDAL from '../DAL/CartItemDAL.js';
export async function updateOrDeleteQuantity(cartItemId, quantity) {
  const cartItem = await cartItemDAL.getCartItem(cartItemId);
  if (!cartItem) throw new Error('CART ITEM NOT FOUND');
  if (quantity > 0)
    await cartItemDAL.updateCartItemQuantity(cartItemId, quantity);
  if (quantity === 0) await cartItemDAL.removeCartItem(cartItemId, quantity);
}
export async function getCartItemDetailsByID(cartItemId) {
  const result = await cartItemDAL.getCartItemDetailsByID(cartItemId);
  return result;
}
