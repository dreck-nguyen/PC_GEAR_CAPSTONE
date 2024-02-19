import { User, UserRole } from '../utility/DbHelper.js';

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
  const userList = await User.findAll({
    include: [
      {
        model: UserRole,
        as: 'userRole',
        where: {
          role: 'USER',
        },
      },
    ],
  });
  return userList;
}
