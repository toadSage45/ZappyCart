import express, { Router } from 'express';
import { createOrUpdateUser } from '../controllers/auth.js';



const router = express.Router();

//route
router.get('/create-or-update-user' , createOrUpdateUser);

export default router;
