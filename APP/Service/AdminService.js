import {User,UserRole} from '../utility/DbHelper.js'
export async function getAdmDetails(email, password) {
    const adminDetails = await User.findOne({
      where: {
        email,
        password,
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
  if (!adminDetails) throw Error('ADMIN NOT FOUND');
  return adminDetails;
}

