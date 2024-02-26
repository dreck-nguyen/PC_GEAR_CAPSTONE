import * as paymentService from '../Service/PaymentService.js';
export async function getPayment(req, res, next) {
  try {
    const result = await paymentService.getPayment();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
