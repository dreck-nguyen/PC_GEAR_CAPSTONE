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
import * as orderDetailController from './APP/Controller/OrderDetailController.js';
import * as componentController from './APP/Controller/ComponentController.js';
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
router.post(
  '/api/auth/staff/product/image/:productId',
  uploadCloud.single('image'),
  productController.createProductImage,
);
router.delete('/api/auth/staff/product/', productController.deleteProductsById);
router.delete(
  '/api/auth/staff/product/:productId',
  productController.deleteProductById,
);

//
router.post('/api/pc-component/processor', productController.getProcessor);
router.post('/api/pc-component/motherboard', productController.getMotherboard);
router.post('/api/pc-component/case', productController.getCase);
router.post(
  '/api/pc-component/graphics-card',
  productController.getGraphicsCard,
);
router.post('/api/pc-component/ram', productController.getRam);
router.post('/api/pc-component/storage', productController.getStorage);
//

//
router.get(
  '/api/pc-component/processor',
  productController.getProcessorSpecification,
);
router.get(
  '/api/pc-component/processor/:processor_id',
  productController.getProcessorById,
);
router.post(
  '/api/pc-component/processor/:processor_id',
  productController.upsertProcessorSpec,
);
router.delete(
  '/api/pc-component/processor/:processor_id',
  productController.deleteProcessorSpec,
);

//
router.get(
  '/api/pc-component/motherboard',
  productController.getMotherboardSpecification,
);
router.get(
  '/api/pc-component/motherboard/:motherboard_id',
  productController.getMotherboardById,
);

router.post(
  '/api/pc-component/motherboard/:motherboard_id',
  productController.upsertMotherboard,
);

router.delete(
  '/api/pc-component/motherboard/:motherboard_id',
  productController.deleteMotherboard,
);

//
router.get('/api/pc-build-purpose', pcBuilderController.getPcBuildPurpose);

router.get(
  '/api/pc-build-purpose/:purposeId',
  pcBuilderController.getPcBuildPurposeById,
);

router.put(
  '/api/pc-build-purpose/:purposeId',
  pcBuilderController.upsertPcBuildPurpose,
);

router.delete(
  '/api/pc-build-purpose/:purposeId',
  pcBuilderController.deletePcBuildPurpose,
);

//
router.get('/api/pc-component/case', productController.getCaseSpecification);

router.get('/api/pc-component/case/:case_id', productController.getCaseById);

router.post('/api/pc-component/case/:case_id', productController.upsertCase);

router.delete('/api/pc-component/case/:case_id', productController.deleteCase);

//
router.get(
  '/api/pc-component/graphics-card',
  productController.getGraphicsCardSpecification,
);
router.get(
  '/api/pc-component/graphics-card/:gpu_id',
  productController.getGraphicsCardById,
);

router.post(
  '/api/pc-component/graphics-card/:gpu_id',
  productController.upsertGraphicsCard,
);

router.delete(
  '/api/pc-component/graphics-card/:gpu_id',
  productController.deleteGraphicsCard,
);

//

router.get('/api/pc-component/ram', productController.getRamSpecification);
router.get('/api/pc-component/ram/:ram_id', productController.getRamById);

router.post('/api/pc-component/ram/:ram_id', productController.upsertRam);

router.delete('/api/pc-component/ram/:ram_id', productController.deleteRam);

//

router.get(
  '/api/pc-component/storage',
  productController.getStorageSpecification,
);

router.get(
  '/api/pc-component/storage/:storage_id',
  productController.getStorageById,
);

router.post(
  '/api/pc-component/storage/:storage_id',
  productController.upsertStorage,
);

router.delete(
  '/api/pc-component/storage/:storage_id',
  productController.deleteStorage,
);

//
router.get(
  '/api/pc-component/case-cooler',
  productController.getCaseCoolerSpecification,
);
router.get(
  '/api/pc-component/case-cooler/:case_cooler_id',
  productController.getCaseCoolerById,
);

router.post(
  '/api/pc-component/case-cooler/:case_cooler_id',
  productController.upsertCaseCooler,
);

router.delete(
  '/api/pc-component/case-cooler/:case_cooler_id',
  productController.deleteCaseCooler,
);

//

router.get(
  '/api/pc-component/cpu-cooler',
  productController.getCpuCoolerSpecification,
);

router.get(
  '/api/pc-component/cpu-cooler/:cpu_cooler_id',
  productController.getCpuCoolerById,
);

router.post(
  '/api/pc-component/cpu-cooler/:cpu_cooler_id',
  productController.upsertCpuCooler,
);

router.delete(
  '/api/pc-component/cpu-cooler/:cpu_cooler_id',
  productController.deleteCpuCooler,
);
//

router.get(
  '/api/pc-component/psu',
  productController.getPowerSupplySpecification,
);
router.get(
  '/api/pc-component/psu/:psu_id',
  productController.getPowerSupplyById,
);
router.post('/api/pc-component/psu/:psu_id', productController.upsertPsu);
router.delete('/api/pc-component/psu/:psu_id', productController.deletePsu);

//

router.get(
  '/api/pc-component/monitor',
  productController.getMonitorSpecification,
);

router.get(
  '/api/pc-component/monitor/:monitor_id',
  productController.getMonitorById,
);

router.post(
  '/api/pc-component/monitor/:monitor_id',
  productController.upsertMonitor,
);

router.delete(
  '/api/pc-component/monitor/:monitor_id',
  productController.deleteMonitor,
);

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
 *               purpose_id:
 *                 type: int
 *                 example: 3
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
/**
 * @swagger
 * /api/product/pc-component/get-pre-build:
 *   get:
 *     summary: Get pre-built PC components
 *     description: Retrieves pre-built PC components from the server
 *     tags:
 *       - USER SECTION
 *     responses:
 *       '200':
 *         description: Successful operation. Returns pre-built PC components.
 *       '401':
 *         description: Unauthorized. Authentication credentials are missing or invalid.
 *       '500':
 *         description: Internal server error. Something went wrong on the server side.
 */
