import express from "express";

import {
createPurchase,
    deletePurchase,
getPurchases
}
from "../Controllers/Purchase_Controller.js";
import { isAdmin, protect } from "../Middleware/middleware.js";

const router = express.Router();

router.post("/",protect,isAdmin,createPurchase);

router.get("/",protect,isAdmin,getPurchases);
router.delete("/:id", deletePurchase);
export default router;
//localhost:5000/Api/purchase