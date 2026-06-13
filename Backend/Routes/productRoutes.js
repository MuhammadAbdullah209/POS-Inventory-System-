import express from "express";
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    scanProduct,
    getproductorvariant,
    lowStockProducts
} from "../controllers/productController.js";
import { isAdmin, protect } from "../Middleware/middleware.js";

const router = express.Router();
router.post("/scan", scanProduct);
// CRUD Routes
router.get("/search/:code",protect, getproductorvariant);
router.post("/", protect, isAdmin, createProduct);
router.get("/", getProducts);
// router.get("/:id", getProductById);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.get("/low-stock", lowStockProducts);

export default router;