/**
 * @swagger
 * /api/auth/user/pc-component/copy-personal-build/{userBuildId}:
 *   post:
 *     summary: Copy a staff pre-build-pc components
 *     description: Copy a staff pre-build-pc components for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - USER SECTION
 *     parameters:
 *       - in: path
 *         name: userBuildId
 *         required: true
 *         description: ID of the personal PC build to copy
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully copied the personal PC build
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Personal PC build copied successfully
 *       '400':
 *         description: Bad request - Invalid user_pc_build_id provided
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
router.post(
  '/api/auth/user/pc-component/copy-personal-build/:userBuildId',
  userController.copyStaffToPersonalBuildPc,
);
router.get(
  '/api/auth/user/pc-component/personal-build',
  userController.getPersonalBuildPc,
);
router.get(
  '/api/product/pc-component/get-pre-build',
  userController.getStaffPreBuildPc,
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
 * /api/auth/user/order-rating/{orderDetailId}:
 *   put:
 *     summary: Update order rating and review
 *     tags:
 *       - ORDER SECTION
 *     parameters:
 *       - in: path
 *         name: orderDetailId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order detail to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 minimum: 1
 *                 maximum: 5
 *                 description: The rating for the order
 *               review:
 *                 type: string
 *                 description: The review for the order
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Invalid request body or parameters
 *       '401':
 *         description: Unauthorized - Token is missing or invalid
 *       '404':
 *         description: Order detail not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []
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
router.put(
  '/api/auth/user/order-rating/:orderDetailId',
  orderController.createOrderDetailRating,
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
// router.get('/api/auth/staff/pc-build-auto', pcBuilderController.pcAutoBuild);
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
/**
 * @swagger
 * paths:
 *   /api/product-purpose:
 *     get:
 *       summary: Retrieve common rule for product
 *       description: Endpoint to fetch common rules for product based on gaming and office purposes.
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

router.get('/api/send-mail', paymentController.sendMail);

router.get('/api/product-purpose', productController.getProductPurpose);
/**
 * @swagger
 * /api/order/order-detail/{orderDetailId}:
 *   get:
 *     summary: Retrieve Order Detail by ID
 *     description: Retrieve details of a specific order by its ID.
 *     tags:
 *       - ORDER SECTION
 *     parameters:
 *       - in: path
 *         name: orderDetailId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order detail to retrieve.
 *     responses:
 *       '200':
 *         description: A single order detail object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderDetailId:
 *                   type: string
 *                   description: The ID of the order detail.
 *                   example: 02e0dd5e-18dd-4875-89a8-ff93183d9728
 *       '404':
 *         description: Order detail not found
 *       '500':
 *         description: Internal server error
 */
router.get(
  '/api/order/order-detail/:orderDetailId',
  orderDetailController.getOrderDetailByOrderDetailId,
);

// COVER CAPSTONE
// FormFactor
router.get('/api/component/form-factor', componentController.selectFormFactor);
router.post('/api/component/form-factor', componentController.createFormFactor);
router.put(
  '/api/component/form-factor/:formFactorId',
  componentController.updateFormFactor,
);
router.delete(
  '/api/component/form-factor/:formFactorId',
  componentController.deleteFormFactor,
);

// ProcessorSocket
router.get(
  '/api/component/processor-socket',
  componentController.selectProcessorSocket,
);
router.post(
  '/api/component/processor-socket',
  componentController.createProcessorSocket,
);
router.put(
  '/api/component/processor-socket/:processorSocketId',
  componentController.updateProcessorSocket,
);
router.delete(
  '/api/component/processor-socket/:processorSocketId',
  componentController.deleteProcessorSocket,
);

// ProcessorChipset
router.get(
  '/api/component/processor-chipset',
  componentController.selectProcessorChipset,
);
router.post(
  '/api/component/processor-chipset',
  componentController.createProcessorChipset,
);
router.put(
  '/api/component/processor-chipset/:processorChipsetId',
  componentController.updateProcessorChipset,
);
router.delete(
  '/api/component/processor-chipset/:processorChipsetId',
  componentController.deleteProcessorChipset,
);

// RamModel
router.get('/api/component/ram-model', componentController.selectRamModel);
router.post('/api/component/ram-model', componentController.createRamModel);
router.put(
  '/api/component/ram-model/:ramModelId',
  componentController.updateRamModel,
);
router.delete(
  '/api/component/ram-model/:ramModelId',
  componentController.deleteRamModel,
);

// RamType
router.get('/api/component/ram-type', componentController.selectRamType);
router.post('/api/component/ram-type', componentController.createRamType);
router.put(
  '/api/component/ram-type/:ramTypeId',
  componentController.updateRamType,
);
router.delete(
  '/api/component/ram-type/:ramTypeId',
  componentController.deleteRamType,
);

// StorageInterface
router.get(
  '/api/component/storage-interface',
  componentController.selectStorageInterface,
);
router.post(
  '/api/component/storage-interface',
  componentController.createStorageInterface,
);
router.put(
  '/api/component/storage-interface/:storageInterfaceId',
  componentController.updateStorageInterface,
);
router.delete(
  '/api/component/storage-interface/:storageInterfaceId',
  componentController.deleteStorageInterface,
);

