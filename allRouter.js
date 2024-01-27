import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as shopController from './APP/Controller/ShopController.js';

const router = express.Router();
// ADMIN SECTION
router.post('/api/admin/login', admController.loginAdmin);
// PRODUCT SECTION
router.get('/api/product', shopController.getAllProduct);

export default router;
