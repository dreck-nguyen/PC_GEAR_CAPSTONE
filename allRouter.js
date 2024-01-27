import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as shopController from './APP/Controller/ShopController.js';
import * as categoryController from './APP/Controller/CategoryController.js';

const router = express.Router();
// ADMIN SECTION
router.post('/api/admin/login', admController.loginAdmin);

// PRODUCT SECTION
/**
 * @swagger
 * tags:
 *   - name: product
 *     description: Operations related to categories
 *
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 products: [...]
 *       500:
 *         description: Internal server error
 */
router.get('/api/product', shopController.getAllProduct);

//CATEGORY SECTION
/**
 * @swagger
 * tags:
 *   - name: category
 *     description: Operations related to categories
 *
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     tags:
 *       - category
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 categories: [...]
 *       500:
 *         description: Internal server error
 */
router.get('/api/category', categoryController.getAllCategory);

export default router;
