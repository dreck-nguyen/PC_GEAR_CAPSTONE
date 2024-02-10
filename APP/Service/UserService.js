import * as userDAL from '../DAL/UserDAL.js';
export async function loginUser(email, password) {
  return await userDAL.getUserDetails(email, password);
}
