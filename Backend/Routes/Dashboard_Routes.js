import express from "express";

import {
dashboardStats
}
from "../controllers/Dashboard_Controller.js";

const DashboardRoutes = express.Router();

DashboardRoutes.get("/",dashboardStats);

export default DashboardRoutes;