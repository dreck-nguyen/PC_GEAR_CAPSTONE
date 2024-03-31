import * as cartItemDAL from '../DAL/CartItemDAL.js';
import * as cartDAL from '../DAL/CartDAL.js';
import { v4 as uuidv4 } from 'uuid';
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
export async function createCartItemByUserPcBuild(loginUser, userPcBuildId) {
  const [cartUser] = await cartItemDAL.getCartUser(loginUser.user_id);

  let cart_id;
  if (!cartUser) {
    cart_id = uuidv4();
    await cartDAL.createCart({ cart_id, user_id: loginUser.user_id });
  } else {
    cart_id = cartUser.cart_id;
  }

  const [existingCartItem] = await cartItemDAL.getCartItemByUserPcBuild(
    loginUser.user_id,
    userPcBuildId,
  );

  if (!existingCartItem) {
    return await cartItemDAL.createCartItemByUserPcBuild(
      cart_id,
      userPcBuildId,
    );
  } else return existingCartItem;
}
export async function deleteCartItem(cartItemId) {
  await cartItemDAL.deleteCartItem(cartItemId);
}
