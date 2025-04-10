import express, { Router } from 'express';

import { adminCheck, authCheck } from '../middlewares/auth.js';
import { create, list, read, remove, update } from '../controllers/category.js';



const router = express.Router();

//routes

router.post("/category" , authCheck , adminCheck , create)
router.get("/categories" , list )
router.get("/category/:slug" ,  read )
router.put("/category/:slug" , authCheck , adminCheck ,update )
router.delete("/category/:slug" , authCheck , adminCheck , remove )




export default router;
