import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as productController from './APP/Controller/ProductController.js';
import * as categoryController from './APP/Controller/CategoryController.js';
import * as userController from './APP/Controller/UserController.js';
import * as cartController from './APP/Controller/CartController.js';
import * as brandController from './APP/Controller/BrandController.js';
import * as cartItemController from './APP/Controller/CartItemController.js';
const router = express.Router();
// ADMIN SECTION
/**
 * @swagger
 * tags:
 *   - name:  ADMIN SECTION
 *     description: Operations related to categories
 *
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Log in a admin with email and password
 *     tags:
 *       -  ADMIN SECTION
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
 *       - ADMIN SECTION
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
/**
 * @swagger
 * /api/admin/cart:
 *   get:
 *     summary: Get users' cart details (admin)
 *     description: Retrieve details of users' carts. This endpoint is for administrators.
 *     tags:
 *       - ADMIN SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the details of users' carts.
 *         content:
 *           application/json:
 *             example:
 *               carts:
 *                 - userId: 123
 *                   items: [...]
 *                 - userId: 456
 *                   items: [...]
 *       '401':
 *         description: Unauthorized. The request requires administrator privileges.
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized access
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.post('/api/admin/login', admController.loginAdmin);
router.get('/api/admin/list/user', admController.getUsers);
router.get('/api/admin/cart', cartController.getUsersCart);
// PRODUCT SECTION
/**
 * @swagger
 * tags:
 *   - name: PRODUCT SECTION
 *     description: Operations related to categories
 *
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags:
 *       - PRODUCT SECTION
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
/**
 * @swagger
 * tags:
 *   name: PRODUCT SECTION
 *   description: product-related routes
 * /api/product/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieve a list of products for a specific category.
 *     tags:
 *       - PRODUCT SECTION
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
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with the provided data.
 *     tags:
 *       - PRODUCT SECTION
 *     requestBody:
 *       description: Product data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               unit_price:
 *                 type: number
 *               discount:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               product_brand_id:
 *                 type: string
 *             required:
 *               - category_id
 *               - name
 *               - unit_price
 *               - quantity
 *     responses:
 *       201:
 *         description: Successfully created a new product
 *         content:
 *           application/json:
 *             example:
 *               category_id: "d2b45a25-9fa2-47ec-b6ad-cba2884b1faf"
 *               name: "test product"
 *               description: This is an example product
 *               unit_price: 19.99
 *               discount: 5.00
 *               quantity: 100
 *               sold: 0
 *               product_brand_id: "91dcfc85-5f39-44ae-9cea-535a9565d2e5"
 *               created_at: "2024-02-21T12:00:00Z"
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/product', productController.getAllProduct);
router.post('/api/product', productController.createProduct);
router.get('/api/product/:categoryId', productController.getProductsByCategory);

//CATEGORY SECTION
/**
 * @swagger
 * tags:
 *   - name: CATEGORY SECTION
 *     description: Operations related to categories
 *
 * /api/category:
 *   get:
 *     summary: Get breadcrumb categories
 *     description: Retrieve a list of all categories.
 *     tags:
 *       - CATEGORY SECTION
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
 *   - name: CATEGORY SECTION
 *     description: Operations related to categories
 *
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     tags:
 *       - CATEGORY SECTION
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
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the provided data.
 *     tags:
 *       - CATEGORY SECTION
 *     requestBody:
 *       description: Category data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parent_id:
 *                 type: string
 *               name:
 *                 type: string
 *               status:
 *                 type: boolean
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - name
 *               - status
 *     responses:
 *       201:
 *         description: Successfully created a new category
 *         content:
 *           application/json:
 *             example:
 *               category_id: null
 *               parent_id: "6f5acf44-4542-4c5c-be43-6a71b150f752"
 *               name: "test category"
 *               status: true
 *               description: "string"
 *               image: example.jpg
 *               created_at: "2024-02-21T12:00:00Z"
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/category', categoryController.getCategoryBreadcrumb);
router.post('/api/category', categoryController.createCategory);
router.get('/api/categories', categoryController.getAllCategory);

// User Authentication
/**
 * @swagger
 * tags:
 *   - name: USER SECTION
 *     description: Operations related to categories
 *
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Log in a user with email and password
 *     tags:
 *       - USER SECTION
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
 *       - USER SECTION
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

// CART SECTION
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart details
 *     description: Retrieve details of the user's cart.
 *     tags:
 *      - CART SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the details of the user's cart.
 *         content:
 *           application/json:
 *             example:
 *               userId: 123
 *               items: [...]
 *       '401':
 *         description: Unauthorized. The request requires user authentication.
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized access
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new cart with the specified status and a list of products.
 *     tags:
 *       - CART SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The status of the cart.
 *                 example :
 *               product_list:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product.
 *                       example: 2
 *                     product_id:
 *                       type: string
 *                       format: uuid
 *                       description: The ID of the product.
 *                       example: 6313edd7-5ad3-4014-930b-eb6e638be805
 *                     unit_price:
 *                       type: number
 *                       description: The unit price of the product.
 *                       example: 34900000
 *             required:
 *               - status
 *               - product_list
 *     responses:
 *       '201':
 *         description: A successful response indicating the cart has been created.
 *         content:
 *           application/json:
 *             example:
 *               cart_id: 123
 *               status: "open"
 *       '400':
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request, missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get('/api/cart', cartController.getUserCart);
router.post('/api/cart', cartController.createCart);

// CART ITEM SECTION
/**
 * @swagger
 * /api/cart-item/{cartItemId}:
 *   put:
 *     summary: Update cart item quantity
 *     description: Update the quantity of a cart item by providing the cartItemId in the path and the new quantity in the request body.
 *     tags:
 *       - CART ITEM SECTION
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: The ID of the cart item to update.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the cart item.
 *             required:
 *               - quantity
 *     responses:
 *       '200':
 *         description: A successful response indicating the cart item quantity has been updated.
 *         content:
 *           application/json:
 *             example:
 *               cartItemId: 3997ec61-d1d7-4e91-b484-78a464b83c52
 *               quantity: 5
 *       '404':
 *         description: The specified cart item ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Cart item not found
 *       '400':
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request, missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.put(
  '/api/cart-item/:cartItemId',
  cartItemController.updateCartItemQuantity,
);
// BRANCH SECTION
/**
 * @swagger
 * /api/product-brand:
 *   get:
 *     summary: Get all product brands
 *     description: Retrieve a list of all product brands.
 *     tags:
 *       - BRAND SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the list of product brands.
 */
