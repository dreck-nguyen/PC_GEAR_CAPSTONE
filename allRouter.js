import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as productController from './APP/Controller/ProductController.js';
import * as categoryController from './APP/Controller/CategoryController.js';
import * as userController from './APP/Controller/UserController.js';
import * as cartController from './APP/Controller/CartController.js';
import * as brandController from './APP/Controller/BrandController.js';
import * as cartItemController from './APP/Controller/CartItemController.js';
import * as orderController from './APP/Controller/OrderController.js';
import * as paymentController from './APP/Controller/PaymentController.js';
import * as orderStatusController from './APP/Controller/OrderStatusController.js';
import * as shippingAddressController from './APP/Controller/ShippingAddressController.js';
import * as pcBuilderController from './APP/Controller/PcBuilderController.js';
const router = express.Router();
// PC BUILD SECTION

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
 * /api/auth/admin/list/user:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users for administration purposes.
 *     security:
 *       -  BearerAuth: []
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
 * /api/auth/admin/cart:
 *   get:
 *     summary: Get users' cart details (admin)
 *     description: Retrieve details of users' carts. This endpoint is for administrators.
 *     security:
 *       -  BearerAuth: []
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
/**
 * @swagger
 * /api/auth/admin/order:
 *   get:
 *     summary: Get Users Order
 *     description: Retrieve information about users' orders.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - ADMIN SECTION
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Order'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/payment:
 *   get:
 *     summary: Get payment details (admin)
 *     description: Retrieve details of payments
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - PAYMENT SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the details of payments.
 *         content:
 *           application/json:
 *             example:
 *               payments:
 *                 - payment_id: "6c9f6c1a-9c4b-4716-943b-8dbb3934952b"
 *                   amount: 500.00
 *                   payment_date: "2024-02-26T14:38:35.338589+00:00"
 *                 - payment_id: "9b0a18c5-9c4b-4716-943b-8dbb3934952b"
 *                   amount: 800.00
 *                   payment_date: "2024-02-26T14:40:22.123456+00:00"
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
/**
 * @swagger
 * /api/auth/admin/order-status:
 *   get:
 *     summary: Get order status details (admin)
 *     description: Retrieve details of order statuses. This endpoint is for administrators.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - ADMIN SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the details of order statuses.
 *         content:
 *           application/json:
 *             example:
 *               orderStatuses:
 *                 - status_id: "dc097dbd-2a67-4172-becb-cea00040a661"
 *                   status_name: "Pending"
 *                   description: "The order is pending and has not been processed yet."
 *                 - status_id: "a1b2c3d4-5678-90ab-cdef01234567"
 *                   status_name: "Shipped"
 *                   description: "The order has been shipped and is on its way to the customer."
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
/**
 * @swagger
 * /api/auth/admin/payment:
 *   get:
 *     summary: Get payment details (admin)
 *     description: Retrieve details of payments. This endpoint is for administrators.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - ADMIN SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the details of payments.
 *         content:
 *           application/json:
 *             example:
 *               payments:
 *                 - payment_id: "6c9f6c1a-9c4b-4716-943b-8dbb3934952b"
 *                   amount: 500.00
 *                   payment_date: "2024-02-26T14:38:35.338589+00:00"
 *                 - payment_id: "9b0a18c5-9c4b-4716-943b-8dbb3934952b"
 *                   amount: 800.00
 *                   payment_date: "2024-02-26T14:40:22.123456+00:00"
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
/**
 * @swagger
 * /api/auth/admin/dashboard:
 *   get:
 *     summary: Get Dashboard
 *     description: Retrieve information for dashboard
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - ADMIN SECTION
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/auth/admin/create-staff:
 *   post:
 *     summary: Create staff member (Admin)
 *     description: Create a new staff member account by an admin user.
 *     tags:
 *       - ADMIN SECTION
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The username of the new staff member.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the new staff member.
 *                 example: pass123
 *     responses:
 *       200:
 *         description: Successfully created staff member.
 *       401:
 *         description: Unauthorized, admin not authenticated.
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/admin/login', admController.loginAdmin);
router.get('/api/auth/admin/list/user', admController.getUsers);
router.get('/api/auth/admin/cart', cartController.getUsersCart);
router.get('/api/auth/admin/order', orderController.getUsersOrder);
router.get('/api/auth/admin/payment', paymentController.getPayment);
router.get('/api/payment', paymentController.getPayment);
router.get(
  '/api/auth/admin/order-status',
  orderStatusController.getOrderStatus,
);
router.get('/api/auth/admin/dashboard', orderStatusController.getDashboard);
router.post('/api/auth/admin/create-staff', admController.registerStaff);

// PRODUCT SECTION
/**
 * @swagger
 * tags:
 *   - name: PRODUCT SECTION
 *     description: Operations related to categories
 *
 * @swagger
 * /api/paginate/product:
 *   get:
 *     summary: Get paging all products
 *     description: Retrieve a list of all products.
 *     tags:
 *       - PRODUCT SECTION
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset for pagination
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
 * /api/category/product/{categoryId}:
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
 * /api/auth/staff/product:
 *   post:
 *     summary: Create a new product
 *     security:
 *       -  BearerAuth: []
 *     description: Creates a new product with the provided data.
 *     tags:
 *       - PRODUCT SECTION
 *     requestBody:
 *       description: Product data to create
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *                 example: e54b04fc-f95d-410f-8097-fb7a0d6abae9
 *               name:
 *                 type: string
 *                 example: Monitor
 *               description:
 *                 type: string
 *                 example: Product description
 *               unit_price:
 *                 type: number
 *                 example: 1999
 *               discount:
 *                 type: number
 *                 example: 0
 *               quantity:
 *                 type: integer
 *                 example: 15
 *               product_brand_id:
 *                 type: string
 *                 example: 91dcfc85-5f39-44ae-9cea-535a9565d2ec
 *               image_link:
 *                 type: string
 *                 example: x.com
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
/**
 * @swagger
 * /api/auth/staff/product/{productId}:
 *   post:
 *     summary: Upload product data with an image
 *     security:
 *       -  BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     tags:
 *       - PRODUCT SECTION
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product data uploaded successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     summary: Get product by ID
 *     security:
 *       -  BearerAuth: []
 *     description: Retrieve product information by providing a product ID.
 *     tags:
 *       - PRODUCT SECTION
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to be retrieved
 *         schema:
 *           type: string
 *           example: 6313edd7-5ad3-4014-930b-eb6e638be805
 *     responses:
 *       200:
 *         description: Successful response with the product information
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /api/auth/staff/product/:
 *   delete:
 *     summary: Delete products by IDs
 *     tags:
 *       - PRODUCT SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "2145a7dc-178f-4e81-8bec-97dd82804e34"
 *                   - "2145a7dc-178f-4e81-8bec-97dd82804e32"
 *                   - "2145a7dc-178f-4e81-8bec-97dd82804e33"
 *     responses:
 *       '204':
 *         description: Products successfully deleted
 *       '404':
 *         description: Products not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/auth/staff/product/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - PRODUCT SECTION
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *         example: "458180ca-a0d9-4830-a3ce-90f7de22463e"
 *     responses:
 *       '204':
 *         description: Product successfully deleted
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/auth/staff/product/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - PRODUCT SECTION
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *         example: "12e157b3-7176-404f-904d-dff95f746fc0"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *                 description: ID of the product category
 *                 example: "12e157b3-7176-404f-904d-dff95f746fc0"
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Test2"
 *               description:
 *                 type: string
 *                 description: Description of the product
 *                 example: "Test Swagger"
 *               unit_price:
 *                 type: number
 *                 description: Unit price of the product
 *                 example: 160000.00
 *               discount:
 *                 type: number
 *                 description: Discount on the product
 *                 example: 0
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *                 example: 10
 *               sold:
 *                 type: integer
 *                 description: Number of sold units
 *                 example: 10
 *               product_brand_id:
 *                 type: string
 *                 description: ID of the product brand
 *                 example: "91dcfc85-5f39-44ae-9cea-535a9565d2e6"
 *     responses:
 *       '200':
 *         description: Product successfully updated
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: PRODUCT SECTION
 *     description: Operations related to products
 *
 * @swagger
 * /api/product/name:
 *   get:
 *     summary: Get products by name
 *     description: Retrieve products by name.
 *     tags:
 *       - PRODUCT SECTION
 *     parameters:
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the product to search for
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
router.get('/api/product', productController.getAllProduct);
router.get('/api/paginate/product', productController.getPaginateProduct);
router.get('/api/product/name', productController.getProductByName);
router.get('/api/product/:productId', productController.getProductById);
router.put(
  '/api/auth/staff/product/:productId',
  productController.updateProductById,
);
router.post('/api/auth/staff/product', productController.createProduct);
router.get(
  '/api/category/product/:categoryId',
  productController.getProductsByCategory,
);
// router.post(
//   '/api/auth/staff/product/image/:productId',
//   uploadCloud.single('image'),
//   productController.createProductImage,
// );
router.delete('/api/auth/staff/product/', productController.deleteProductsById);
router.delete(
  '/api/auth/staff/product/:productId',
  productController.deleteProductById,
);

//
/**
 * @swagger
 * /api/pc-component/processor:
 *   post:
 *     summary: Get processor information
 *     description: Retrieve information about processors for PC builds.
 *     tags:
 *       - PC Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PCComponentRequestBody'
 *     responses:
 *       200:
 *         description: Successful response with processor information
 *       404:
 *         description: Processor information not found
 *
 * /api/pc-component/motherboard:
 *   post:
 *     summary: Get motherboard information
 *     description: Retrieve information about motherboards for PC builds.
 *     tags:
 *       - PC Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PCComponentRequestBody'
 *     responses:
 *       200:
 *         description: Successful response with motherboard information
 *       404:
 *         description: Motherboard information not found
 *
 * /api/pc-component/case:
 *   post:
 *     summary: Get case information
 *     description: Retrieve information about cases for PC builds.
 *     tags:
 *       - PC Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PCComponentRequestBody'
 *     responses:
 *       200:
 *         description: Successful response with case information
 *       404:
 *         description: Case information not found
 *
 * /api/pc-component/graphics-card:
 *   post:
 *     summary: Get graphics card information
 *     description: Retrieve information about graphics cards for PC builds.
 *     tags:
 *       - PC Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PCComponentRequestBody'
 *     responses:
 *       200:
 *         description: Successful response with graphics card information
 *       404:
 *         description: Graphics card information not found
 *
 * /api/pc-component/ram:
 *   post:
 *     summary: Get RAM information
 *     description: Retrieve information about RAM for PC builds.
 *     tags:
 *       - PC Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PCComponentRequestBody'
 *     responses:
 *       200:
 *         description: Successful response with RAM information
 *       404:
 *         description: RAM information not found
 *
 * /api/pc-component/storage:
 *   post:
 *     summary: Get storage information
 *     description: Retrieve information about storage for PC builds.
 *     tags:
 *       - PC Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PCComponentRequestBody'
 *     responses:
 *       200:
 *         description: Successful response with storage information
 *       404:
 *         description: Storage information not found
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PCComponentRequestBody:
 *       type: object
 *       properties:
 *         motherboardDetail:
 *           type: object
 *           properties:
 *             chipset:
 *               type: string
 *               description: The chipset of the motherboard.
 *               example: AMD
 *             memory_supports:
 *               type: string
 *               description: The memory support of the motherboard.
 *               example: "DDR4 2133, 2400, 2666, 2800, 3733, 3800, 4133, 4266, 4333, 4400, 4600, 4733 MHz"
 *             motherboard_id:
 *               type: string
 *               description: The ID of the motherboard.
 *               example: "5444e504-0569-4cae-8306-8a48daefb5d1"
 *         caseDetails:
 *           type: object
 *           properties:
 *             gpu_length:
 *               type: string
 *               description: The GPU length supported by the case.
 *               example: "365 mm / 14.37\""
 *             case_id:
 *               type: string
 *               description: The ID of the computer case.
 *               example: "4eb3a010-ae8c-4235-b47a-3ec4dfdd66bf"
 *         gpuDetail:
 *           type: object
 *           properties:
 *             length:
 *               type: number
 *               description: The length of the graphics card.
 *               example: 358
 *             gpu_id:
 *               type: string
 *               description: The ID of the gpu.
 *               example: "6313edd7-5ad3-4014-930b-eb6e638be819"
 *         processorDetails:
 *           type: object
 *           properties:
 *             chipset:
 *               type: string
 *               description: The chipset of the processor.
 *               example: AMD
 *             processor_id:
 *               type: string
 *               description: The ID of the processor.
 *               example: "6313edd7-5ad3-4014-930b-eb6e638be806"
 *         storageDetail:
 *           type: object
 *           properties:
 *             interface:
 *               type: string
 *               description: The interface of the storage.
 *               example: SATA III
 *             storage_id:
 *               type: string
 *               description: The ID of the storage.
 *               example: "386533d3-c19c-46bb-9cd1-cbcc2ac7f611"
 *         ramDetails:
 *           type: object
 *           properties:
 *             ram_type:
 *               type: string
 *               description: The type of RAM.
 *               example: DDR4-2133 MHz
 *             ram_id:
 *               type: string
 *               description: The ID of the RAM.
 *               example: "b1db9bd8-cc18-455e-b485-d7f5993709f3"
 *         processor_brand_id:
 *           type: string
 *           example: "695d5492-7577-48d8-8742-7aa07681476e"
 *         motherboard_brand_id:
 *           type: string
 *           example: "695d5492-7577-48d8-8742-7aa07681476e"
 *         case_brand_id:
 *           type: string
 *           example: "695d5492-7577-48d8-8742-7aa07681476e"
 *         gpu_brand_id:
 *           type: string
 *           example: "695d5492-7577-48d8-8742-7aa07681476e"
 *         ram_brand_id:
 *           type: string
 *           example: "695d5492-7577-48d8-8742-7aa07681476e"
 *         storage_brand_id:
 *           type: string
 *           example: "695d5492-7577-48d8-8742-7aa07681476e"
 *         purpose:
 *           type: string
 *           description: The purpose of this component GAMING OR OFFICE.
 *           example: GAMING || OFFICE || null
 *         price_range:
 *           type: integer
 *           description: The limit range of budget.
 *           example: 100000000
 */
