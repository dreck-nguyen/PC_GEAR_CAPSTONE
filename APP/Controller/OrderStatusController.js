import * as orderStatusService from '../Service/OrderStatusService.js';
export async function getOrderStatus(req, res, next) {
  try {
    const result = await orderStatusService.getOrderStatus();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
