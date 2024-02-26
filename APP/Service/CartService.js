import * as cartDAL from '../DAL/CartDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function createCart(loginUser, cartObject) {
  let cart_id = uuidv4();
  const userId = loginUser.user_id;
  const userCart = await cartDAL.getCartUser(userId);
  if (userCart) cart_id = userCart.cart_id;
  const result = await cartDAL.createCart(cartObject);
  return result;
}
