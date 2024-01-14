import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';
import { UserRole } from './APP/utility/DbHelper.js';

const router = express.Router();

// Route to retrieve all user roles
// router.get('/test', async (req, res) => {
//   try {
//     const userRoles = await UserRole.findAll();
//     res.json(userRoles);
//   } catch (error) {
//     console.error('Error retrieving user roles:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


export default router;