// GraphicsInterface
router.get(
  '/api/component/graphics-interface',
  componentController.selectGraphicsInterface,
);
router.post(
  '/api/component/graphics-interface',
  componentController.createGraphicsInterface,
);
router.put(
  '/api/component/graphics-interface/:graphicsInterfaceId',
  componentController.updateGraphicsInterface,
);
router.delete(
  '/api/component/graphics-interface/:graphicsInterfaceId',
  componentController.deleteGraphicsInterface,
);

// MotherboardChipset
router.get(
  '/api/component/motherboard-chipset',
  componentController.selectMotherboardChipset,
);
router.post(
  '/api/component/motherboard-chipset',
  componentController.createMotherboardChipset,
);
router.put(
  '/api/component/motherboard-chipset/:motherboardChipsetId',
  componentController.updateMotherboardChipset,
);
router.delete(
  '/api/component/motherboard-chipset/:motherboardChipsetId',
  componentController.deleteMotherboardChipset,
);

// MotherboardSupportProcessor
router.get(
  '/api/component/motherboard-support-processor',
  componentController.selectMotherboardSupportProcessor,
);
router.post(
  '/api/component/motherboard-support-processor',
  componentController.createMotherboardSupportProcessor,
);
router.put(
  '/api/component/motherboard-support-processor/:profileId',
  componentController.updateMotherboardSupportProcessor,
);
router.delete(
  '/api/component/motherboard-support-processor/:profileId',
  componentController.deleteMotherboardSupportProcessor,
);

// MotherboardSupportRam
router.get(
  '/api/component/motherboard-support-ram',
  componentController.selectMotherboardSupportRam,
);
router.post(
  '/api/component/motherboard-support-ram',
  componentController.createMotherboardSupportRam,
);
router.put(
  '/api/component/motherboard-support-ram/:profileId',
  componentController.updateMotherboardSupportRam,
);
router.delete(
  '/api/component/motherboard-support-ram/:profileId',
  componentController.deleteMotherboardSupportRam,
);

// CaseSupportFormFactor
router.get(
  '/api/component/case-support-form-factor',
  componentController.selectCaseSupportFormFactor,
);
router.post(
  '/api/component/case-support-form-factor',
  componentController.createCaseSupportFormFactor,
);
router.put(
  '/api/component/case-support-form-factor/:profileId',
  componentController.updateCaseSupportFormFactor,
);
router.delete(
  '/api/component/case-support-form-factor/:profileId',
  componentController.deleteCaseSupportFormFactor,
);

// ProcessorSupportRam
router.get(
  '/api/component/processor-support-ram',
  componentController.selectProcessorSupportRam,
);
router.post(
  '/api/component/processor-support-ram',
  componentController.createProcessorSupportRam,
);
router.put(
  '/api/component/processor-support-ram/:profileId',
  componentController.updateProcessorSupportRam,
);
router.delete(
  '/api/component/processor-support-ram/:profileId',
  componentController.deleteProcessorSupportRam,
);

// GraphicsModel
router.get(
  '/api/component/graphics-model',
  componentController.selectGraphicsModel,
);
router.post(
  '/api/component/graphics-model',
  componentController.createGraphicsModel,
);
router.put(
  '/api/component/graphics-model/:graphicsModelId',
  componentController.updateGraphicsModel,
);
router.delete(
  '/api/component/graphics-model/:graphicsModelId',
  componentController.deleteGraphicsModel,
);

// ProccessorModel
router.get(
  '/api/component/processor-model',
  componentController.selectProcessorModel,
);
router.post(
  '/api/component/processor-model',
  componentController.createProcessorModel,
);
router.put(
  '/api/component/processor-model/:processorModelId',
  componentController.updateProcessorModel,
);
router.delete(
  '/api/component/processor-model/:processorModelId',
  componentController.deleteProcessorModel,
);

