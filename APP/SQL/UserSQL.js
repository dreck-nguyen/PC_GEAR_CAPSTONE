// UserSQL.js

export function getAdminDetails(email, password) {
  const text = `
   SELECT * FROM users INNER JOIN user_role ON users.role_id = user_role.role_id WHERE user_role.role_name = 'ADMIN' AND email = $1 AND password = $2`;
  const values = [email, password];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getUserDetailsByUserId(userId) {
  const text = `
    SELECT *
    FROM public.users u
    INNER JOIN user_role ur
        ON ur.role_id = u.role_id
    WHERE u.user_id = $1`;
  const values = [userId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getUserDetailsByUserEmail(email) {
  const text = `
    SELECT *
    FROM public.users u
    INNER JOIN user_role ur
        ON ur.role_id = u.role_id
    WHERE u.email = $1
        AND ur.role_name != 'ADMIN'`;
  const values = [email];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getUserDetailsByLogin(email, password) {
  const text = `
    SELECT *
    FROM public.users u
    INNER JOIN user_role ur
        ON ur.role_id = u.role_id
    WHERE u.email = $1
        AND u.password = $2
        AND ur.role_name != 'ADMIN'`;
  const values = [email, password];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function registerUserDetails(userDetails) {
  const text = `
  INSERT INTO public.users(
	  user_id, user_full_name, user_photo, email, password, sex, birthday, phone_number, status)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  const values = [
    userDetails.user_id,
    userDetails.user_full_name,
    userDetails.user_photo,
    userDetails.email,
    userDetails.password,
    userDetails.sex,
    userDetails.birth_day,
    userDetails.phone_number,
    userDetails.status,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getAdminDetailsByUserId(email) {
  const text = `
    SELECT * FROM users INNER JOIN user_role ON users.role_id = user_role.role_id WHERE user_role.role_name = 'ADMIN' AND email = $1`;
  const values = [email];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getUserList() {
  const text = `
    SELECT *
    FROM public.users u
    INNER JOIN user_role ur
      ON ur.role_id = u.role_id
    WHERE ur.role_name != 'ADMIN'`;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateUserStatus(userId, status) {
  const text = `
    UPDATE public.users
    SET status= $2
    WHERE user_id = $1`;

  const values = [userId, status];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function deleteUser(userId) {
  const text = `
  DELETE FROM public."users"
  WHERE user_id = $1`;
  const values = [userId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getRoleDetailsByRoleName(roleName) {
  const text = `
  SELECT *
	FROM public.user_role
  WHERE role_name = $1`;
  const values = [roleName];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateUserRole(userId, roleId) {
  const text = `
    UPDATE public.users
    SET role_id= $2
    WHERE user_id = $1`;

  const values = [userId, roleId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateUserByUserDetails(userId, userDetails) {
  const text = `
  UPDATE public."users"
	SET user_full_name=$2, user_photo=$3, sex=$4, birthday=$5, phone_number=$6, status=$7,certificate_id=$8,certificate_name=$9, certificate_file_link=$10
	WHERE user_id = $1;`;

  const values = [
    userId,
    userDetails.user_full_name,
    userDetails.user_photo,
    userDetails.sex,
    userDetails.birth_day,
    userDetails.phone_number,
    userDetails.status,
    userDetails.certificate_id,
    userDetails.certificate_name,
    userDetails.certificate_file_link,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateUserAvatar(userId, imgPath) {
  const text = `
  UPDATE public.users
	SET user_photo=$2
	WHERE user_id=$1;`;
  const values = [userId, imgPath];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function createUserBodyMax(userDetails) {
  const text = `
  INSERT INTO public.user_body_max(
	user_body_max_id, user_id, height, weight, minimum_calories, maximum_calories)
	VALUES ($1, $2, $3, $4, $5, $6);`;
  const values = [
    userDetails.user_body_max_id,
    userDetails.user_id,
    userDetails.height,
    userDetails.weight,
    userDetails.minimum_calories,
    userDetails.maximum_calories,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function updateUserBodyMax(userDetails) {
  const text = `
  UPDATE public.user_body_max
	SET height=$1, weight=$2, minimum_calories=$3, maximum_calories=$4
	WHERE user_id=$1;`;
  const values = [
    userDetails.user_id,
    userDetails.height,
    userDetails.weight,
    userDetails.minimum_calories,
    userDetails.maximum_calories,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getUserBodyMax(userId) {
  const text = `
  SELECT *
  FROM public.user_body_max
  WHERE user_id = $1`;
  const values = [userId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function createFoodFeedback(foodId, feedBackDetails) {
  const text = `
  INSERT INTO public.feedback(
	feedback_id, user_id, message)
	VALUES ($1, $2, $3);

  INSERT INTO public.food_feedback(
	food_feedback_id, feedback_id, food_id)
	VALUES ($4, $1, $5);`;

  const values = [
    feedBackDetails.feedback_id,
    feedBackDetails.user_id,
    feedBackDetails.message,
    feedBackDetails.food_feedback_id,
    feedBackDetails.food_id,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function createMenuFeedback(menuId, feedBackDetails) {
  const text = `
  INSERT INTO public.feedback(
	feedback_id, user_id, message)
	VALUES ($1, $2, $3);

  INSERT INTO public.favorite_menu(
	favorite_menu_id, user_id, menu_id)
	VALUES ($4, $2, $5);`;

  const values = [
    feedBackDetails.feedback_id,
    feedBackDetails.user_id,
    feedBackDetails.message,
    feedBackDetails.favorite_menu_id,
    feedBackDetails.menu_id,
  ];
  const query = {
    text: text,
    values: values,
  };
  console.log();
  return query;
}

export function createTrainerFeedback(trainerId, feedBackDetails) {
  const text = `
 INSERT INTO public.feedback(
	feedback_id, user_id, message)
	VALUES ($1, $2, $3);

  INSERT INTO public.trainer_feedback(
	trainer_feedback_id, feedback_id, trainer_id)
	VALUES ($4, $1, $5);`;

  const values = [
    feedBackDetails.feedback_id,
    feedBackDetails.user_id,
    feedBackDetails.message,
    feedBackDetails.trainer_feedback_id,
    feedBackDetails.trainer_id,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function getTrainerDetails(trainerId) {
  const text = `
  SELECT *
  FROM users u INNER JOIN user_role ur ON u.role_id = ur.role_id WHERE u.user_id = $1 AND ur.role_name = 'TRAINER'`;
  const values = [trainerId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
