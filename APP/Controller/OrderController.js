import * as orderService from '../Service/OrderService.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
export async function getUsersOrder(req, res, next) {
  try {
    const result = await orderService.getUsersOrder();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getOrderByUserId(req, res, next) {
  try {
    const loginUser = req.loginUser || {
      user_id: '1dff5a51-91ab-469e-bcd7-79a3195cfbad',
    };
    const result = await orderService.getOrderByUserId(loginUser);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getOrderById(req, res, next) {
  try {
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
    const loginUser = req.loginUser || {
      user_id: '1dff5a51-91ab-469e-bcd7-79a3195cfbad',
    };
    const cartObject = req.body;
    await orderService.createOrderByUser(loginUser, cartObject);
    const result = await orderService.getOrderByUserId(loginUser);
    res.status(200).send(result);
    t.commit();
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
  } catch (error) {
    t.rollback();
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}
