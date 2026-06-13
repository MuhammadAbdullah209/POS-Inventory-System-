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

const productRoutes = express.Router();
productRoutes.post("/scan", scanProduct);
// CRUD Routes
productRoutes.get("/search/:code",protect, getproductorvariant);
productRoutes.post("/", protect, isAdmin, createProduct);
productRoutes.get("/", getProducts);
// router.get("/:id", getProductById);
productRoutes.put("/:id", protect, isAdmin, updateProduct);
productRoutes.delete("/:id", protect, isAdmin, deleteProduct);
productRoutes.get("/low-stock", lowStockProducts);

export default productRoutes;