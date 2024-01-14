import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';

import * as admController from './APP/Controller/AdminController.js';

const router = express.Router();
// ADMIN SECTION
router.post('/api/admin/login', admController.loginAdmin);

export default router;
