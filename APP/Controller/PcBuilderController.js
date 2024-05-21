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

export async function getPcBuildPurpose(req, res, next) {
  try {
    const result = await pcBuilderService.getPcBuildPurpose();
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}

export async function getPcBuildPurposeById(req, res, next) {
  try {
    const purposeId = req.params.purposeId;
    const result = await pcBuilderService.getPcBuildPurposeById(purposeId);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function upsertPcBuildPurpose(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const purposeId = req.params.purposeId || null;
    const dataObj = req.body;
    dataObj.purpose_id = purposeId;
    await pcBuilderService.upsertPcBuildPurpose(purposeId, dataObj);
    const result = await pcBuilderService.getPcBuildPurposeById(purposeId);
    res.status(200).send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deletePcBuildPurpose(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const purposeId = req.params.purposeId;
    await pcBuilderService.deletePcBuildPurpose(purposeId);
    res
      .status(200)
      .send({ message: `DELETE BUILD PC PURPOSE WITH ID ${purposeId}` });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function getAutoGenByPurpose(req, res, next) {
  try {
    const purposeId = req.params.purposeId;
    const totalPrice = req.query.total || 0;
    const result = await pcBuilderService.getAutoGenByPurpose(
      purposeId,
      totalPrice,
    );
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
