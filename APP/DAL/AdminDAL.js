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
