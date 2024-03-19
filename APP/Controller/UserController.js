import express from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../Service/UserService.js';
import dotenv from 'dotenv';
import { SequelizeInstance } from '../utility/DbHelper.js';
dotenv.config();

const router = express.Router();
const secret_key = process.env.SECRET_KEY;
export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
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
      res.status(400).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function loginStaff(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await userService.loginStaff(email, password);
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
      res.status(400).send({ message: 'Staff not found' });
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function registerUser(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const userRegister = req.body;
    const result = await userService.registerUser(userRegister);
    if (result) {
      const accessToken = jwt.sign({ user_id: result }, secret_key, {
        expiresIn: '30d',
      });
      res.header('Authorization', `Bearer ${accessToken}`);
      const token = `Bearer ${accessToken}`;
      res.send({ accessToken: token });
      await t.commit();
    }
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(404).send({ error: error.message });
  }
}
