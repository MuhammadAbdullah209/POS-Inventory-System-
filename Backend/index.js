import express from "express";
import { PORT } from "./config.js";
import Dbconnector from "./db.js";
import cors from "cors";
import dns from "dns";
import productRoutes from "./Routes/productRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import billroute from "./Routes/BillingRoute.js";
import SupplierRoutes from "./Routes/Supplier_Routes.js";
import PurchaseRoutes from "./Routes/Purchase_Routes.js";
import DashboardRoutes from "./Routes/Dashboard_Routes.js";
dns.setServers(["1.1.1.1", "8.8.8.8"])

Dbconnector();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.json({ message: "API is running" }));

// Routes
app.use('/Api', productRoutes);
app.use('/Api', userRoutes);
app.use("/Api", billroute);
app.use("/Api/suppliers", SupplierRoutes);
app.use("/Api/purchases", PurchaseRoutes);
app.use("/Api/dashboard", DashboardRoutes);


if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

export default app;