router.post('/api/pc-component/processor', productController.getProcessor);
router.post('/api/pc-component/motherboard', productController.getMotherboard);
router.post('/api/pc-component/case', productController.getCase);
router.post(
  '/api/pc-component/graphics-card',
  productController.getGraphicsCard,
);
router.post('/api/pc-component/ram', productController.getRam);
router.post('/api/pc-component/storage', productController.getStorage);
// router.post('/api/pc-component/auto-gen', productController.getAutoGen);
// router.post(
//   '/api/pc-component/random/auto-gen',
//   productController.getRandomOne,
// );

//
/**
 * @swagger
 * /api/pc-component/processor/{processor_id}:
 *   get:
 *     summary: Get processor by ID
 *     description: Retrieve information about a processor by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: processor_id
 *         required: true
 *         description: ID of the processor to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with processor information
 *       404:
 *         description: Processor with the specified ID not found
 *
 * /api/pc-component/motherboard/{motherboard_id}:
 *   get:
 *     summary: Get motherboard by ID
 *     description: Retrieve information about a motherboard by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: motherboard_id
 *         required: true
 *         description: ID of the motherboard to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with motherboard information
 *       404:
 *         description: Motherboard with the specified ID not found
 *
 * /api/pc-component/case/{case_id}:
 *   get:
 *     summary: Get case by ID
 *     description: Retrieve information about a case by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: case_id
 *         required: true
 *         description: ID of the case to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with case information
 *       404:
 *         description: Case with the specified ID not found
 *
 */
