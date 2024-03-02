import * as cartService from '../Service/CartService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
export async function createCart(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const cartObject = req.body;
    await cartService.createCart(loginUser, cartObject);
    t.commit();
    const result = await cartService.getUserCart(loginUser.user_id);
    res.status(200).send(result);
  } catch (error) {
    t.rollback();
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}

export async function getUserCart(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const result = await cartService.getUserCart(loginUser.user_id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}

export async function getUsersCart(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN))
      throw new Error(`${commonEnums.USER_ROLE.ADMIN} ONLY`);
    const result = await cartService.getUsersCart();
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
