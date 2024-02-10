import { User, UserRole } from '../utility/DbHelper.js';

export async function getUserDetails(email, password) {
  const userDetails = await User.findOne({
    where: {
      email,
      password,
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
