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
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const dataObj = req.body;
    const result = await shippingAddressService.createShippingAddress(
      loginUser.user_id,
      dataObj,
    );
    res.status(200).send(result);
    t.commit();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
    t.rollback();
  }
}