/**
 * @swagger
 * /api/product-brand/{productBrandId}:
 *   get:
 *     summary: Get a product brand by ID
 *     description: Retrieve a product brand based on its ID.
 *     tags:
 *       - BRAND SECTION
 *     parameters:
 *       - in: path
 *         name: productBrandId
 *         required: true
 *         description: The ID of the product brand to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 91dcfc85-5f39-44ae-9cea-535a9565d2e1
 *     responses:
 *       '200':
 *         description: A successful response with the details of the product brand.
 *         content:
 *           application/json:
 *             example:
 *               id: 91dcfc85-5f39-44ae-9cea-535a9565d2e1
 *               name: Sample Brand
 *       '404':
 *         description: The specified product brand ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Product brand not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
/**
 * @swagger
 * /api/product-brand:
 *   post:
 *     summary: Create a new product brand
 *     description: Create a new product brand with the specified name.
 *     tags:
 *       - BRAND SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_brand_name:
 *                 type: string
 *                 description: The name of the product brand.
 *                 example: Custom v1
 *             required:
 *               - product_brand_name
 *     responses:
 *       '201':
 *         description: A successful response indicating the brand has been created.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               product_brand_name: Custom
 *       '400':
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request, missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
/**
 * @swagger
 * /api/product-brand/{productBrandId}:
 *   put:
 *     summary: Update a product brand by ID
 *     description: Update a product brand based on its ID.
 *     tags:
 *       - BRAND SECTION
 *     parameters:
 *       - in: path
 *         name: productBrandId
 *         required: true
 *         description: The ID of the product brand to update.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 91dcfc85-5f39-44ae-9cea-535a9565d2e1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_brand_name:
 *                 type: string
 *                 description: The updated name of the product brand.
 *                 example: Custom V4
 *             required:
 *               - product_brand_name
 *     responses:
 *       '200':
 *         description: A successful response indicating the brand has been updated.
 *         content:
 *           application/json:
 *             example:
 *               id: 91dcfc85-5f39-44ae-9cea-535a9565d2e1
 *               product_brand_name: Custom v3
 *       '404':
 *         description: The specified product brand ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Product brand not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
/**
 * @swagger
 * /api/product-brand/{productBrandId}:
 *   delete:
 *     summary: Delete a product brand
 *     description: Delete a product brand by providing the productBrandId in the path.
 *     tags:
 *       - BRAND SECTION
 *     parameters:
 *       - in: path
 *         name: productBrandId
 *         required: true
 *         description: The ID of the product brand to delete.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 91dcfc85-5f39-44ae-9cea-535a9565d2e1
 *     responses:
 *       '204':
 *         description: No content, indicating successful deletion.
 *       '404':
 *         description: The specified product brand ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Product brand not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get('/api/product-brand', brandController.getAllBrand);
router.post('/api/product-brand', brandController.createBrand);
router.get('/api/product-brand/:productBrandId', brandController.getBrand);
router.put('/api/product-brand/:productBrandId', brandController.updateBrand);
router.delete(
  '/api/product-brand/:productBrandId',
  brandController.deleteBrand,
);

export default router;
