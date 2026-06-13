import express from "express";

import {
dashboardStats
}
from "../Controllers/Dashboard_Controller.js";

const router = express.Router();

router.get("/",dashboardStats);

export default router;