/**
 * @swagger
 * /api/pc-component/graphics-card/{gpu_id}:
 *   get:
 *     summary: Get graphics card by ID
 *     description: Retrieve information about a graphics card by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: gpu_id
 *         required: true
 *         description: ID of the graphics card to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with graphics card information
 *       404:
 *         description: Graphics card with the specified ID not found
 */

/**
 * @swagger
 * /api/pc-component/ram/{ram_id}:
 *   get:
 *     summary: Get RAM by ID
 *     description: Retrieve information about RAM by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: ram_id
 *         required: true
 *         description: ID of the RAM to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with RAM information
 *       404:
 *         description: RAM with the specified ID not found
 */

/**
 * @swagger
 * /api/pc-component/storage/{storage_id}:
 *   get:
 *     summary: Get storage by ID
 *     description: Retrieve information about a storage device by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: storage_id
 *         required: true
 *         description: ID of the storage device to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with storage information
 *       404:
 *         description: Storage device with the specified ID not found
 */

/**
 * @swagger
 * /api/pc-component/auto-gen/{auto_gen_id}:
 *   get:
 *     summary: Get auto-generated component by ID
 *     description: Retrieve information about an auto-generated component by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: auto_gen_id
 *         required: true
 *         description: ID of the auto-generated component to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with auto-generated component information
 *       404:
 *         description: Auto-generated component with the specified ID not found
 */
/**
 * @swagger
 * /api/pc-component/case-cooler/{case_cooler_id}:
 *   get:
 *     summary: Get case cooler by ID
 *     description: Retrieve information about a case cooler by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: case_cooler_id
 *         required: true
 *         description: ID of the case cooler to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with case cooler information
 *       404:
 *         description: Case cooler with the specified ID not found
 */

/**
 * @swagger
 * /api/pc-component/cpu-cooler/{cpu_cooler_id}:
 *   get:
 *     summary: Get CPU cooler by ID
 *     description: Retrieve information about a CPU cooler by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: cpu_cooler_id
 *         required: true
 *         description: ID of the CPU cooler to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with CPU cooler information
 *       404:
 *         description: CPU cooler with the specified ID not found
 */

/**
 * @swagger
 * /api/pc-component/psu/{psu_id}:
 *   get:
 *     summary: Get power supply unit by ID
 *     description: Retrieve information about a power supply unit by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: psu_id
 *         required: true
 *         description: ID of the power supply unit to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with power supply unit information
 *       404:
 *         description: Power supply unit with the specified ID not found
 */

/**
 * @swagger
 * /api/pc-component/monitor/{monitor_id}:
 *   get:
 *     summary: Get monitor by ID
 *     description: Retrieve information about a monitor by its ID.
 *     tags:
 *       - PC Component
 *     parameters:
 *       - in: path
 *         name: monitor_id
 *         required: true
 *         description: ID of the monitor to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with monitor information
 *       404:
 *         description: Monitor with the specified ID not found
 */
router.get(
  '/api/pc-component/processor/:processor_id',
  productController.getProcessorById,
);
router.get(
  '/api/pc-component/motherboard/:motherboard_id',
  productController.getMotherboardById,
);
router.get('/api/pc-component/case/:case_id', productController.getCaseById);
router.get(
  '/api/pc-component/graphics-card/:gpu_id',
  productController.getGraphicsCardById,
);
router.get('/api/pc-component/ram/:ram_id', productController.getRamById);
router.get(
  '/api/pc-component/storage/:storage_id',
  productController.getStorageById,
);
router.get(
  '/api/pc-component/auto-gen/:auto_gen_id',
  productController.getAutoGenById,
);
router.get(
  '/api/pc-component/case-cooler/:case_cooler_id',
  productController.getCaseCoolerById,
);
router.get(
  '/api/pc-component/cpu-cooler/:cpu_cooler_id',
  productController.getCpuCoolerById,
);
router.get(
  '/api/pc-component/psu/:psu_id',
  productController.getPowerSupplyById,
);
router.get(
  '/api/pc-component/monitor/:monitor_id',
  productController.getMonitorById,
);
//
/**
 * @swagger
 * /api/pc-component/processor/{processorId}:
 *   post:
 *     summary: Update processor specification
 *     description: Update the specification of a processor component.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: processorId
 *         required: true
 *         description: ID of the processor component to update.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 6313edd7-5ad3-4014-930b-eb6e638be999
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 description: Type of the product specification.
 *               brand:
 *                 type: string
 *                 description: Brand of the processor.
 *               model:
 *                 type: string
 *                 description: Model of the processor.
 *               socket:
 *                 type: string
 *                 description: Socket type of the processor.
 *               micro_architecture:
 *                 type: string
 *                 description: Microarchitecture of the processor.
 *               core_quantity:
 *                 type: integer
 *                 description: Number of cores in the processor.
 *               threads_quantity:
 *                 type: integer
 *                 description: Number of threads in the processor.
 *               clock_speed:
 *                 type: string
 *                 description: Base clock speed of the processor.
 *               boost_speed_max:
 *                 type: string
 *                 description: Maximum boost clock speed of the processor.
 *               cache:
 *                 type: integer
 *                 description: Cache size of the processor in MB.
 *               memory_support:
 *                 type: string
 *                 description: Memory support specification for the processor.
 *               channel_architecture:
 *                 type: string
 *                 description: Memory channel architecture for the processor.
 *               power:
 *                 type: integer
 *                 description: Power consumption of the processor in watts.
 *               chipset:
 *                 type: string
 *                 description: Chipset compatibility of the processor.
 *           example:
 *             product_specification_type: PROCESSOR
 *             brand: Intel
 *             model: Intel Core i3-14100
 *             socket: LGA 1700
 *             micro_architecture: Raptor Lake Refresh
 *             core_quantity: 4
 *             threads_quantity: 8
 *             clock_speed: 3.50 GHz
 *             boost_speed_max: 4.00 GHz
 *             cache: 12
 *             memory_support: DDR4 - 3200 MHz
 *             channel_architecture: Dual Channel
 *             power: 120
 *             chipset: Intel
 *     responses:
 *       '200':
 *         description: A successful response indicating the processor specification has been updated.
 *         content:
 *           application/json:
 *             example:
 *               message: Processor specification updated successfully.
 *       '400':
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request, missing or invalid parameters.
 *       '401':
 *         description: Unauthorized, missing or invalid authorization token.
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, missing or invalid authorization token.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error.
 */
