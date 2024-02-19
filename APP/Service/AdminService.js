import * as adminDAL from '../DAL/AdminDAL.js';
import bcrypt from 'bcrypt';
import { comparePasswordWithSalt } from './UserService.js';
export async function getAdmDetails(email, password) {
  const result = await adminDAL.getAdmDetails(email);
  console.log(result.dataValues);
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
