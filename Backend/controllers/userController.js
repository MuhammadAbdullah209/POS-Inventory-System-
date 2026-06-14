import { User } from "../Models/User_Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        
        email = email.trim().toLowerCase();
        if (!email.endsWith("@gmail.com")) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        
        const user = await User.findOne({
            email: { $regex: `^${email}$`, $options: "i" }
        });
        if (!user) {
            return res.status(400).json({ message: "User Not Found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Credentials" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(201).json({ token, role: user.role, name: user.email });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};