/**
 * @swagger
 * /api/pc-component/motherboard/{motherboardId}:
 *   post:
 *     summary: Update motherboard specification by ID
 *     description: Update the motherboard specification with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: motherboardId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 5444e504-0569-4cae-8306-8a48daefb999
 *         description: ID of the motherboard to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 description: Type of product specification (e.g., MOTHERBOARD)
 *               chipset:
 *                 type: string
 *                 description: Chipset of the motherboard
 *               spu_socket:
 *                 type: string
 *                 description: Socket type of the motherboard
 *               usb_details:
 *                 type: string
 *                 description: USB details of the motherboard
 *               audio:
 *                 type: string
 *                 description: Audio details of the motherboard
 *               ethernet_controller:
 *                 type: string
 *                 description: Ethernet controller details of the motherboard
 *               wifi_antenna:
 *                 type: string
 *                 description: WiFi antenna details of the motherboard
 *               memory_slots:
 *                 type: string
 *                 description: Number of memory slots of the motherboard
 *               memory_supports:
 *                 type: string
 *                 description: Memory support details of the motherboard
 *               maximum_capacity:
 *                 type: string
 *                 description: Maximum memory capacity supported by the motherboard
 *               channel_architecture:
 *                 type: string
 *                 description: Channel architecture of the motherboard
 *               sata:
 *                 type: string
 *                 description: SATA details of the motherboard
 *               m2:
 *                 type: string
 *                 description: M.2 details of the motherboard
 *               raid_support:
 *                 type: string
 *                 description: RAID support details of the motherboard
 *               expansion_slots:
 *                 type: string
 *                 description: Expansion slot details of the motherboard
 *               air_cooling:
 *                 type: string
 *                 description: Air cooling details of the motherboard
 *               power_connectors:
 *                 type: string
 *                 description: Power connector details of the motherboard
 *               audio_internal:
 *                 type: string
 *                 description: Internal audio details of the motherboard
 *               rom:
 *                 type: string
 *                 description: ROM details of the motherboard
 *               audio_codec:
 *                 type: string
 *                 description: Audio codec details of the motherboard
 *               bluetooth:
 *                 type: string
 *                 description: Bluetooth version of the motherboard
 *               wifi:
 *                 type: string
 *                 description: WiFi version of the motherboard
 *               form_factor:
 *                 type: string
 *                 description: Form factor of the motherboard
 *               brand:
 *                 type: string
 *                 description: Brand of the motherboard
 *           example:
 *             product_specification_type: "MOTHERBOARD"
 *             chipset: "TEST MOTHER BOARD"
 *             spu_socket: "TRX4"
 *             usb_details: "1 x USB 3.2 Gen 2x2 Type-C,6 x USB 3.1 / USB 3.2 Gen 2 Type-A,1 x USB 3.1 / USB 3.2 Gen 2 Type-C,4 x USB 3.1 / USB 3.2 Gen 1 Type-A"
 *             audio: "1 x S/PDIF,5 x 3.5 mm"
 *             ethernet_controller: "1 x Intel® 10GbE LAN chip (10 Gbit/5 Gbit/2.5 Gbit/1 Gbit/100 Mbit), supporting 2 RJ-45 ports"
 *             wifi_antenna: "2 x Connector"
 *             memory_slots: "8"
 *             memory_supports: "DDR4 2133, 2400, 2666, 2933, 3200 MHz"
 *             maximum_capacity: "256 GB"
 *             channel_architecture: "Quad Channel"
 *             sata: "4 x SATA III"
 *             m2: "1 x PCIe 3.0 x4"
 *             raid_support: "RAID 0, 1, 10"
 *             expansion_slots: "2 x PCIe 4.0 x16"
 *             air_cooling: "2 x 4-Pin CPU,2 x 4-Pin System,1 x 2-Pin W_IN,1 x 2-Pin W_OUT,1 x 3-Pin W_FLOW"
 *             power_connectors: "1 x 6-Pin ATX,1 x 24-Pin Mainboard,2 x 8-Pin ATX,1 x 4-Pin Molex"
 *             audio_internal: "1 x Speaker"
 *             rom: "2 x 128 Mb"
 *             audio_codec: "Realtek® ALC4050H codec+Realtek® ALC1220-VB codec"
 *             bluetooth: "5.00"
 *             wifi: "Intel® Wi-Fi 6 AX200"
 *             form_factor: "ATX"
 *             brand: "GIGABYTE"
 *     responses:
 *       '200':
 *         description: A successful response indicating the motherboard specification has been updated.
 *         content:
 *           application/json:
 *             example:
 *               message: Motherboard specification updated successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request, missing or invalid parameters.
 *       '401':
 *         description: Unauthorized, user not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, user not authenticated.
 *       '404':
 *         description: Motherboard specification not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Motherboard specification not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/case/{caseId}:
 *   post:
 *     summary: Update case specification by ID
 *     description: Update the case specification with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 24d408df-c423-4545-bdf0-41445adeb999
 *         description: ID of the case to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 description: Type of product specification (e.g., CASE)
 *               brand:
 *                 type: string
 *                 description: Brand of the case
 *               cabinet_type:
 *                 type: string
 *                 description: Type of cabinet
 *               side_panel_type:
 *                 type: string
 *                 description: Type of side panel
 *               color:
 *                 type: string
 *                 description: Color of the case
 *               motherboard_supports:
 *                 type: string
 *                 description: Motherboard support details
 *               internal_drive_size:
 *                 type: string
 *                 description: Internal drive size details
 *               gpu_length:
 *                 type: string
 *                 description: Maximum GPU length supported
 *               support_psu_size:
 *                 type: string
 *                 description: Supported PSU size
 *               front_panel:
 *                 type: string
 *                 description: Front panel details
 *               cpu_cooler_support_size:
 *                 type: string
 *                 description: CPU cooler support size
 *             example:
 *               product_specification_type: "TESST CASSE V@"
 *               brand: "Thermaltake CSAS"
 *               cabinet_type: "Full Tower"
 *               side_panel_type: "Tempered Glass"
 *               color: "BLACK"
 *               motherboard_supports: "E-ATX, ATX, Micro ATX, Mini ITX"
 *               internal_drive_size: "2 x 3.5\", 2 x 2.5\""
 *               gpu_length: "440 mm"
 *               support_psu_size: "ATX"
 *               front_panel: "1 x USB 3.2 Gen 1 Type-A"
 *               cpu_cooler_support_size: "175 mm"
 *     responses:
 *       '200':
 *         description: Case specification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '400':
 *         description: Bad request, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '401':
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: Case specification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
/**
 * @swagger
 * /api/pc-component/graphics-card/{gpu_id}:
 *   post:
 *     summary: Update graphics card specification by ID
 *     description: Update the graphics card specification with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: gpu_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 6313edd7-5ad3-4014-930b-eb6e638b9999
 *         description: ID of the graphics card to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 enum: [GRAPHICS_CARD]
 *                 example: GRAPHICS_CARD
 *               brand:
 *                 type: string
 *                 example: MSI
 *               chipset:
 *                 type: string
 *                 example: GeForce RTX 3050
 *               memory:
 *                 type: string
 *                 example: 8 GB (GDDR6)
 *               benchmark:
 *                 type: string
 *                 example: 39647.00
 *               max_power_consumption:
 *                 type: integer
 *                 example: 252
 *               base_clock_speed:
 *                 type: integer
 *                 example: 1552
 *               length:
 *                 type: string
 *                 example: 213.00
 *               cooler_type:
 *                 type: string
 *                 example: 2 x Fan
 *               interface_type:
 *                 type: string
 *                 example: PCIe 4.0 x 10
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/pc-component/ram/{ram_id}:
 *   post:
 *     summary: Update RAM information by ID
 *     description: Update RAM information with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: ram_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 252d452b-5b6d-4a87-9213-b43f6cac9999
 *         description: ID of the RAM to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 enum: [RAM]
 *                 example: RAM
 *               brand:
 *                 type: string
 *                 example: TEAMGROUP
 *               warranty:
 *                 type: string
 *                 example: 3.00
 *               memory:
 *                 type: string
 *                 example: 32 GB (1 x 32 GB)
 *               ram_type:
 *                 type: string
 *                 example: DDR4-3200 MHz
 *               cas_latency:
 *                 type: string
 *                 example: CL16
 *               dimm_type:
 *                 type: string
 *                 example: 260-PIN
 *               voltage:
 *                 type: string
 *                 example: 1.5
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/pc-component/storage/{storage_id}:
 *   post:
 *     summary: Update Storage information by ID
 *     description: Update Storage information with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: storage_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 252d452b-5b6d-4a87-9213-b43f6cac9999
 *         description: ID of the storage to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 enum: [STORAGE]
 *                 example: STORAGE
 *               brand:
 *                 type: string
 *                 example: Samsung
 *               model:
 *                 type: string
 *                 example: EVO 970
 *               type:
 *                 type: string
 *                 example: SSD
 *               interface_type:
 *                 type: string
 *                 example: PCIe 3.0 x4
 *               form_factor:
 *                 type: string
 *                 example: M.2-2280
 *               capacity:
 *                 type: string
 *                 example: 1 TB
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/pc-component/case-cooler/{case_cooler_id}:
 *   post:
 *     summary: Update Case Cooler information by ID
 *     description: Update Case Cooler information with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: case_cooler_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: c892e071-3a9e-4344-bdb4-b5faac099999
 *         description: ID of the case cooler to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 enum: [CASE_COOLER]
 *                 example: CASE_COOLER
 *               brand:
 *                 type: string
 *                 example: ARCTIC
 *               model:
 *                 type: string
 *                 example: P12 PST
 *               airflow:
 *                 type: string
 *                 example: 56.30
 *               fan_rpm:
 *                 type: integer
 *                 example: 1800
 *               size:
 *                 type: string
 *                 example: 1203.00
 *               color:
 *                 type: string
 *                 example: Black
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/pc-component/psu/{psu_id}:
 *   post:
 *     summary: Update PSU Information by ID
 *     description: Update PSU information with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: psu_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 71e81089-08a0-4fd9-a7d3-a05d4e989999
 *         description: ID of the PSU to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 example: TEST PSU V2
 *               brand:
 *                 type: string
 *                 example: Thermaltake
 *               model:
 *                 type: string
 *                 example: Toughpower PF1
 *               form_factor:
 *                 type: string
 *                 example: ATX
 *               power:
 *                 type: integer
 *                 example: 850
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/pc-component/monitor/{monitor_id}:
 *   post:
 *     summary: Update Monitor Information by ID
 *     description: Update Monitor information with the specified ID.
 *     tags:
 *       - PC COMPONENT SECTION
 *     parameters:
 *       - in: path
 *         name: monitor_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 136f2f7f-2bf5-463a-8839-bc1135b9c999
 *         description: ID of the monitor to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_specification_type:
 *                 type: string
 *                 example: TESST MONITOR SPEC
 *               brand:
 *                 type: string
 *                 example: DELL
 *               model:
 *                 type: string
 *                 example: SE2719H
 *               screen_size:
 *                 type: string
 *                 example: 27.00
 *               resolution:
 *                 type: string
 *                 example: 1920 x 1080
 *               response_time:
 *                 type: string
 *                 example: 5.00
 *               aspect_ratio:
 *                 type: string
 *                 example: 16:9
 *               refresh_rate:
 *                 type: string
 *                 example: 60.00
 *               panel_type:
 *                 type: string
 *                 example: IPS
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  '/api/pc-component/processor/:processor_id',
  productController.upsertProcessorSpec,
);
router.post(
  '/api/pc-component/motherboard/:motherboard_id',
  productController.upsertMotherboard,
);
router.post('/api/pc-component/case/:case_id', productController.upsertCase);
router.post(
  '/api/pc-component/graphics-card/:gpu_id',
  productController.upsertGraphicsCard,
);
router.post('/api/pc-component/ram/:ram_id', productController.upsertRam);
router.post(
  '/api/pc-component/storage/:storage_id',
  productController.upsertStorage,
);
router.post(
  '/api/pc-component/case-cooler/:case_cooler_id',
  productController.upsertCaseCooler,
);
router.post(
  '/api/pc-component/cpu-cooler/:cpu_cooler_id',
  productController.upsertCpuCooler,
);
router.post('/api/pc-component/psu/:psu_id', productController.upsertPsu);
router.post(
  '/api/pc-component/monitor/:monitor_id',
  productController.upsertMonitor,
);
//
/**
 * @swagger
 * /api/pc-component/case-cooler:
 *   get:
 *     summary: Get case cooler information
 *     description: Retrieve information about case coolers for PC builds.
 *     tags:
 *       - PC Component
 *     responses:
 *       200:
 *         description: Successful response with case cooler information
 *       404:
 *         description: Case cooler information not found
 */
