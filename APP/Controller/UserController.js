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
      await t.commit();
      res.send({ accessToken: token });
    }
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(404).send({ error: error.message });
  }
}

export async function createPersonalBuildPc(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const dataObj = req.body;
    const result = await userService.createPersonalBuildPc(loginUser, dataObj);
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(404).send({ error: error.message });
  }
}
export async function copyStaffToPersonalBuildPc(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const userBuildId = req.params.userBuildId;
    const result = await userService.copyStaffToPersonalBuildPc(
      loginUser.user_id,
      userBuildId,
    );
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(404).send({ error: error.message });
  }
}
export async function deletePersonalBuildPc(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const userPcBuildId = req.params.user_pc_build_id;
    const result = await userService.deletePersonalBuildPc(
      loginUser,
      userPcBuildId,
    );
    await t.commit();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(404).send({ error: error.message });
  }
}
export async function getPersonalBuildPc(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const result = await userService.getPersonalBuildPc(loginUser.user_id);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}
export async function getPersonalBuildPcFe(req, res, next) {
  try {
    const loginUser = req.loginUser;
    const result = await userService.getPersonalBuildPcFe(loginUser.user_id);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}
export async function updateUserAvatar(req, res, next) {
  const t = await SequelizeInstance.transaction();

  try {
    const loginUser = req.loginUser;
    const image = req.file;
    const [user] = await userService.updateUserAvatar(loginUser, image.path);
    res.status(201).send(user);
    await t.commit();
  } catch (error) {
    t.rollback();
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}
export async function updateUserInfo(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const loginUser = req.loginUser;
    const dataObj = req.body;
    const user = await userService.updateUserInfo(loginUser, dataObj);
    res.status(201).send(user);
    await t.commit();
  } catch (error) {
    t.rollback();
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}

export async function getStaffPreBuildPc(req, res, next) {
  try {
    const result = await userService.getStaffPreBuildPc();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
}
