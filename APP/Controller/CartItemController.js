import { SequelizeInstance } from '../utility/DbHelper.js';
import * as cartItemService from '../Service/CartItemService.js';
export async function updateCartItemQuantity(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const cartItemId = req.params.cartItemId;
    const quantity = req.body.quantity;
    const result = await cartItemService.updateOrDeleteQuantity(
      cartItemId,
      quantity,
    );
    res.status(200).send({ result });
    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
export async function deleteCartItem(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const cartItemId = req.params.cartItemId;
    await cartItemService.deleteCartItem(cartItemId);
    res.status(200).send({ message: `DELETE CART ITEM ID : ${cartItemId}` });
    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
export async function createCartItemByUserPcBuild(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const userPcBuildId = req.params.userPcBuildId;
    const result = await cartItemService.createCartItemByUserPcBuild(
      loginUser,
      userPcBuildId,
    );
    res.status(200).send(result);
    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}

export async function getCartItemDetailsByID(req, res, next) {
  try {
    const cartItemId = req.params.cartItemId;
    const result = await cartItemService.getCartItemDetailsByID(cartItemId);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
