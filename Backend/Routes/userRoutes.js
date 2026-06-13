import express from "express";
import { login } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/login", login);
export default userRoutes
//localhost:5000/Api/login