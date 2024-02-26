import { Cart } from '../utility/DbHelper.js';

export async function getCartUser(userId) {
  const user = await Cart.findOne({ user_id: userId });
  return user;
}
