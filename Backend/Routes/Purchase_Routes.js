import express from "express";

import {
createPurchase,
    deletePurchase,
getPurchases
}
from "../controllers/Purchase_Controller.js";
import { isAdmin, protect } from "../Middleware/middleware.js";

const PurchaseRoutes = express.Router();

PurchaseRoutes.post("/",protect,isAdmin,createPurchase);

PurchaseRoutes.get("/",protect,isAdmin,getPurchases);
PurchaseRoutes.delete("/:id", deletePurchase);
export default PurchaseRoutes;
//localhost:5000/Api/purchase