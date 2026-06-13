import mongoose from "mongoose";

const PurchaseSchema =
new mongoose.Schema(
{
    supplier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier"
    },

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    barcode:String,

    quantity:Number
},
{
    timestamps:true
}
);

export const Purchase =
mongoose.model(
    "Purchase",
    PurchaseSchema
);