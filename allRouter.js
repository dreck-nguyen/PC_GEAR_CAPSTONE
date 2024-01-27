import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';
import * as shopController from './APP/Controller/ShopController.js';

const router = express.Router();
// ADMIN SECTION
router.post('/api/admin/login', admController.loginAdmin);

// PRODUCT SECTION
/**
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

export default router;
