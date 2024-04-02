import * as orderService from '../Service/OrderService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as orderStatusService from '../Service/OrderStatusService.js';

export async function getUsersOrder(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN))
      throw new Error(`${commonEnums.USER_ROLE.ADMIN} ONLY`);
    const result = await orderService.getUsersOrder();
    res.status(200).send(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getOrderByUserId(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const result = await orderService.getOrderByUserId(loginUser);
    res.status(200).send(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getOrderById(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const orderId = req.params.orderId;
    const result = await orderService.getOrderById(orderId);
    res.status(200).send(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createOrderByUser(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const cartObject = req.body;
    await orderService.createOrderByUser(loginUser, cartObject);
    const result = await orderService.getOrderByUserId(loginUser);
    res.status(200).send(result);
    t.commit();
    next();
  } catch (error) {
    t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function updateOrderStatus(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const orderId = req.params.orderId;
    const statusId = req.body.status_id;
    await orderService.updateOrderStatus(orderId, statusId);
    res.status(200).send({ message: 'UPDATE STATUS DONE' });
    t.commit();
    next();
  } catch (error) {
    t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getOrderStatus(req, res, next) {
  try {
    const result = await orderStatusService.getOrderStatus();
    res.status(200).send(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getOrderStatusByStatusId(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const orderStatusId = req.params.orderStatusId;
    const result = await orderStatusService.getOrderStatusByStatusId(
      loginUser.user_id,
      orderStatusId,
    );
    res.status(200).send(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
