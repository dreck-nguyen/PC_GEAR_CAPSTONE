import * as userDAL from '../DAL/UserDAL.js';
import * as cartItemDAL from '../DAL/CartItemDAL.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import * as pcBuildDAL from '../DAL/PcBuilderDAL.js';
dotenv.config();
export async function loginUser(email, password) {
  const result = await userDAL.getUserDetails(email);
  const user = result.dataValues;
  if (!user) {
    throw new Error('User not found');
  }
  console.log(user);
  const isPasswordValid = await comparePasswordWithSalt(
    password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  return user;
}
export async function loginStaff(email, password) {
  const result = await userDAL.getStaffDetails(email);
  const user = result.dataValues;
  console.log(user);
  const isPasswordValid = await comparePasswordWithSalt(
    password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  return user;
}

export async function registerUser(userDetails) {
  if (
    !userDetails.first_name ||
    !userDetails.last_name ||
    !userDetails.email ||
    !userDetails.password ||
    !userDetails.phone_number
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const userByEmail = await userDAL.getUserByEmail(userDetails.email);
  if (userByEmail) throw new Error('Email Duplicated');
  const userID = uuidv4();
  userDetails.user_id = userID;
  const userRole = await userDAL.getUserRole();
  userDetails.role_id = userRole.role_id;
  const saltRounds = Number(process.env.SALT_KEY);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hash(userDetails.password, salt);
  userDetails.hashed_password = hashedPassword;
  await userDAL.registerUser(userDetails);
  return userID;
}
export async function comparePasswordWithSalt(
  password,
  hashedPasswordWithSalt,
) {
  try {
    const result = await bcrypt.compareSync(password, hashedPasswordWithSalt);
    return result;
  } catch (error) {
    console.error('Error comparing password with salt:', error);
    return false;
  }
}
export async function getUserInfoById(userId) {
  const result = await userDAL.getUserDetailsById(userId);
  return result;
}
export async function checkAuth(email, password) {
  const result = await userDAL.checkAuth(email, password);
  return result;
}
export async function createPersonalBuildPc(loginUser, dataObj) {
  const buildPcId = uuidv4();
  const userId = loginUser.user_id;
  let result;
  if (!dataObj.user_pc_build_id) {
    console.log(dataObj, buildPcId, userId);
    dataObj.user_pc_build_id = buildPcId;
    dataObj.user_id = userId;
    result = await pcBuildDAL.createPersonalBuildPc(dataObj);
  } else {
    console.log(dataObj);
    result = await pcBuildDAL.updatePersonalBuildPc(dataObj);
  }
  return result;
}
export async function getPersonalBuildPc(userId) {
  return await pcBuildDAL.getPersonalBuildPc(userId);
}

export async function deletePersonalBuildPc(loginUser, userPcBuildId) {
  await cartItemDAL.deleteByBuildPc(userPcBuildId);
  return await pcBuildDAL.deletePersonalBuildPc(
    loginUser.user_id,
    userPcBuildId,
  );
  // return true;
}

export async function updateUserAvatar(loginUser, image) {
  const [result] = await userDAL.updateUserAvatar(loginUser.user_id, image);
  return result;
}

export async function updateUserInfo(loginUser, dataObj) {
  const [result] = await userDAL.updateUserInfo(loginUser.user_id, dataObj);
  return result;
}

export async function getStaffPreBuildPc() {
  return await pcBuildDAL.getStaffPreBuildPc();
}
