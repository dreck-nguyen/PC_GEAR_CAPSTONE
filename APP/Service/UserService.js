import * as userDAL from '../DAL/UserDAL.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export async function loginUser(email, password) {
  return await userDAL.getUserDetails(email, password);
}

export async function registerUser(userDetails) {
  if (
    !userDetails.firstName ||
    !userDetails.lastName ||
    !userDetails.email ||
    !userDetails.password ||
    !userDetails.passwordReconfirmed ||
    !userDetails.phoneNumber
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (userDetails.password !== userDetails.passwordReconfirmed)
    throw new Error('Password confirm failed!!!');
  const userByEmail = await userDAL.getUserByEmail(userDetails.email);
  if (userByEmail) throw new Error('Email Duplicated');
  const userID = uuidv4();
  userDetails.userId = userID;
  const userRole = await userDAL.getUserRole();
  userDetails.roleId = userRole.role_id;
  const saltRounds = Number(process.env.SALT_KEY);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hash(userDetails.password, salt);
  userDetails.hashedPassword = hashedPassword;
  await userDAL.registerUser(userDetails);
  return userID;
}