/**
 * @swagger
 * /api/pc-component/cpu-cooler:
 *   get:
 *     summary: Get CPU cooler information
 *     description: Retrieve information about CPU coolers for PC Components.
 *     tags:
 *       - PC Component
 *     responses:
 *       200:
 *         description: Successful response with CPU cooler information
 *       404:
 *         description: CPU cooler information not found
 */
/**
 * @swagger
 * /api/pc-component/psu:
 *   get:
 *     summary: Get power supply unit (PSU) information
 *     description: Retrieve information about power supply units (PSUs) for PC Components.
 *     tags:
 *       - PC Component
 *     responses:
 *       200:
 *         description: Successful response with power supply unit information
 *       404:
 *         description: Power supply unit information not found
 */
/**
 * @swagger
 * /api/pc-component/monitor:
 *   get:
 *     summary: Get monitor information
 *     description: Retrieve information about monitors for PC Components.
 *     tags:
 *       - PC Component
 *     responses:
 *       200:
 *         description: Successful response with monitor information
 *       404:
 *         description: Monitor information not found
 */

router.get('/api/pc-component/case-cooler', productController.getCaseCooler);
router.get('/api/pc-component/cpu-cooler', productController.getCpuCooler);
router.get('/api/pc-component/psu', productController.getPowerSupply);
router.get('/api/pc-component/monitor', productController.getMonitor);

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
/**
 * @swagger
 * /api/category/{categoryId}:
 *   put:
 *     summary: update a new category
 *     description: updates a new category with the provided data.
 *     tags:
 *       - CATEGORY SECTION
 *     requestBody:
 *       description: Category data to update
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
 *         description: Successfully update a new category
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
/**
 * @swagger
 * tags:
 *   - name: CATEGORY SECTION
 *     description: Operations related to categories
 *
 * /api/category/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a category by its ID.
 *     tags:
 *       - CATEGORY SECTION
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               parent_id: 1
 *               name: Example Category
 *               status: active
 *               description: This is an example category
 *               image: http://example.com/image.jpg
 *               category_id: 123
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: CATEGORY SECTION
 *     description: Operations related to categories
 *
 * /api/category/{categoryId}:
 *   delete:
 *     summary: delete a category by ID
 *     description: delete a category by its ID.
 *     tags:
 *       - CATEGORY SECTION
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               parent_id: 1
 *               name: Example Category
 *               status: active
 *               description: This is an example category
 *               image: http://example.com/image.jpg
 *               category_id: 123
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get('/api/category', categoryController.getCategoryBreadcrumb);
router.get('/api/category/:categoryId', categoryController.getCategory);
router.delete('/api/category/:categoryId', categoryController.deleteCategory);
router.put('/api/category/:categoryId', categoryController.updateCategory);
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
 * /api/auth/user/cart:
 *   get:
 *     summary: Get user's cart details
 *     description: Retrieve details of the user's cart.
 *     security:
 *       -  BearerAuth: []
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
 * /api/auth/user/cart:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new cart with the specified status and a list of products.
 *     security:
 *       -  BearerAuth: []
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
/**
 * @swagger
 * /api/auth/user/pc-component/personal-build:
 *   post:
 *     summary: Create Personal PC Build
 *     description: Endpoint to create a new personal PC build.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - USER SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_pc_build_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the personal PC build.
 *               profile_name:
 *                 type: string
 *                 description: The profile name of the personal PC build.
 *               motherboard_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the motherboard used in the personal PC build.
 *               processor_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the processor used in the personal PC build.
 *               cpu_cooler_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: The ID of the CPU cooler used in the personal PC build.
 *               case_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the case used in the personal PC build.
 *               gpu_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the GPU used in the personal PC build.
 *               ram_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the RAM used in the personal PC build.
 *               storage_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the storage used in the personal PC build.
 *               case_cooler_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: The ID of the case cooler used in the personal PC build.
 *               monitor_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: The ID of the monitor used in the personal PC build.
 *               psu_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: The ID of the psu used in the personal PC build.
 *               ram_quantity:
 *                 type: int
 *                 example: 1
 *                 description: The ID of the psu used in the personal PC build.
 *               storage_quantity:
 *                 type: int
 *                 example: 1
 *                 description: The ID of the psu used in the personal PC build.
 *     responses:
 *       200:
 *         description: Personal PC build created successfully.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       500:
 *         description: Internal server error. Failed to create personal PC build.
 */
