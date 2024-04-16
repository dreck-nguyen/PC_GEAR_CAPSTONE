import express from 'express';
import jwt from 'jsonwebtoken';
import * as admService from '../Service/AdminService.js';
import dotenv from 'dotenv';
import * as commonEnums from '../Common/CommonEnums.js';
import * as commonFunction from '../Common/CommonFunction.js';
import { SequelizeInstance } from '../utility/DbHelper.js';
dotenv.config();

const router = express.Router();
const secret_key = process.env.SECRET_KEY;
export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await admService.getAdmDetails(email, password);
    const userDetails = result;
    if (userDetails) {
      const accessToken = jwt.sign(
        { user_id: userDetails.user_id },
        secret_key,
        {
          expiresIn: '30d',
        },
      );
      res.header('Authorization', `Bearer ${accessToken}`);
      userDetails.accessToken = `Bearer ${accessToken}`;
      res.send(userDetails);
    } else {
      res.status(400).send({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN))
      throw new Error(`${commonEnums.USER_ROLE.ADMIN} ONLY`);
    const users = await admService.getUser();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function registerStaff(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    if (!commonFunction.checkRole(loginUser, commonEnums.USER_ROLE.ADMIN))
      throw new Error(`${commonEnums.USER_ROLE.ADMIN} ONLY`);
    const dataObj = req.body;
    const users = await admService.registerStaff(dataObj);
    await t.commit();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.send(e);
    t.rollback();
  }
}
