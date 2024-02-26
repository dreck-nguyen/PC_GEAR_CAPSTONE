import * as cartService from '../Service/CartService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
export async function createCart(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser || {
      user_id: '1dff5a51-91ab-469e-bcd7-79a3195cfbad',
    };
    const cartObject = req.body;
    await cartService.createCart(loginUser, cartObject);
    const result = await cartService.getUserCart(loginUser.user_id);
    res.status(200).send(result);
    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}

export async function getUserCart(req, res, next) {
  try {
    const loginUser = req.loginUser || {
      user_id: '1dff5a51-91ab-469e-bcd7-79a3195cfbad',
    };
    const result = await cartService.getUserCart(loginUser.user_id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}

export async function getUsersCart(req, res, next) {
  try {
    const result = await cartService.getUsersCart();
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
