import express from "express"
import { bill, getBills } from "../controllers/productController.js"
const billroute = express.Router();
billroute.post("/bill", bill)
billroute.get("/bills", getBills)
export default billroute
//localhost:5000/Api/bill