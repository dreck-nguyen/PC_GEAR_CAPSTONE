import { SequelizeInstance, ShippingAddress } from '../utility/DbHelper.js';

export async function getShippingAddress(userId) {
  const sqlQuery = `
SELECT 
   *
FROM 
  shipping_address
WHERE
  user_id = '${userId}'
`;

  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return result;
}

export async function createShippingAddress(userId, dataObj) {
  const {
    address_id,
    recipient_name,
    street_address,
    city,
    recipient_phone,
    district,
    ward,
  } = dataObj;

  const sqlQuery = `
    INSERT INTO public.shipping_address 
    (address_id, user_id, recipient_name, street_address, city, created_at, recipient_phone, district, ward) 
    VALUES (?, ?, ?, ?, ?, now(), ?, ?, ?)
    RETURNING *
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      address_id,
      userId,
      recipient_name,
      street_address,
      city,
      recipient_phone,
      district,
      ward,
    ],
    type: SequelizeInstance.QueryTypes.INSERT,
  });

  return result;
}

export async function updateShippingAddress(userId, dataObj) {
  const {
    address_id,
    recipient_name,
    street_address,
    city,
    recipient_phone,
    district,
    ward,
  } = dataObj;

  const sqlQuery = `
    UPDATE public.shipping_address 
    SET recipient_name = ?, 
        street_address = ?, 
        city = ?, 
        recipient_phone = ?, 
        district = ?, 
        ward = ? 
    WHERE address_id = ? AND user_id = ?
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      recipient_name,
      street_address,
      city,
      recipient_phone,
      district,
      ward,
      address_id,
      userId,
    ],
    type: SequelizeInstance.QueryTypes.UPDATE,
  });

  return result;
}
export async function deleteShippingAddress(userId, addressId) {
  const sqlQuery = `
    DELETE FROM shipping_address
    WHERE address_id = ? AND user_id = ?
  `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [addressId, userId],
    type: SequelizeInstance.QueryTypes.UPDATE,
  });

  return result;
}
