import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as shopController from './APP/Controller/ShopController.js';
import * as categoryController from './APP/Controller/CategoryController.js';
import * as userController from './APP/Controller/UserController.js';

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
 *     tags:
 *       - product
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
/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: Shop-related routes
 * /api/product/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieve a list of products for a specific category.
 *     tags:
 *       - product
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *           example : 6f5acf44-4542-4c5c-be43-6a71b150f752
 *         required: true
 *         description: The ID of the category.
 *     responses:
 *       200:
 *         description: Successful response with the list of products.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/api/product/:categoryId', shopController.getProductsByCategory);

//CATEGORY SECTION
/**
 * @swagger
 * tags:
 *   - name: category
 *     description: Operations related to categories
 *
 * /api/category:
 *   get:
 *     summary: Get breadcrumb categories
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
/**
 * @swagger
 * tags:
 *   - name: category
 *     description: Operations related to categories
 *
 * /api/categories:
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
router.get('/api/category', categoryController.getCategoryBreadcrumb);
router.get('/api/categories', categoryController.getAllCategory);

// User Authentication
router.get('/api/user/login', userController.loginUser);

export default router;
