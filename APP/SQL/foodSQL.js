export function getFoodList() {
  const text = `
    SELECT *
	FROM public.food;`;
  const values = [];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getFoodDetails(foodId) {
  const text = `
    SELECT *
	FROM public.food
	WHERE food_id = $1`;
  const values = [foodId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getFoodDetailsByName(foodName) {
  const text = `
    SELECT *
	FROM public.food
	WHERE food_name = $1`;
  const values = [foodName];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function createFood(foodDetails) {
  const text = `
  INSERT INTO public.food(
	food_id, food_name, category_id, food_recipes)
	VALUES ($1, $2, $3, $4);`;
  const values = [
    foodDetails.food_id,
    foodDetails.food_name,
    foodDetails.category_id,
    foodDetails.food_recipes,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function createFoodIngredient(foodIngredient) {
  const text = `INSERT INTO public.food_ingredient(
	food_ingredient_id, food_id, ingredient_id, quantity)
	VALUES (?, ?, ?, ?);`;
  const values = [
    foodIngredient.food_ingredient_id,
    foodIngredient.food_id,
    foodIngredient.ingredient_id,
    foodIngredient.quantity,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function updateFoodAvatar(foodId, imgFilePath) {
  const query = `
  UPDATE public.food
	SET food_photo=$1
	WHERE food_id=$2`;
  const values = [foodId, imgFilePath];
  const queryObject = {
    text: query,
    values: values,
  };
  return queryObject;
}

export function updateFood(foodDetails) {
  const text = `
  UPDATE public.food
	SET  food_name=$2, category_id=$3, food_recipes=$4, food_photo=$5
	WHERE food_id=$1;`;
  const values = [
    foodDetails.food_id,
    foodDetails.food_name,
    foodDetails.category_id,
    foodDetails.food_recipes,
    foodDetails.food_photo,
  ];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
export function deleteFood(foodId) {
  const text = `
  DELETE FROM public.food
	WHERE food_id = $1`;
  const values = [foodId];
  const query = {
    text: text,
    values: values,
  };
  return query;
}

export function getFoodCategory(categoryDescription) {
  const text = `
  SELECT * FROM food f INNER JOIN categories c ON f.category_id = c.category_id WHERE description = $1`;
  const values = [categoryDescription];
  const query = {
    text: text,
    values: values,
  };
  return query;
}
