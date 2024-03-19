import * as userDAL from '../DAL/UserDAL.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
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
