import express, { Router } from 'express';

import { adminCheck, authCheck } from '../middlewares/auth.js';
import { create, listAll, read, remove, update, list, productsCount, productStar, listRelated, searchFilters } from '../controllers/product.js';

const router = express.Router();

//routes

router.post("/product" , authCheck , adminCheck , create)
router.get("/products/total", productsCount);
router.get("/products/:count" , listAll )
router.get("/product/:slug" ,  read )
router.put("/product/:slug" , authCheck , adminCheck ,update )
router.delete("/product/:slug" , authCheck , adminCheck , remove )

router.post("/products" , list);
//rating
router.put("/product/star/:productId", authCheck, productStar);
//related product
router.get("/product/related/:productId", listRelated )
//search
router.post("/search/filters", searchFilters);



export default router;