/**
 * @swagger
 * /api/component/form-factor:
 *   get:
 *     summary: Retrieve Component Form Factors
 *     description: Retrieve a list of available form factors for components.
 *     tags:
 *       - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of component form factors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Component form factor
 *                 example: ATX
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Component Form Factor
 *     description: Create a new form factor for components.
 *     tags:
 *       - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               form_factor:
 *                 type: string
 *                 description: New component form factor to add
 *                 example: ATX TEST
 *     responses:
 *       '201':
 *         description: Form factor created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/form-factor/{id}:
 *   put:
 *     summary: Update Component Form Factor
 *     description: Update an existing form factor for components.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the form factor to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               form_factor:
 *                 type: string
 *                 description: Updated component form factor
 *                 example: ATX TEST V2
 *     responses:
 *       '200':
 *         description: Form factor updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Component Form Factor
 *     description: Delete a form factor for components by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the form factor to delete.
 *     responses:
 *       '204':
 *         description: Form factor deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/component/processor-socket:
 *   get:
 *     summary: Retrieve Processor Sockets
 *     description: Retrieve a list of available processor sockets for components.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of processor sockets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Processor socket
 *                 example: AM4
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Processor Socket
 *     description: Create a new processor socket for components.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socket:
 *                 type: string
 *                 description: New processor socket to add
 *                 example: AM6
 *     responses:
 *       '201':
 *         description: Processor socket created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/processor-socket/{id}:
 *   put:
 *     summary: Update Processor Socket
 *     description: Update an existing processor socket for components.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the processor socket to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socket:
 *                 type: string
 *                 description: Updated processor socket
 *                 example: AM6
 *     responses:
 *       '200':
 *         description: Processor socket updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Processor Socket
 *     description: Delete a processor socket for components by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the processor socket to delete.
 *     responses:
 *       '204':
 *         description: Processor socket deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/component/processor-chipset:
 *   get:
 *     summary: Retrieve Processor Chipsets
 *     description: Retrieve a list of available processor chipsets for components.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of processor chipsets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Processor chipset
 *                 example: 1
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Processor Chipset
 *     description: Create a new processor chipset for components.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               processor_chipset:
 *                 type: string
 *                 description: New processor chipset to add
 *                 example: 1
 *               processor_socket:
 *                 type: string
 *                 description: Processor socket associated with the chipset
 *                 example: null
 *     responses:
 *       '201':
 *         description: Processor chipset created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/processor-chipset/{id}:
 *   put:
 *     summary: Update Processor Chipset
 *     description: Update an existing processor chipset for components.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the processor chipset to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               processor_chipset:
 *                 type: string
 *                 description: Updated processor chipset
 *                 example: 1
 *               processor_socket:
 *                 type: string
 *                 description: Updated processor socket associated with the chipset
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Processor chipset updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Processor Chipset
 *     description: Delete a processor chipset for components by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the processor chipset to delete.
 *     responses:
 *       '204':
 *         description: Processor chipset deleted successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/component/ram-type:
 *   get:
 *     summary: Retrieve RAM Types
 *     description: Retrieve a list of available RAM types for components.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of RAM types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ram_type:
 *                     type: number
 *                     description: RAM type name
 *                     example: 1
 *                   data_rate:
 *                     type: number
 *                     description: Data rate of the RAM type
 *                     example: 3200
 *                   data_transfer_rate:
 *                     type: number
 *                     description: Data transfer rate of the RAM type
 *                     example: 25
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create RAM Type
 *     description: Create a new RAM type for components.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ram_type:
 *                 type: number
 *                 description: RAM type name
 *                 example: 1
 *               data_rate:
 *                 type: number
 *                 description: Data rate of the RAM type
 *                 example: 1
 *               data_transfer_rate:
 *                 type: number
 *                 description: Data transfer rate of the RAM type
 *                 example: 1
 *     responses:
 *       '201':
 *         description: RAM type created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/ram-type/{id}:
 *   put:
 *     summary: Update RAM Type
 *     description: Update an existing RAM type for components.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RAM type to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ram_type:
 *                 type: number
 *                 description: Updated RAM type name
 *                 example: 1
 *               data_rate:
 *                 type: number
 *                 description: Updated data rate of the RAM type
 *                 example: 1
 *               data_transfer_rate:
 *                 type: number
 *                 description: Updated data transfer rate of the RAM type
 *                 example: 1
 *     responses:
 *       '200':
 *         description: RAM type updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete RAM Type
 *     description: Delete a RAM type for components by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RAM type to delete.
 *     responses:
 *       '204':
 *         description: RAM type deleted successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/component/storage-interface:
 *   get:
 *     summary: Retrieve Storage Interfaces
 *     description: Retrieve a list of available storage interfaces for components.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of storage interfaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Storage interface
 *                 example: SATA 6
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Storage Interface
 *     description: Create a new storage interface for components.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storage_interface:
 *                 type: string
 *                 description: New storage interface to add
 *                 example: SATA 6
 *     responses:
 *       '201':
 *         description: Storage interface created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/storage-interface/{id}:
 *   put:
 *     summary: Update Storage Interface
 *     description: Update an existing storage interface for components.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the storage interface to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storage_interface:
 *                 type: string
 *                 description: Updated storage interface
 *                 example: SATA 3
 *     responses:
 *       '200':
 *         description: Storage interface updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Storage Interface
 *     description: Delete a storage interface for components by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the storage interface to delete.
 *     responses:
 *       '204':
 *         description: Storage interface deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/component/graphics-interface:
 *   get:
 *     summary: Retrieve Graphics Interfaces
 *     description: Retrieve a list of available graphics interfaces for components.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of graphics interfaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Graphics interface
 *                 example: AGP 2
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Graphics Interface
 *     description: Create a new graphics interface for components.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interface_type:
 *                 type: string
 *                 description: New graphics interface type to add
 *                 example: AGP 2
 *     responses:
 *       '201':
 *         description: Graphics interface created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/graphics-interface/{id}:
 *   put:
 *     summary: Update Graphics Interface
 *     description: Update an existing graphics interface for components.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the graphics interface to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interface_type:
 *                 type: string
 *                 description: Updated graphics interface type
 *                 example: AGP
 *     responses:
 *       '200':
 *         description: Graphics interface updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Graphics Interface
 *     description: Delete a graphics interface for components by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the graphics interface to delete.
 *     responses:
 *       '204':
 *         description: Graphics interface deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/component/motherboard-chipset:
 *   get:
 *     summary: Retrieve Motherboard Chipsets
 *     description: Retrieve a list of available motherboard chipsets.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of motherboard chipsets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Motherboard chipset
 *                 example: Intel® C606
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Motherboard Chipset
 *     description: Create a new motherboard chipset.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chipset:
 *                 type: string
 *                 description: New motherboard chipset to add
 *                 example: Intel® C606
 *     responses:
 *       '201':
 *         description: Motherboard chipset created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/motherboard-chipset/{id}:
 *   put:
 *     summary: Update Motherboard Chipset
 *     description: Update an existing motherboard chipset by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the motherboard chipset to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chipset:
 *                 type: string
 *                 description: Updated motherboard chipset
 *                 example: Intel® C608
 *     responses:
 *       '200':
 *         description: Motherboard chipset updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Motherboard Chipset
 *     description: Delete a motherboard chipset by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the motherboard chipset to delete.
 *     responses:
 *       '204':
 *         description: Motherboard chipset deleted successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/component/motherboard-support-ram:
 *   get:
 *     summary: Retrieve Motherboard Support RAM
 *     description: Retrieve a list of motherboard support RAM configurations.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of motherboard support RAM configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   motherboard_id:
 *                     type: string
 *                     description: The ID of the motherboard
 *                   support_ram_type:
 *                     type: integer
 *                     description: The supported RAM type
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Motherboard Support RAM
 *     description: Create a new motherboard support RAM configuration.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motherboard_id:
 *                 type: string
 *                 description: The ID of the motherboard
 *               support_ram_type:
 *                 type: integer
 *                 description: The supported RAM type
 *     responses:
 *       '201':
 *         description: Motherboard support RAM configuration created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/motherboard-support-ram/{id}:
 *   put:
 *     summary: Update Motherboard Support RAM
 *     description: Update an existing motherboard support RAM configuration by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the motherboard support RAM configuration to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motherboard_id:
 *                 type: string
 *                 description: The ID of the motherboard
 *               support_ram_type:
 *                 type: integer
 *                 description: The updated supported RAM type
 *     responses:
 *       '200':
 *         description: Motherboard support RAM configuration updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Motherboard Support RAM
 *     description: Delete a motherboard support RAM configuration by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the motherboard support RAM configuration to delete.
 *     responses:
 *       '204':
 *         description: Motherboard support RAM configuration deleted successfully
 *       '500':
 *         description: Internal server error
 *
 * /api/component/motherboard-support-processor:
 *   get:
 *     summary: Retrieve Motherboard Support Processor
 *     description: Retrieve a list of motherboard support processor configurations.
 *     tags:
 *        - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of motherboard support processor configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   motherboard_id:
 *                     type: string
 *                     description: The ID of the motherboard
 *                   support_processor_type:
 *                     type: integer
 *                     description: The supported processor type
 *                   created_at:
 *                     type: string
 *                     description: The creation timestamp of the support configuration
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Motherboard Support Processor
 *     description: Create a new motherboard support processor configuration.
 *     tags:
 *        - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motherboard_id:
 *                 type: string
 *                 description: The ID of the motherboard
 *               support_processor_type:
 *                 type: integer
 *                 description: The supported processor type
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 description: The creation timestamp of the support configuration
 *     responses:
 *       '201':
 *         description: Motherboard support processor configuration created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/motherboard-support-processor/{id}:
 *   put:
 *     summary: Update Motherboard Support Processor
 *     description: Update an existing motherboard support processor configuration by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the motherboard support processor configuration to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motherboard_id:
 *                 type: string
 *                 description: The ID of the motherboard
 *               support_processor_type:
 *                 type: integer
 *                 description: The updated supported processor type
 *     responses:
 *       '200':
 *         description: Motherboard support processor configuration updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Motherboard Support Processor
 *     description: Delete a motherboard support processor configuration by ID.
 *     tags:
 *        - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the motherboard support processor configuration to delete.
 *     responses:
 *       '204':
 *         description: Motherboard support processor configuration deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/component/graphics-model:
 *   get:
 *     summary: Retrieve Graphics Models
 *     description: Retrieve a list of available graphics models.
 *     tags:
 *       - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of graphics models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the graphics model
 *                   graphics_model:
 *                     type: string
 *                     description: Name of the graphics model
 *                   priority:
 *                     type: integer
 *                     description: Priority of the graphics model
 *                   graphics_chipset:
 *                     type: integer
 *                     description: ID of the associated graphics chipset
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Graphics Model
 *     description: Create a new graphics model.
 *     tags:
 *       - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               graphics_model:
 *                 type: string
 *                 description: New graphics model to add
 *                 example: GeForce RTX 4090
 *               priority:
 *                 type: integer
 *                 description: Priority of the graphics model
 *                 example: 0
 *               graphics_chipset:
 *                 type: integer
 *                 description: ID of the associated graphics chipset
 *                 example: 2
 *     responses:
 *       '201':
 *         description: Graphics model created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/graphics-model/{id}:
 *   put:
 *     summary: Update Graphics Model
 *     description: Update an existing graphics model by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the graphics model to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               graphics_model:
 *                 type: string
 *                 description: Updated graphics model
 *                 example: GeForce RTX 4090
 *               priority:
 *                 type: integer
 *                 description: Priority of the graphics model
 *                 example: 0
 *               graphics_chipset:
 *                 type: integer
 *                 description: ID of the associated graphics chipset
 *                 example: 6
 *     responses:
 *       '200':
 *         description: Graphics model updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Graphics Model
 *     description: Delete a graphics model by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the graphics model to delete.
 *     responses:
 *       '204':
 *         description: Graphics model deleted successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/component/processor-model:
 *   get:
 *     summary: Retrieve Processor Models
 *     description: Retrieve a list of available processor models.
 *     tags:
 *       - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of processor models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the processor model
 *                   model:
 *                     type: string
 *                     description: Name of the processor model
 *                   priority:
 *                     type: integer
 *                     description: Priority of the processor model
 *                   chipset:
 *                     type: integer
 *                     description: ID of the associated chipset
 *                   cores:
 *                     type: integer
 *                     description: Number of cores
 *                   threads:
 *                     type: integer
 *                     description: Number of threads
 *                   model_number:
 *                     type: integer
 *                     description: Model number of the processor
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create Processor Model
 *     description: Create a new processor model.
 *     tags:
 *       - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: New processor model to add
 *                 example: Intel Core i9
 *               priority:
 *                 type: integer
 *                 description: Priority of the processor model
 *                 example: 0
 *               chipset:
 *                 type: integer
 *                 description: ID of the associated chipset
 *                 example: 2
 *               cores:
 *                 type: integer
 *                 description: Number of cores
 *                 example: 1
 *               threads:
 *                 type: integer
 *                 description: Number of threads
 *                 example: 1
 *               model_number:
 *                 type: integer
 *                 description: Model number of the processor
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Processor model created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/processor-model/{id}:
 *   put:
 *     summary: Update Processor Model
 *     description: Update an existing processor model by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the processor model to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: Updated processor model
 *                 example: Intel Core i9
 *               priority:
 *                 type: integer
 *                 description: Priority of the processor model
 *                 example: 0
 *               chipset:
 *                 type: integer
 *                 description: ID of the associated chipset
 *                 example: 2
 *               cores:
 *                 type: integer
 *                 description: Number of cores
 *                 example: 1
 *               threads:
 *                 type: integer
 *                 description: Number of threads
 *                 example: 1
 *               model_number:
 *                 type: integer
 *                 description: Model number of the processor
 *                 example: 3
 *     responses:
 *       '200':
 *         description: Processor model updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete Processor Model
 *     description: Delete a processor model by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the processor model to delete.
 *     responses:
 *       '204':
 *         description: Processor model deleted successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/component/ram-model:
 *   get:
 *     summary: Retrieve RAM Models
 *     description: Retrieve a list of available RAM models.
 *     tags:
 *       - Cover Capstone Component
 *     responses:
 *       '200':
 *         description: A list of RAM models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: RAM model
 *                 example: DDR4
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Create RAM Model
 *     description: Create a new RAM model.
 *     tags:
 *       - Cover Capstone Component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: New RAM model to add
 *                 example: DDR4
 *     responses:
 *       '201':
 *         description: RAM model created successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 * /api/component/ram-model/{id}:
 *   put:
 *     summary: Update RAM Model
 *     description: Update an existing RAM model by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RAM model to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: Updated RAM model
 *                 example: DDR5
 *     responses:
 *       '200':
 *         description: RAM model updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete RAM Model
 *     description: Delete a RAM model by ID.
 *     tags:
 *       - Cover Capstone Component
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the RAM model to delete.
 *     responses:
 *       '204':
 *         description: RAM model deleted successfully
 *       '500':
 *         description: Internal server error
 */

