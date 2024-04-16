import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as shippingAddressService from '../Service/ShippingAddressService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';

export async function getShippingAddress(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const result = await shippingAddressService.getShippingAddress(
      loginUser.user_id,
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createShippingAddress(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;

    const dataObj = req.body;
    const result = await shippingAddressService.createShippingAddress(
      loginUser.user_id,
      dataObj,
    );
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
export async function updateShippingAddress(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const dataObj = req.body;
    const addressId = req.params.addressId;
    dataObj.address_id = addressId;
    const result = await shippingAddressService.updateShippingAddress(
      loginUser.user_id,
      dataObj,
    );
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}

export async function deleteShippingAddress(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const addressId = req.params.addressId;

    const result = await shippingAddressService.deleteShippingAddress(
      loginUser.user_id,
      addressId,
    );
    res.status(200).send({ deletedRecord: result });
    await t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
