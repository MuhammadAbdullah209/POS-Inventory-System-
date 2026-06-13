import mongoose from "mongoose";
const variantSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    }
});
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String
        },

        variants: [variantSchema],

        productCode: {
            type: String,
            unique: true,
            default: () => "PROD-" + Date.now()
        }
    }, { timestamps: true })
export const Product = mongoose.model("Product", productSchema)