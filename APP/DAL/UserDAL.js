import { User, UserRole } from '../utility/DbHelper.js';

export async function getUserDetails(email) {
  const userDetails = await User.findOne({
    where: {
      email,
    },
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
  if (!userDetails) throw Error('USER NOT FOUND');
  return userDetails;
}
export async function getUserRole() {
  const usersWithRole = await UserRole.findOne({
    where: {
      role: 'USER',
    },
  });
  return usersWithRole.dataValues;
}
export async function getUserByEmail(email) {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  return user;
}
export async function registerUser(userDetails) {
  await User.create({
    user_id: userDetails.userId,
    first_name: userDetails.firstName,
    last_name: userDetails.lastName,
    email: userDetails.email,
    password: userDetails.hashedPassword,
    phone_number: userDetails.phoneNumber,
    role_id: userDetails.roleId,
  });
}
