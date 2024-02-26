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
    res.status(200).send(result);
    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
}