// VERSION 2
/**
 * @swagger
 * /api/pc-component/processor:
 *   get:
 *     summary: Retrieve all processors
 *     description: Retrieve a list of all PC component processors.
 *     responses:
 *       '200':
 *         description: A list of PC component processors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: DDR4
 *       '500':
 *         description: Internal server error
 *
 *
 * /api/pc-component/processor/{processor_id}:
 *   get:
 *     summary: Retrieve a processor by ID
 *     description: Retrieve details of a PC component processor by ID.
 *     parameters:
 *       - in: path
 *         name: processor_id
 *         required: true
 *         description: ID of the processor to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Processor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Processor not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a processor
 *     description: Update details of a PC component processor by ID.
 *     parameters:
 *       - in: path
 *         name: processor_id
 *         required: true
 *         description: ID of the processor to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: Updated processor model
 *     responses:
 *       '200':
 *         description: Processor updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a processor
 *     description: Delete a PC component processor by ID.
 *     parameters:
 *       - in: path
 *         name: processor_id
 *         required: true
 *         description: ID of the processor to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Processor deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/motherboard:
 *   get:
 *     summary: Retrieve all motherboards
 *     description: Retrieve a list of all PC component motherboards.
 *     responses:
 *       '200':
 *         description: A list of PC component motherboards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Motherboard1, Motherboard2
 *       '500':
 *         description: Internal server error
 *
 *
 * /api/pc-component/motherboard/{motherboard_id}:
 *   get:
 *     summary: Retrieve a motherboard by ID
 *     description: Retrieve details of a PC component motherboard by ID.
 *     parameters:
 *       - in: path
 *         name: motherboard_id
 *         required: true
 *         description: ID of the motherboard to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Motherboard details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Motherboard not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a motherboard
 *     description: Update details of a PC component motherboard by ID.
 *     parameters:
 *       - in: path
 *         name: motherboard_id
 *         required: true
 *         description: ID of the motherboard to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpu_socket:
 *                 type: string
 *               usb_details:
 *                 type: string
 *               audio:
 *                 type: string
 *               memory_slots:
 *                 type: string
 *               sata:
 *                 type: string
 *               m2:
 *                 type: string
 *               power_connectors:
 *                 type: string
 *               wifi:
 *                 type: string
 *               form_factor:
 *                 type: string
 *               gpu_interface:
 *                 type: string
 *               storage_interface:
 *                 type: string
 *               chipset:
 *                 type: string
 *               power:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Motherboard updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a motherboard
 *     description: Delete a PC component motherboard by ID.
 *     parameters:
 *       - in: path
 *         name: motherboard_id
 *         required: true
 *         description: ID of the motherboard to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Motherboard deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/case:
 *   get:
 *     summary: Retrieve all PC component cases
 *     description: Retrieve a list of all PC component cases.
 *     responses:
 *       '200':
 *         description: A list of PC component cases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: Case1, Case2
 *       '500':
 *         description: Internal server error
 *
 *
 * /api/pc-component/case/{case_id}:
 *   get:
 *     summary: Retrieve a PC component case by ID
 *     description: Retrieve details of a PC component case by ID.
 *     parameters:
 *       - in: path
 *         name: case_id
 *         required: true
 *         description: ID of the PC component case to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: PC component case details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: PC component case not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a PC component case
 *     description: Update details of a PC component case by ID.
 *     parameters:
 *       - in: path
 *         name: case_id
 *         required: true
 *         description: ID of the PC component case to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cabinet_type:
 *                 type: string
 *               side_panel_type:
 *                 type: string
 *               internal_drive_size:
 *                 type: string
 *               front_panel:
 *                 type: string
 *               cpu_cooler_support_size:
 *                 type: number
 *               case_cooler_support_size:
 *                 type: number
 *     responses:
 *       '200':
 *         description: PC component case updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a PC component case
 *     description: Delete a PC component case by ID.
 *     parameters:
 *       - in: path
 *         name: case_id
 *         required: true
 *         description: ID of the PC component case to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: PC component case deleted successfully
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/pc-component/graphics-card:
 *   get:
 *     summary: Retrieve all graphics cards
 *     description: Retrieve a list of all PC component graphics cards.
 *     responses:
 *       '200':
 *         description: A list of PC component graphics cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: GraphicsCard1, GraphicsCard2
 *       '500':
 *         description: Internal server error
 *
 *
 * /api/pc-component/graphics-card/{gpu_id}:
 *   get:
 *     summary: Retrieve a graphics card by ID
 *     description: Retrieve details of a PC component graphics card by ID.
 *     parameters:
 *       - in: path
 *         name: gpu_id
 *         required: true
 *         description: ID of the graphics card to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Graphics card details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Graphics card not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a graphics card
 *     description: Update details of a PC component graphics card by ID.
 *     parameters:
 *       - in: path
 *         name: gpu_id
 *         required: true
 *         description: ID of the graphics card to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chipset:
 *                 type: number
 *               memory:
 *                 type: number
 *               max_power_consumption:
 *                 type: number
 *               base_clock_speed:
 *                 type: number
 *               length:
 *                 type: string
 *               cooler_type:
 *                 type: string
 *               interface:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Graphics card updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a graphics card
 *     description: Delete a PC component graphics card by ID.
 *     parameters:
 *       - in: path
 *         name: gpu_id
 *         required: true
 *         description: ID of the graphics card to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Graphics card deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/ram:
 *   get:
 *     summary: Retrieve all RAM components
 *     description: Retrieve a list of all PC component RAM modules.
 *     responses:
 *       '200':
 *         description: A list of PC component RAM modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: RAM1, RAM2
 *       '500':
 *         description: Internal server error
 *
 *
 * /api/pc-component/ram/{ram_id}:
 *   get:
 *     summary: Retrieve a RAM module by ID
 *     description: Retrieve details of a PC component RAM module by ID.
 *     parameters:
 *       - in: path
 *         name: ram_id
 *         required: true
 *         description: ID of the RAM module to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: RAM module details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: RAM module not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a RAM module
 *     description: Update details of a PC component RAM module by ID.
 *     parameters:
 *       - in: path
 *         name: ram_id
 *         required: true
 *         description: ID of the RAM module to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memory:
 *                 type: number
 *               ram_type:
 *                 type: number
 *               cas_latency:
 *                 type: string
 *               dimm_type:
 *                 type: string
 *               voltage:
 *                 type: string
 *     responses:
 *       '200':
 *         description: RAM module updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a RAM module
 *     description: Delete a PC component RAM module by ID.
 *     parameters:
 *       - in: path
 *         name: ram_id
 *         required: true
 *         description: ID of the RAM module to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: RAM module deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/storage:
 *   get:
 *     summary: Retrieve all storage components
 *     description: Retrieve a list of all PC component storage devices.
 *     responses:
 *       '200':
 *         description: A list of PC component storage devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: SSD1, HDD2
 *       '500':
 *         description: Internal server error
 *
 *
 * /api/pc-component/storage/{storage_id}:
 *   get:
 *     summary: Retrieve a storage device by ID
 *     description: Retrieve details of a PC component storage device by ID.
 *     parameters:
 *       - in: path
 *         name: storage_id
 *         required: true
 *         description: ID of the storage device to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Storage device details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Storage device not found
 *       '500':
 *         description: Internal server error
 *
 *   post:
 *     summary: Update a storage device
 *     description: Update details of a PC component storage device by ID.
 *     parameters:
 *       - in: path
 *         name: storage_id
 *         required: true
 *         description: ID of the storage device to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               type:
 *                 type: number
 *               interface:
 *                 type: number
 *               form_factor:
 *                 type: string
 *               capacity:
 *                 type: number
 *               voltage:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Storage device updated successfully
 *       '400':
 *         description: Bad request - invalid input
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a storage device
 *     description: Delete a PC component storage device by ID.
 *     parameters:
 *       - in: path
 *         name: storage_id
 *         required: true
 *         description: ID of the storage device to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Storage device deleted successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/case-cooler:
 *   get:
 *     summary: Retrieve all PC component case coolers
 *     description: Retrieve a list of all PC component case cooler devices.
 *     responses:
 *       '200':
 *         description: A list of PC component case cooler devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: ["P12 PST", "P8 PST"]
 *       '500':
 *         description: Internal server error
 *
 *   /api/pc-component/case-cooler/{case_cooler_id}:
 *     get:
 *       summary: Retrieve a case cooler by ID
 *       description: Retrieve details of a PC component case cooler device by ID.
 *       parameters:
 *         - in: path
 *           name: case_cooler_id
 *           required: true
 *           description: ID of the case cooler device to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Case cooler details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: Case cooler not found
 *         '500':
 *           description: Internal server error
 *
 *     post:
 *       summary: Update a case cooler
 *       description: Update details of a PC component case cooler device by ID.
 *       parameters:
 *         - in: path
 *           name: case_cooler_id
 *           required: true
 *           description: ID of the case cooler device to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 model:
 *                   type: string
 *                 airflow:
 *                   type: number
 *                 fan_rpm:
 *                   type: number
 *                 size:
 *                   type: number
 *                 voltage:
 *                   type: number
 *       responses:
 *         '200':
 *           description: Case cooler updated successfully
 *         '400':
 *           description: Bad request - invalid input
 *         '500':
 *           description: Internal server error
 *
 *     delete:
 *       summary: Delete a case cooler
 *       description: Delete a PC component case cooler device by ID.
 *       parameters:
 *         - in: path
 *           name: case_cooler_id
 *           required: true
 *           description: ID of the case cooler device to delete
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: Case cooler deleted successfully
 *         '500':
 *           description: Internal server error
 */
