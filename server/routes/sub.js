import express, { Router } from 'express';

import { adminCheck, authCheck } from '../middlewares/auth.js';
import { create, list, read, remove, update, readProductsFromSubCategory } from '../controllers/sub.js';



const router = express.Router();

//routes

router.post("/sub" , authCheck , adminCheck , create)
router.get("/subs" , list )
router.get("/sub/:slug" ,  read )
router.put("/sub/:slug" , authCheck , adminCheck ,update )
router.delete("/sub/:slug" , authCheck , adminCheck , remove )
router.get("/subCategoryProduct/:slug" ,  readProductsFromSubCategory )





export default router