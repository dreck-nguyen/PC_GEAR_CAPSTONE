import * as cartDAL from '../DAL/CartDAL.js';
import * as cartItemDAL from '../DAL/CartItemDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function createCart(loginUser, cartObject) {
  let cart_id = uuidv4();
  const userId = loginUser.user_id;
  const [userCart] = await cartDAL.getCartUser(userId);
  if (userCart) cart_id = userCart.cart_id;
  else {
    const cartObject = {
      cart_id: cart_id,
      user_id: userId,
      status: cartObject.status,
    };
    await cartDAL.createCart(cartObject);
  }
  const productList = cartObject.product_list.map((e) => {
    e.cart_id = cart_id;
    e.user_id = userId;
    e.cart_item_id = uuidv4();
    return e;
  });
  if (productList.length > 0)
    for (const product of productList) {
      await cartItemDAL.createCartItem(product);
    }
}
export async function getUserCart(userId) {
  const [userCart] = await cartDAL.getCartUser(userId);
  return userCart;
}

export async function getUsersCart() {
  const userCart = await cartDAL.getUsersCart();
  return userCart;
}
