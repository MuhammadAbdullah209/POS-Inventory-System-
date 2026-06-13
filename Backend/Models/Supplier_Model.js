import mongoose from "mongoose";

const SupplierSchema =
new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    phone:String,

    email:String,

    address:String
},
{
    timestamps:true
}
);

export const Supplier =
mongoose.model(
    "Supplier",
    SupplierSchema
);