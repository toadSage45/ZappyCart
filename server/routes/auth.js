import express, { Router } from 'express';
import { createOrUpdateUser, currentUser } from '../controllers/auth.js';
import { authCheck } from '../middlewares/auth.js';



const router = express.Router();

//route
router.post('/create-or-update-user' ,authCheck,  createOrUpdateUser);
router.post('/current-user' ,authCheck,  currentUser);

export default router;
