import * as orderService from '../Service/OrderService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
import * as commonFunction from '../Common/CommonFunction.js';
import * as commonEnums from '../Common/CommonEnums.js';
import * as orderStatusService from '../Service/OrderStatusService.js';

export async function getUsersOrder(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );

    const result = await orderService.getUsersOrder();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getUsersOrderByOrderId(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.STAFF} || ${commonEnums.USER_ROLE.ADMIN} ONLY`,
      );
    const orderId = req.params.orderId;
    const result = await orderService.getOrderById(orderId);
    res.status(200).send(result);
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
    const limit = req.query.limit || 5;
    const offset = req.query.offset || 0;
    const result = await orderService.getOrderByUserId(
      loginUser,
      limit,
      offset,
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getOrderForStaffById(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN) &&
      !commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.STAFF)
    )
      throw new Error(
        `${commonEnums.USER_ROLE.ADMIN} || ${commonEnums.USER_ROLE.STAFF} ONLY`,
      );
    const orderId = req.params.orderId;
    const result = await orderService.getOrderById(orderId);
    res.status(200).send(result);
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
    const orderId = await orderService.createOrderByUser(loginUser, cartObject);
    res.status(200).send({ orderId });
    await t.commit();
  } catch (error) {
    t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function updateOrderStatus(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const orderId = req.params.orderId;
    const statusId = req.body.status_id;
    await orderService.updateOrderStatus(loginUser, orderId, statusId);
    res.status(200).send({ message: 'UPDATE STATUS DONE' });
    await t.commit();
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function createOrderDetailRating(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.USER))
      throw new Error(`${commonEnums.USER_ROLE.USER} ONLY`);
    const orderDetailId = req.params.orderDetailId;
    const { rating, review } = req.body;
    const result = await orderStatusService.createOrderDetailRating(
      loginUser.user_id,
      orderDetailId,
      rating,
      review,
    );
    res.status(200).send(result);
    await t.commit();
  } catch (error) {
    t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
