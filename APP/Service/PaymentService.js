import * as paymentDAL from '../DAL/PaymentDAL.js';
export async function getPayment() {
  const result = await paymentDAL.getPayment();
  return result;
}
