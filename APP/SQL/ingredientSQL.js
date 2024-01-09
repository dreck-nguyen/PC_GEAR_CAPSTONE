// ingredientSQL.js

export function getIngredientList() {
  const text = `
	SELECT * FROM public.ingredient i
  INNER JOIN public.ingredient_category ic
    ON ic.ingredient_category_id = i.ingredient_category_id`;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getIngredientDetails(ingredientId) {
  const text = `
	SELECT i.ingredient_id, i.ingredient_name, i.ingredient_photo,ic.ingredient_category_name, ic.description
    FROM public.ingredient i
    INNER JOIN public.ingredient_category ic
    ON ic.ingredient_category_id = i.ingredient_category_id
    WHERE i.ingredient_id = $1`;
  const values = [ingredientId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getIngredientDetailsByName(ingredientName) {
  const text = `
	SELECT i.ingredient_id, i.ingredient_name, i.ingredient_photo,ic.ingredient_category_name, ic.description
    FROM public.ingredient i
    INNER JOIN public.ingredient_category ic
    ON ic.ingredient_category_id = i.ingredient_category_id
    WHERE i.ingredient_name = $1`;
  const values = [ingredientName];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function getIngredientDetailsByNames(ingredientName) {
  const text = `
	SELECT i.ingredient_id, i.ingredient_name, i.ingredient_photo,ic.ingredient_category_name, ic.description
    FROM public.ingredient i
    INNER JOIN public.ingredient_category ic
    ON ic.ingredient_category_id = i.ingredient_category_id
    WHERE i.ingredient_name = ANY($1::VARCHAR[])`;
  const values = [ingredientName];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function createNewIngredient(ingredientDetails) {
  const text = `
	INSERT INTO public.ingredient(
	ingredient_id, ingredient_name, ingredient_photo, ingredient_category_id)
	VALUES ($1, $2, $3,
         (SELECT ingredient_category_id
         FROM public.ingredient_category
         WHERE ingredient_category_name = $4));`;
  const values = [
    ingredientDetails.ingredient_id,
    ingredientDetails.ingredient_name,
    ingredientDetails.ingredient_photo,
    ingredientDetails.ingredient_category_name,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateIngredient(ingredientId, ingredientDetails) {
  const text = `
  UPDATE public.ingredient
	SET ingredient_name=$2,
    ingredient_photo=$3,
    ingredient_category_id=$4,
    updated_at=$5
	WHERE ingredient_id = $1;`;
  const values = [
    ingredientId,
    ingredientDetails.ingredient_name,
    ingredientDetails.ingredient_photo,
    ingredientDetails.ingredient_category_id,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getIngredientCategory(ingredientName) {
  const text = `
    SELECT * FROM ingredient_category
    WHERE ingredient_category_name = $1`;
  const values = [ingredientName];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function deleteIngredient(ingredientId) {
  const text = `
    DELETE FROM public.ingredient
    WHERE ingredient_id = $1`;
  const values = [ingredientId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function updateIngredientAvatar(ingredientId, avatarFilePath) {
  const text = `UPDATE public.ingredient
	SET ingredient_photo=$2, updated_at=$3
	WHERE ingredient_id = $1;`;
  const values = [ingredientId, avatarFilePath];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
