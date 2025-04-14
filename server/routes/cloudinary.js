import express from "express"
import { adminCheck, authCheck } from '../middlewares/auth.js';
import { remove, upload } from "../controllers/cloudinary.js";

const router = express.Router();

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);


export default router;

