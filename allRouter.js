import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as shopController from './APP/Controller/ShopController.js';
import * as categoryController from './APP/Controller/CategoryController.js';
import * as userController from './APP/Controller/UserController.js';

const router = express.Router();
// ADMIN SECTION
/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Operations related to categories
 *
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Log in a admin with email and password
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: duchnh@gmail.com
 *               password:
 *                 type: string
 *                 example: pass
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/admin/list/user:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users for administration purposes.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   username: user1
 *                   email: user1@example.com
 *                 - id: 2
 *                   username: user2
 *                   email: user2@example.com
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.post('/api/admin/login', admController.loginAdmin);
router.get('/api/admin/list/user', admController.getUsers);
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
/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operations related to categories
 *
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Log in a user with email and password
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: janedoe@gmail.com
 *               password:
 *                 type: string
 *                 example: pass
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     userRegister:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: janedoe@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: The password for user authentication.
 *           example: pass
 *         passwordReconfirmed:
 *           type: string
 *           format: password
 *           description: The reconfirmed password for user authentication.
 *           example: pass
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user.
 *           example: +1234567890
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * definitions:
 *   UserRegistration:
 *     type: object
 *     required:
 *       - first_name
 *       - last_name
 *       - email
 *       - password
 *       - phone_number
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phone_number:
 *         type: string
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserRegistration'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request, validation error, or passwords do not match
 *       '500':
 *         description: Internal Server Error
 */
router.post('/api/user/login', userController.loginUser);
router.post('/api/user/register', userController.registerUser);

export default router;
