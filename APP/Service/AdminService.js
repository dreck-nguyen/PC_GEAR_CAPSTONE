import * as adminDAL from '../DAL/AdminDAL.js';
import bcrypt from 'bcrypt';
export async function getAdmDetails(email, password) {
  const admin = await adminDAL.getAdmDetails(email);
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
async function comparePasswordWithSalt(password, hashedPasswordWithSalt) {
  try {
    const [hashedPassword, salt] = hashedPasswordWithSalt.split('$');
    const hash = await bcrypt.compare(password, salt);
    return hash === hashedPassword;
  } catch (error) {
    console.error('Error comparing password with salt:', error);
    return false;
  }
}
