import * as cartDAL from '../DAL/CartDAL.js';
import * as cartItemDAL from '../DAL/CartItemDAL.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { v4 as uuidv4 } from 'uuid';
export async function createCart(loginUser, cartObject) {
  let cart_id = uuidv4();
  const userId = loginUser.user_id;

  // Check if the user already has a cart
  const [userCart] = await cartDAL.getCartUser(userId);

  if (userCart) {
    cart_id = userCart.cart_id;
  } else {
    // Create a new cart if the user doesn't have one
    const newCartObj = {
      cart_id,
      user_id: userId,
    };
    await cartDAL.createCart(newCartObj);
  }

  // Prepare product list for cart items
  const productList = cartObject.product_list.map((product) => {
    return {
      cart_id,
      user_id: userId,
      cart_item_id: uuidv4(),
      product_id: product.product_id,
      quantity: product.quantity,
      unit_price: product.unit_price,
      created_at: new Date(),
    };
  });

  // Check for existing products in the cart
  const productByCart = await cartItemDAL.getProductInCartById(cart_id);

  // Filter out products already in the cart
  const newProducts = productList.filter((product) => {
    return !productByCart.some(
      (existingProduct) => existingProduct.product_id === product.product_id,
    );
  });
  const alreadyHadProducts = productByCart.map((curr) => {
    const dup = productList.find((e) => e.product_id === curr.product_id);
    return {
      ...curr,
      quantity: curr.quantity + (dup ? dup.quantity : 0),
    };
  });

  // Add new products to the cart
  if (newProducts.length > 0) {
    for (const newProduct of newProducts) {
      await cartItemDAL.createCartItem(newProduct);
    }
  }
  if (alreadyHadProducts.length > 0) {
    for (const product of alreadyHadProducts) {
      await cartItemDAL.updateCartItemQuantity(
        product.cart_item_id,
        product.quantity,
      );
    }
  }
}
export async function getUserCart(userId) {
  const userCart = await cartDAL.getCartUser(userId);
  return userCart;
}

export async function getUsersCart() {
  const userCart = await cartDAL.getUsersCart();
  return userCart;
}
export async function uploadCartPcComponent(userId, dataObj) {
  let cart_id = uuidv4();
  const userCart = await getUserCart(userId);

  if (userCart) {
    cart_id = userCart.cart_id;
  } else {
    // Create a new cart if the user doesn't have one
    const newCartObj = {
      cart_id,
      user_id: userId,
    };
    await cartDAL.createCart(newCartObj);
  }
  const dateTime = new Date();
  const productIds = commonFunction.getProductIds(dataObj);
  for (const productId of productIds)
    await cartDAL.addBuildPcComponentToCart(
      uuidv4(),
      cart_id,
      productId,
      1,
      dateTime,
      true,
    );
}
