import express from 'express';

import * as admController from './APP/Controller/admController.js';

import * as ingredientController from './APP/Controller/ingredientController.js';
import * as userController from './APP/Controller/userController.js';
import * as foodController from './APP/Controller/foodController.js';
import * as menuController from './APP/Controller/menuController.js';
import * as serviceController from './APP/Controller/serviceController.js';
import * as feedBackController from './APP/Controller/feedBackController.js';
import uploadCloud from './APP/middleware/uploadCloudImg.js';

const router = express.Router();
// admin
router.post('/api/admin/login', admController.loginAdmin);
router.get('/api/admin/retrieve/user/list', admController.getUserList);
router.put('/api/admin/user/status', admController.updateUserStatus);
router.put('/api/admin/user/role', admController.updateUserRole);
router.delete('/api/admin/:userId', admController.deleteUser);

// user
router.post('/api/user/login', userController.loginUser);
router.get('/api/user/:userId', userController.getUserDetails);
router.post('/api/user/register', userController.registerUser);
router.put('/api/user/update/:userId', userController.updateUserDetails);
router.post('/api/user/info/:userId', userController.createUserInfo);
router.put('/api/user/info/:userId', userController.updateUserInfo);
router.put(
  '/api/user/avatar/:userId',
  uploadCloud.single('image'),
  userController.updateUserAvatar,
);
router.post(
  '/api/user/food/feed-back/:foodId',
  userController.createFoodFeedback,
);
router.post(
  '/api/user/menu/feed-back/:menuId',
  userController.createMenuFeedback,
);
router.post(
  '/api/user/trainer/feed-back/:trainerId',
  userController.createTrainerFeedback,
);

// ingredient
router.get('/api/ingredient', ingredientController.getIngredientList);
router.post('/api/ingredient', ingredientController.createNewIngredient);
router.get(
  '/api/ingredient/:ingredientId',
  ingredientController.getIngredientById,
);
router.put(
  '/api/ingredient/:ingredientId',
  ingredientController.updateIngredient,
);
router.delete(
  '/api/ingredient/:ingredientId',
  ingredientController.deleteIngredient,
);
router.put(
  '/api/ingredient/avatar/:ingredientId',
  uploadCloud.single('image'),
  ingredientController.updateIngredientAvatar,
);

// food
router.get('/api/food', foodController.getFoodList);
router.post('/api/food', foodController.createFood);
router.get('/api/food/:foodId', foodController.getFoodDetails);
router.put('/api/food/:foodId', foodController.updateFood);
router.delete('/api/food/:foodId', foodController.deleteFood);
router.put(
  '/api/food/avatar/:foodId',
  uploadCloud.single('image'),
  foodController.updateFoodAvatar,
);

// menu
router.get('/api/menu', menuController.getMenuList);
router.post('/api/menu', menuController.createMenu);
router.get('/api/menu/:menuId', menuController.getMenuFoodDetails);
router.put('/api/menu/:menuId', menuController.updateMenu);
router.delete('/api/menu/:menuId', menuController.deleteMenu);
router.put(
  '/api/menu/avatar/:menuId',
  uploadCloud.single('image'),
  menuController.updateMenuAvatar,
);

// feed-back
router.get('/api/feed-back/food/', feedBackController.getFoodFeedBacks);
router.get('/api/feed-back/menu/', feedBackController.getMenuFeedBacks);
router.get('/api/feed-back/trainer/', feedBackController.getTrainerFeedBacks);

router.get(
  '/api/feed-back/food/:foodId',
  feedBackController.getFoodFeedBackByFoodId,
);
router.get(
  '/api/feed-back/menu/:menuId',
  feedBackController.getMenuFeedBackListByMenuId,
);
router.get(
  '/api/feed-back/trainer/:trainerId',
  feedBackController.getTrainerFeedBackByTrainerId,
);
export default router;