/**
 * @swagger
 * /api/pc-component/cpu-cooler:
 *   get:
 *     summary: Retrieve all PC component CPU coolers
 *     description: Retrieve a list of all PC component CPU cooler devices.
 *     responses:
 *       '200':
 *         description: A list of PC component CPU cooler devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: ["Hyper 212 EVO", "Noctua NH-D15"]
 *       '500':
 *         description: Internal server error
 *
 *   /api/pc-component/cpu-cooler/{cpu_cooler_id}:
 *     get:
 *       summary: Retrieve a CPU cooler by ID
 *       description: Retrieve details of a PC component CPU cooler device by ID.
 *       parameters:
 *         - in: path
 *           name: cpu_cooler_id
 *           required: true
 *           description: ID of the CPU cooler device to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: CPU cooler details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: CPU cooler not found
 *         '500':
 *           description: Internal server error
 *
 *     post:
 *       summary: Update a CPU cooler
 *       description: Update details of a PC component CPU cooler device by ID.
 *       parameters:
 *         - in: path
 *           name: cpu_cooler_id
 *           required: true
 *           description: ID of the CPU cooler device to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 model:
 *                   type: string
 *                 cpu_cooler:
 *                   type: string
 *                 fan_rpm:
 *                   type: number
 *                 noise_level:
 *                   type: string
 *                 fan_number:
 *                   type: number
 *                 cpu_cooler_size:
 *                   type: number
 *                 fan_cfm:
 *                   type: number
 *                 voltage:
 *                   type: number
 *       responses:
 *         '200':
 *           description: CPU cooler updated successfully
 *         '400':
 *           description: Bad request - invalid input
 *         '500':
 *           description: Internal server error
 *
 *     delete:
 *       summary: Delete a CPU cooler
 *       description: Delete a PC component CPU cooler device by ID.
 *       parameters:
 *         - in: path
 *           name: cpu_cooler_id
 *           required: true
 *           description: ID of the CPU cooler device to delete
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: CPU cooler deleted successfully
 *         '500':
 *           description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/psu:
 *   get:
 *     summary: Retrieve all PC component PSUs
 *     description: Retrieve a list of all PC component PSU devices.
 *     responses:
 *       '200':
 *         description: A list of PC component PSU devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: ["Toughpower PF1 TESST", "Corsair RM850x"]
 *       '500':
 *         description: Internal server error
 *
 *   /api/pc-component/psu/{psu_id}:
 *     get:
 *       summary: Retrieve a PSU by ID
 *       description: Retrieve details of a PC component PSU device by ID.
 *       parameters:
 *         - in: path
 *           name: psu_id
 *           required: true
 *           description: ID of the PSU device to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: PSU details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: PSU not found
 *         '500':
 *           description: Internal server error
 *
 *     post:
 *       summary: Update a PSU
 *       description: Update details of a PC component PSU device by ID.
 *       parameters:
 *         - in: path
 *           name: psu_id
 *           required: true
 *           description: ID of the PSU device to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 model:
 *                   type: string
 *                 power:
 *                   type: number
 *       responses:
 *         '200':
 *           description: PSU updated successfully
 *         '400':
 *           description: Bad request - invalid input
 *         '500':
 *           description: Internal server error
 *
 *     delete:
 *       summary: Delete a PSU
 *       description: Delete a PC component PSU device by ID.
 *       parameters:
 *         - in: path
 *           name: psu_id
 *           required: true
 *           description: ID of the PSU device to delete
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: PSU deleted successfully
 *         '500':
 *           description: Internal server error
 */

