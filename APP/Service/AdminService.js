import * as adminDAL from '../DAL/AdminDAL.js';
export async function getAdmDetails(email, password) {
  return await adminDAL.getAdmDetails(email, password);
}
