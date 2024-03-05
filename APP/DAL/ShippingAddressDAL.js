import { ShippingAddress } from '../utility/DbHelper.js';

export async function getShippingAddress(userId) {
  const result = await ShippingAddress.findAll({ where: { user_id: userId } });
  return result;
}

export async function createShippingAddress(userId, dataObj) {
  const result = await ShippingAddress.create({
    address_id: dataObj.address_id,
    user_id: userId,
    recipient_name: dataObj.recipient_name,
    street_address: dataObj.street_address,
    city: dataObj.city,
    country: dataObj.country,
  });
  return result;
}