/**
 * @swagger
 * /api/pc-component/monitor:
 *   get:
 *     summary: Retrieve all PC component monitors
 *     description: Retrieve a list of all PC component monitor devices.
 *     responses:
 *       '200':
 *         description: A list of PC component monitor devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: ["SE2719H", "Dell U2718Q"]
 *       '500':
 *         description: Internal server error
 *
 *   /api/pc-component/monitor/{monitor_id}:
 *     get:
 *       summary: Retrieve a monitor by ID
 *       description: Retrieve details of a PC component monitor device by ID.
 *       parameters:
 *         - in: path
 *           name: monitor_id
 *           required: true
 *           description: ID of the monitor device to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Monitor details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: Monitor not found
 *         '500':
 *           description: Internal server error
 *
 *     post:
 *       summary: Update a monitor
 *       description: Update details of a PC component monitor device by ID.
 *       parameters:
 *         - in: path
 *           name: monitor_id
 *           required: true
 *           description: ID of the monitor device to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 model:
 *                   type: string
 *                 screen_size:
 *                   type: number
 *                 resolution:
 *                   type: string
 *                 response_time:
 *                   type: number
 *                 aspect_ratio:
 *                   type: string
 *                 refresh_rate:
 *                   type: number
 *                 panel_type:
 *                   type: string
 *                 voltage:
 *                   type: number
 *       responses:
 *         '200':
 *           description: Monitor updated successfully
 *         '400':
 *           description: Bad request - invalid input
 *         '500':
 *           description: Internal server error
 *
 *     delete:
 *       summary: Delete a monitor
 *       description: Delete a PC component monitor device by ID.
 *       parameters:
 *         - in: path
 *           name: monitor_id
 *           required: true
 *           description: ID of the monitor device to delete
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: Monitor deleted successfully
 *         '500':
 *           description: Internal server error
 */

router.get(
  '/api/pc-component/auto-gen-by-purpose/:purposeId',
  pcBuilderController.getAutoGenByPurpose,
);
export default router;
