import { SequelizeInstance, User, UserRole } from '../utility/DbHelper.js';

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
export async function updateUserAvatar(userId, image) {
  const sqlQuery = `
    UPDATE public."user" SET avatar=:image
    WHERE user_id=:userId
     RETURNING user_id, first_name, last_name, phone_number, created_at, avatar
  `;

  const updateResult = await SequelizeInstance.query(sqlQuery, {
    replacements: { userId, image },
    type: SequelizeInstance.QueryTypes.UPDATE,
    raw: true,
  });

  return updateResult;
}

export async function updateUserInfo(userId, dataObj) {
  const { first_name, last_name, phone_number, created_at } = dataObj;
  const sqlQuery = `
    UPDATE public."user" 
    SET first_name = ?, last_name = ?, phone_number = ?, created_at = ? 
    WHERE user_id = ?
    RETURNING user_id, first_name, last_name, phone_number, created_at, avatar
  `;

  const updateResult = await SequelizeInstance.query(sqlQuery, {
    replacements: [first_name, last_name, phone_number, created_at, userId],
    type: SequelizeInstance.QueryTypes.UPDATE,
    raw: true,
  });

  return updateResult;
}

export async function getStaffDetails(email) {
  const userDetails = await User.findOne({
    where: {
      email,
    },
    include: [
      {
        model: UserRole,
        as: 'userRole',
        where: {
          role: 'STAFF',
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
    user_id: userDetails.user_id,
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    email: userDetails.email,
    password: userDetails.hashed_password,
    phone_number: userDetails.phone_number,
    role_id: userDetails.role_id,
  });
}

export async function getUserDetailsById(userId) {
  const sqlQuery = `
    select 
      user_id
      , role 
    from 
      public."user" u 
    inner join 
      user_role ur 
    on u.role_id = ur.role_id
    where user_id = '${userId}'
  `;

  const userDetails = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userDetails;
}

export async function checkAuth(email, password) {
  const userDetails = await User.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (!userDetails) throw Error('USER NOT FOUND');
  return userDetails;
}
