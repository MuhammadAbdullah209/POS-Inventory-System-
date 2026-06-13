import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    items: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            productName: String,

            
            barcode: String,
            size: String,
            color: String,

            price: Number,
            quantity: Number,
            total: Number
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const Bill = mongoose.model("Bill", billSchema);