/**
 * @swagger
 * /api/auth/user/pc-component/personal-build:
 *   get:
 *     summary: Get personal build PC components for the authenticated user
 *     description: Retrieve personal build PC components for the authenticated user.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - USER SECTION
 *     responses:
 *       200:
 *         description: Personal PC build created successfully.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       500:
 *         description: Internal server error. Failed to create personal PC build.
 */
/**
 * @swagger
 * /api/auth/user/pc-component/personal-build/{user_pc_build_id}:
 *   delete:
 *     summary: Delete a personal PC build
 *     description: Delete a personal PC build for the authenticated user.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - USER SECTION
 *     parameters:
 *       - in: path
 *         name: user_pc_build_id
 *         required: true
 *         description: ID of the personal PC build to delete
 *         example: 5f1fb3f3-45c3-4621-b65f-615fb6453135
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Successfully deleted the personal PC build
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Personal PC build deleted successfully
 *       '400':
 *         description: Bad request, invalid user_pc_build_id provided
 *       '404':
 *         description: Personal PC build not found
 *       '500':
 *         description: Internal server error
 */
router.post(
  '/api/auth/user/pc-build-cart',
  cartController.uploadCartPcComponent,
);
router.get('/api/auth/user/cart', cartController.getUserCart);
router.post('/api/auth/user/cart', cartController.createCart);
router.post(
  '/api/auth/user/pc-component/personal-build',
  userController.createPersonalBuildPc,
);
router.get(
  '/api/auth/user/pc-component/personal-build',
  userController.getPersonalBuildPc,
);
router.delete(
  '/api/auth/user/pc-component/personal-build/:user_pc_build_id',
  userController.deletePersonalBuildPc,
);
// CART ITEM SECTION
/**
 * @swagger
 * /api/cart-item/{cartItemId}:
 *   get:
 *     summary: Get cart item details by ID
 *     description: Retrieve details of a cart item by providing a cart item ID.
 *     tags:
 *       - CART ITEM SECTION
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to be retrieved
 *         schema:
 *           type: string
 *           example: 77b13154-9cc0-4543-9713-600ab21188ba
 *     responses:
 *       200:
 *         description: Successful response with the cart item details
 *       404:
 *         description: Cart item not found
 */
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
/**
 * @swagger
 * /api/auth/user/cart-item/{userPcBuildId}:
 *   post:
 *     summary: Create a cart item for a user's PC build
 *     description: |
 *       Creates a cart item for the specified user's PC build.
 *     tags:
 *       - CART ITEM SECTION
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userPcBuildId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart item.
 *         example: 6f2b63aa-ef58-4afb-b452-dd0ea22441c0
 *     responses:
 *       '200':
 *         description: Cart item created successfully.
 *       '401':
 *         description: Unauthorized. Invalid or missing token.
 *       '500':
 *         description: Internal Server Error.
 */
/**
 * @swagger
 * /api/cart-item/{cartItemId}:
 *   delete:
 *     summary: Delete a cart item
 *     tags:
 *       - CART ITEM SECTION
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Cart item deleted successfully
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Internal Server Error
 */

