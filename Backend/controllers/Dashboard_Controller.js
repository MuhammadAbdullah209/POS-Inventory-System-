import { Product }
from "../Models/Product_Model.js";

import { Bill }
from "../Models/Billing_Schema.js";

import { Supplier }
from "../Models/Supplier_Model.js";



export const dashboardStats =
async(req,res)=>{

    try{

        const totalProducts = await Product.countDocuments();

        const totalSuppliers = await Supplier.countDocuments();


        const totalBills = await Bill.countDocuments();

        const bills = await Bill.find();

        let revenue = 0;

        bills.forEach(b=>{
            revenue += b.totalAmount;
        });

        return res.json({
            totalProducts,
            totalSuppliers,
            totalBills,
            revenue
        });

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};