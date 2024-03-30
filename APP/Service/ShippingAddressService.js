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

export async function updateShippingAddress(userId, dataObj) {
  const result = await shippingAddressDAL.updateShippingAddress(
    userId,
    dataObj,
  );
  return result;
}

export async function deleteShippingAddress(userId, addressId) {
  const result = await shippingAddressDAL.deleteShippingAddress(
    userId,
    addressId,
  );
  return result;
}
