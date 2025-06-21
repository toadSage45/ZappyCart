import express, { Router } from 'express';

import { adminCheck, authCheck } from '../middlewares/auth.js';
import { create, listAll, read, remove, update } from '../controllers/product.js';




const router = express.Router();

//routes

router.post("/product" , authCheck , adminCheck , create)
router.get("/products/:count" , listAll )
router.get("/product/:slug" ,  read )
router.put("/product/:slug" , authCheck , adminCheck ,update )
router.delete("/product/:slug" , authCheck , adminCheck , remove )




export default router;
