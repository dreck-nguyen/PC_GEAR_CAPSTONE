import * as pcBuilderService from '../Service/PcBuilderService.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { SequelizeInstance } from '../utility/DbHelper.js';

export async function pcAutoBuild(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    await pcBuilderService.pcBuilderService(loginUser.user_id);
    res.status(200).send('Pre-Build PC complete');
    await t.commit();
  } catch (error) {
    t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
