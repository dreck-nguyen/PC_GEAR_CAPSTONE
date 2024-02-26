import * as cartService from '../Service/CartService.js';
export async function createCart(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const cartObject = req.body;
    const result = await cartService.createCart(loginUser, cartObject);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
