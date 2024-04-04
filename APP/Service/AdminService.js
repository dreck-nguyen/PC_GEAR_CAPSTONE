import * as adminDAL from '../DAL/AdminDAL.js';
import { comparePasswordWithSalt } from './UserService.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export async function getAdmDetails(email, password) {
  const result = await adminDAL.getAdmDetails(email);
  const admin = result.dataValues;
  if (!admin) {
    throw new Error('Admin not found');
  }
  const isPasswordValid = await comparePasswordWithSalt(
    password,
    admin.password,
  );
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  return admin;
}

export async function getUser() {
  const result = await adminDAL.getUsers();
  return result;
}

export async function registerStaff(dataObj) {
  const [role] = await adminDAL.getStaffRole();
  dataObj.user_id = uuidv4();
  dataObj.role_id = role.role_id;
  const saltRounds = Number(process.env.SALT_KEY);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hash(dataObj.password, salt);
  dataObj.hashed_password = hashedPassword;
  const [staffCreated] = await adminDAL.registerStaff(dataObj);
  return staffCreated;
}