router.get(
  '/api/cart-item/:cartItemId',
  cartItemController.getCartItemDetailsByID,
);
router.put(
  '/api/cart-item/:cartItemId',
  cartItemController.updateCartItemQuantity,
);
router.delete('/api/cart-item/:cartItemId', cartItemController.deleteCartItem);
router.post(
  '/api/auth/user/cart-item/:userPcBuildId',
  cartItemController.createCartItemByUserPcBuild,
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

// ORDER SECTION
/**
 * @swagger
 * /api/auth/user/order:
 *   get:
 *     summary: Get Order by User ID
 *     description: Retrieve information about orders based on user ID.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - ORDER SECTION
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Number of items to return per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: offset
 *         description: Number of items to skip before starting to collect the result set.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Order'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/user/order:
 *   post:
 *     summary: Create a new order by user
 *     description: Create a new order with the specified details, including shipping fee, payment ID, and cart item list.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ORDER SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipping_fee:
 *                 type: number
 *                 description: Shipping fee for the order
 *               payment_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the payment method used
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the address user
 *               cartItemList:
 *                 type: array
 *                 description: List of items in the cart
 *                 items:
 *                   type: object
 *                   properties:
 *                     cart_item_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the cart item
 *             required:
 *               - shipping_fee
 *               - payment_id
 *               - cartItemList
 *               - address_id
 *     responses:
 *       '201':
 *         description: A successful response indicating the order has been created.
 *         content:
 *           application/json:
 *             example:
 *               order_id: 123
 *               status_id: dc097dbd-2a67-4172-becb-cea00040a661
 *               payment_id: 6c9f6c1a-9c4b-4716-943b-8dbb3934952b
 *               shipping_fee: "0.00"
 *               order_details:
 *                 - quantity: 5
 *                   product_id: 6313edd7-5ad3-4014-930b-eb6e638be817
 *                   unit_price: 34900000
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
 * /api/auth/user/order/{orderId}:
 *   get:
 *     summary: Get order details by ID
 *     description: Retrieve details of a specific order by providing the orderId in the path.
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - ORDER SECTION
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 0d5a8629-9aaf-4fe0-9b4b-7fd627d9177c
 *     responses:
 *       '200':
 *         description: A successful response with the details of the specified order.
 *         content:
 *           application/json:
 *             example:
 *               orderId: "0d5a8629-9aaf-4fe0-9b4b-7fd627d9177c"
 *               status_id: "b56803ff-b2cd-42e8-8171-d2459e92b58f"
 *               order_date: "2024-02-26T14:38:35.338589+00:00"
 *       '404':
 *         description: The specified order ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Order not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
/**
 * @swagger
 * /api/auth/user/order-status/{orderStatusId}:
 *   get:
 *     summary: Get order status by ID
 *     description: Retrieve the order status for the authenticated user based on the order status ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ORDER SECTION
 *     parameters:
 *       - in: path
 *         name: orderStatusId
 *         required: true
 *         description: The ID of the order status to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: b56803ff-b2cd-42e8-8171-d2459e92b58f
 *     responses:
 *       '200':
 *         description: A successful response with the details of the specified order status.
 *         content:
 *           application/json:
 *             example:
 *               orderStatusId: "b56803ff-b2cd-42e8-8171-d2459e92b58f"
 *               status: "Processing"
 *       '404':
 *         description: The specified order status ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Order status not found"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
/**
 * @swagger
 * /api/user/order-status:
 *   get:
 *     summary: Get order status for the authenticated user / staff/ admin
 *     description: Retrieve the order status for the authenticated user / staff/ admin
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ORDER SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the order status.
 *         content:
 *           application/json:
 *             example:
 *               status: "Shipped"
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
/**
 * @swagger
 * /api/user/order-status/{order_id}:
 *   put:
 *     summary: Update Order Status by ID
 *     description: Update the status of an order with the specified ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ORDER SECTION
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: da7dcd6d-4d7d-48c4-9111-ae6b0309c5d4
 *         description: ID of the order to update the status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_id:
 *                 type: string
 *                 format: uuid
 *                 example: b56803ff-b2cd-42e8-8171-d2459e92b58f
 *                 description: ID of the new status
 *     responses:
 *       '200':
 *         description: A successful response indicating the order status has been updated.
 *         content:
 *           application/json:
 *             example:
 *               orderId: "0d5a8629-9aaf-4fe0-9b4b-7fd627d9177c"
 *               status_id: "b56803ff-b2cd-42e8-8171-d2459e92b58f"
 *       '404':
 *         description: The specified order ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Order not found
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
router.get('/api/auth/user/order', orderController.getOrderByUserId);
router.post('/api/auth/user/order', orderController.createOrderByUser);
router.get('/api/auth/user/order/:orderId', orderController.getOrderById);
router.get('/api/user/order-status', orderController.getOrderStatus);
router.put(
  '/api/user/order-status/:orderId',
  orderController.updateOrderStatus,
);
router.get(
  '/api/auth/user/order-status/:orderStatusId',
  orderController.getOrderStatusByStatusId,
);
// SHIPPING ADDRESS
/**
 * @swagger
 * /api/auth/user/shipping-address:
 *   get:
 *     summary: Get user's shipping address
 *     description: Retrieve the shipping address for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - SHIPPING ADDRESS SECTION
 *     responses:
 *       '200':
 *         description: A successful response with the user's shipping address.
 *         content:
 *           application/json:
 *             example:
 *               street: "123 Main St"
 *               city: "Cityville"
 *               state: "State"
 *               zip: "12345"
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
/**
 * @swagger
 * /api/auth/user/shipping-address:
 *   post:
 *     summary: Create user's shipping address
 *     description: Create a new shipping address for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - SHIPPING ADDRESS SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient_name:
 *                 type: string
 *                 description: The name of the recipient.
 *                 example: "Jill valentine"
 *               street_address:
 *                 type: string
 *                 description: The street address of the shipping address.
 *                 example: "2 Cach Mang Thang 8"
 *               city:
 *                 type: string
 *                 description: The city of the shipping address.
 *                 example: "HCM"
 *               country:
 *                 type: string
 *                 description: The country of the shipping address.
 *                 example: "VN"
 *               district:
 *                 type: string
 *                 description: The recipient_phone address of the shipping address.
 *                 example: "Dist 2"
 *               ward:
 *                 type: string
 *                 description: The ward of the shipping address.
 *                 example: "Long Thanh MY"
 *               recipient_phone:
 *                 type: string
 *                 description: The recipient_phone of the shipping address.
 *                 example: "090000000"
 *             required:
 *               - recipient_name
 *               - street_address
 *               - city
 *               - country
 *               - district
 *               - ward
 *               - recipient_phone
 *     responses:
 *       '201':
 *         description: Successfully created. Returns the created shipping address.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               recipient_name: "Test"
 *               street_address: "2 Mai Chi Tho"
 *               city: "HCM"
 *               country: "VN"
 *       '400':
 *         description: Bad Request. Invalid or missing parameters in the request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid request body"
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
/**
 * @swagger
 * paths:
 *   /api/auth/user/shipping-address/{addressId}:
 *     put:
 *       summary: Update user's shipping address
 *       description: Update the specified shipping address for the authenticated user.
 *       tags:
 *        - SHIPPING ADDRESS SECTION
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: addressId
 *           required: true
 *           schema:
 *             type: string
 *             description: ID of the shipping address to update
 *             example: d7923b74-77c0-4be6-8b1b-809463490ec8
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipient_name:
 *                   type: string
 *                   description: The name of the recipient.
 *                   example: "Jill valentine"
 *                 street_address:
 *                   type: string
 *                   description: The street address of the shipping address.
 *                   example: "2 Cach Mang Thang 8"
 *                 city:
 *                   type: string
 *                   description: The city of the shipping address.
 *                   example: "HCM"
 *                 country:
 *                   type: string
 *                   description: The country of the shipping address.
 *                   example: "VN"
 *               required:
 *                 - recipient_name
 *                 - street_address
 *                 - city
 *                 - country
 *       responses:
 *         '200':
 *           description: Shipping address updated successfully
 *         '400':
 *           description: Invalid request
 *         '401':
 *           description: Unauthorized, invalid or missing token
 *         '404':
 *           description: Shipping address not found
 *         '500':
 *           description: Internal Server Error
 */
/**
 * @swagger
 * paths:
 *   /api/auth/user/shipping-address/{addressId}:
 *     delete:
 *       summary: Delete user's shipping address
 *       description: Delete the specified shipping address for the authenticated user.
 *       tags:
 *        - SHIPPING ADDRESS SECTION
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: addressId
 *           required: true
 *           schema:
 *             type: string
 *             description: ID of the shipping address to delete
 *             example: d7923b74-77c0-4be6-8b1b-809463490ec8
 *       responses:
 *         '200':
 *           description: Shipping address deleted successfully
 *         '401':
 *           description: Unauthorized, invalid or missing token
 *         '404':
 *           description: Shipping address not found
 *         '500':
 *           description: Internal Server Error
 */
router.get(
  '/api/auth/user/shipping-address',
  shippingAddressController.getShippingAddress,
);
router.post(
  '/api/auth/user/shipping-address',
  shippingAddressController.createShippingAddress,
);
router.put(
  '/api/auth/user/shipping-address/:addressId',
  shippingAddressController.updateShippingAddress,
);
router.delete(
  '/api/auth/user/shipping-address/:addressId',
  shippingAddressController.deleteShippingAddress,
);

// STAFF SECTION
/**
 * @swagger
 * /api/staff/login:
 *   post:
 *     summary: Staff Login
 *     description: Authenticate staff member and generate access token.
 *     tags:
 *       - STAFF SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the staff member.
 *                 example : johndoe@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the staff member.
 *                 example: pass
 *     responses:
 *       200:
 *         description: Successful login, returns access token.
 *       401:
 *         description: Unauthorized, invalid email or password.
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/auth/staff/order:
 *   get:
 *     summary: Get orders for staff member
 *     description: Retrieve orders associated with the authenticated staff member.
 *     tags:
 *       - STAFF SECTION
 *     security:
 *       -  BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders.
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/auth/staff/pc-build-auto:
 *   get:
 *     summary: Endpoint for automated PC build
 *     security:
 *       -  BearerAuth: []
 *     tags:
 *       - STAFF SECTION
 *     description: Retrieve a randomly generated PC build.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An internal server error occurred
 */
/**
 * @swagger
 * /api/auth/staff/order/{orderId}:
 *   get:
 *     summary: Get order details by ID
 *     tags:
 *       - STAFF SECTION
 *     description: Retrieves details of a specific order by its ID.
 *     security:
 *       -  BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/auth/staff/order-status/{order_id}:
 *   put:
 *     summary: Update Order Status by ID
 *     description: Update the status of an order with the specified ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - STAFF SECTION
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: da7dcd6d-4d7d-48c4-9111-ae6b0309c5d4
 *         description: ID of the order to update the status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_id:
 *                 type: string
 *                 format: uuid
 *                 example: b56803ff-b2cd-42e8-8171-d2459e92b58f
 *                 description: ID of the new status
 *     responses:
 *       '200':
 *         description: A successful response indicating the order status has been updated.
 *         content:
 *           application/json:
 *             example:
 *               orderId: "0d5a8629-9aaf-4fe0-9b4b-7fd627d9177c"
 *               status_id: "b56803ff-b2cd-42e8-8171-d2459e92b58f"
 *       '404':
 *         description: The specified order ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Order not found
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
router.get('/api/auth/staff/pc-build-auto', pcBuilderController.pcAutoBuild);
router.post('/api/staff/login', userController.loginStaff);
router.get('/api/auth/staff/order', orderController.getUsersOrder);
router.get(
  '/api/auth/staff/order/:orderId',
  orderController.getUsersOrderByOrderId,
);
router.get(
  '/api/auth/staff/order/:orderId',
  orderController.getOrderForStaffById,
);
router.put(
  '/api/auth/staff/order-status/:orderId',
  orderController.updateOrderStatus,
);
/**
 * @swagger
 * paths:
 *   /api/auth/avatar:
 *     post:
 *       summary: Update user avatar
 *       description: Upload a new avatar image for the authenticated user.
 *       tags:
 *         - COMMON SECTION
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: Avatar updated successfully
 *         '400':
 *           description: Invalid request
 *         '401':
 *           description: Unauthorized, invalid or missing token
 *         '500':
 *           description: Internal Server Error
 */
/**
 * @swagger
 * paths:
 *   /api/get/common/rule:
 *     get:
 *       summary: Retrieve common rule for product filtering
 *       description: Endpoint to fetch common rules for product filtering based on gaming and office purposes.
 *       tags:
 *         - COMMON SECTION
 *       responses:
 *         '200':
 *           description: Successful response
 *         '400':
 *           description: Invalid request
 *         '401':
 *           description: Unauthorized, invalid or missing token
 *         '500':
 *           description: Internal Server Error
 */
router.post(
  '/api/auth/avatar',
  uploadCloud.single('image'),
  userController.updateUserAvatar,
);
router.get('/api/get/common/rule', productController.getCommonRule);
/**
 * @swagger
 * paths:
 *   /api/auth/information:
 *     put:
 *       summary: Update user information
 *       description: Update the information of the authenticated user.
 *       tags:
 *         - COMMON SECTION
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   description: The first name of the user.
 *                   example: John
 *                 last_name:
 *                   type: string
 *                   description: The last name of the user.
 *                   example: Doe
 *                 phone_number:
 *                   type: string
 *                   description: The phone number of the user.
 *                   example: "0000000000"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the user account.
 *                   example: "2024-01-13T17:00:00.000Z"
 *       responses:
 *         '200':
 *           description: User information updated successfully
 *         '400':
 *           description: Invalid request
 *         '401':
 *           description: Unauthorized, invalid or missing token
 *         '500':
 *           description: Internal Server Error
 */
router.put('/api/auth/information', userController.updateUserInfo);
// VN_PAY SECTION
/**
 * @swagger
 * paths:
 *   /api/create_payment_url:
 *     post:
 *       summary: Create Payment URL
 *       description: Creates a payment URL for the given order details
 *       tags:
 *         - VNPAY SECTION
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   description: The ID of the order
 *                   example: f415f1db-908f-4044-811e-702e6afd7990
 *       responses:
 *         '200':
 *           description: Successful operation
 *         '400':
 *           description: Invalid request body
 *         '500':
 *           description: Internal server error
 */
router.post('/api/create_payment_url', paymentController.createPaymentUrl);
router.get('/vnpay_ipn', paymentController.getVnpayIpn);
router.get('/order/vnpay_return', paymentController.getVnpayReturn);

export default router;
