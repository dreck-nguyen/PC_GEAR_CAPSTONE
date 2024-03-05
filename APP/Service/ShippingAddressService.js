import * as shippingAddressDAL from '../DAL/ShippingAddressDAL.js';
import { v4 as uuidv4 } from 'uuid';
export async function getShippingAddress(userId) {
  const result = await shippingAddressDAL.getShippingAddress(userId);
  return result;
}

export async function createShippingAddress(userId, dataObj) {
  dataObj.address_id = uuidv4();
  const result = await shippingAddressDAL.createShippingAddress(
    userId,
    dataObj,
  );
  return result;
}
