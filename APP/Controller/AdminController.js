import express from 'express';
import jwt from 'jsonwebtoken';
import * as admService from '../Service/AdminService.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const secret_key = process.env.SECRET_KEY;
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const result = await admService.getAdmDetails(email, password);
    const userDetails = result.dataValues;
    if (userDetails) {
      const accessToken = jwt.sign(
        { user_id: userDetails.user_id },
        secret_key,
        {
          expiresIn: '30d',
        },
      );
      res.header('Authorization', `Bearer ${accessToken}`);
      userDetails.accessToken = `Bearer ${accessToken}`;
      res.send(userDetails);
    } else {
      res.status(400).send({ message: 'Admin not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}
