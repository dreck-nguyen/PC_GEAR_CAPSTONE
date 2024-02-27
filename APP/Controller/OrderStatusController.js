import * as orderStatusService from '../Service/OrderStatusService.js';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
export async function getOrderStatus(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN))
      throw new Error(`${commonEnums.USER_ROLE.ADMIN} ONLY`);
    const result = await orderStatusService.getOrderStatus();
    res.status(200).send(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
