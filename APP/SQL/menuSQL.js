export function getMenuList() {
  const text = `
  SELECT *
	FROM public.menu;`;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateMenuAvatar(menuId, imageFilePath) {
  const date = new Date();
  const text = `
  UPDATE public.menu
	SET  menu_photo=$2, updated_at=$3
	WHERE  menu_id=$1`;
  const values = [menuId, imageFilePath, date];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getMenuDetails(menuId) {
  const text = `
  SELECT *
	FROM public.menu  
  WHERE menu_id = $1`;
  const values = [menuId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getMenuFoodDetailsByName(menuName) {
  const text = `
  SELECT *
	FROM public.menu  
  WHERE menu_name = $1`;
  const values = [menuName];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getMenuFoodDetails(menuId) {
  const text = `
  SELECT *
	FROM public.menu m 
  WHERE m.menu_id = $1`;
  const values = [menuId];
  const query = {
    text: text,
    values: values,
  };
  console.log(query);
  return query;
}
export function createMenu(menuDetails) {
  const text = `
  INSERT INTO public.menu(
	menu_id, menu_name, menu_description, menu_price, is_default, type)
	VALUES ($1, $2, $3, $4, $5, $6);`;
  const values = [
    menuDetails.menu_id,
    menuDetails.menu_name,
    menuDetails.menu_description,
    menuDetails.menu_price,
    menuDetails.is_default,
    menuDetails.type,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateMenu(menuDetails) {
  const text = `
  UPDATE public.menu
	SET  menu_name=$2, menu_description=$3, menu_price=$4, is_default=$5, updated_at=$6, type=$7
	WHERE menu_id=$1`;
  const values = [
    menuDetails.menu_id,
    menuDetails.menu_name,
    menuDetails.menu_description,
    menuDetails.menu_price,
    menuDetails.is_default,
    date_time,
    menuDetails.type,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function deleteMenu(menuId) {
  const text = `
  DELETE FROM public.menu
	WHERE menu_id=$1`;
  const values = [menuId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function getFoodByMenu(menuId) {
  const text = `
    SELECT *
    FROM menu_food mf
    INNER JOIN food f
    ON f.food_id = mf.food_id
    WHERE mf.menu_id = $1`;
  const values = [menuId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
