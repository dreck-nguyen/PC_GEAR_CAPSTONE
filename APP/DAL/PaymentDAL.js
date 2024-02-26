import { Payment } from '../utility/DbHelper.js';

export async function getPayment() {
  const result = await Payment.findAll();
  return result;
}
