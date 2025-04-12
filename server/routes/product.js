import express, { Router } from 'express';

import { adminCheck, authCheck } from '../middlewares/auth.js';
import { create, read } from '../controllers/product.js';




const router = express.Router();

//routes

router.post("/product" , authCheck , adminCheck , create)
router.get("/products" , read )
// router.get("/category/:slug" ,  read )
// router.put("/category/:slug" , authCheck , adminCheck ,update )
// router.delete("/category/:slug" , authCheck , adminCheck , remove )




export default router;
