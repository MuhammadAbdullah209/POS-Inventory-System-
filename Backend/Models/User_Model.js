import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff"
    }
});


export const User = mongoose.model("User", userSchema, "user");