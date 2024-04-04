import { SequelizeInstance, User, UserRole } from '../utility/DbHelper.js';

export async function getAdmDetails(email) {
  const adminDetails = await User.findOne({
    where: {
      email,
    },
    include: [
      {
        model: UserRole,
        as: 'userRole',
        where: {
          role: 'ADMIN',
        },
      },
    ],
  });
  return adminDetails;
}

export async function getUsers() {
  const sqlQuery = `
  select * from public."user" u 
  inner join user_role ur 
  on u.role_id  = ur.role_id 
  where ur."role" != 'ADMIN'
`;
  const userList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return userList;
}
export async function getStaffRole() {
  const sqlQuery = `
  select * from user_role ur where role = 'STAFF'
`;
  const userList = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return userList;
}

export async function registerStaff(dataObj) {
  const { user_id, email, hashed_password, role_id } = dataObj;
  const sqlQuery = `
  INSERT INTO public."user" (user_id, email, "password", role_id, created_at) 
  VALUES(:user_id, :email, :password, :role_id, now())
    RETURNING *;
`;
  const userList = await SequelizeInstance.query(sqlQuery, {
    replacements: {
      user_id: user_id,
      email: email,
      password: hashed_password,
      role_id: role_id,
    },
    type: SequelizeInstance.QueryTypes.INSERT,
    raw: true,
  });
  return userList;
}
