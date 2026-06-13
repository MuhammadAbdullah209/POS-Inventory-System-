import { Purchase }
from "../Models/Purchase_Model.js";

import { Product }
from "../Models/Product_Model.js";

export const createPurchase =
async(req,res)=>{

    try{

        const {
            supplier,
            barcode,
            quantity
        } = req.body;

        const product =
        await Product.findOne({
            "variants.barcode":barcode
        });

        if(!product){
            return res.status(404)
            .json({
                message:"Product not found"
            });
        }

        const variant =
        product.variants.find(
            v=>v.barcode===barcode
        );

        variant.stock += quantity;

        await product.save();

        const purchase =
        await Purchase.create({
            supplier,
            productId:product._id,
            barcode,
            quantity
        });

        return res.status(201)
        .json(purchase);

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};

export const getPurchases =
async(req,res)=>{

    try{

        const purchases =
        await Purchase.find()
        .populate("supplier")
        .populate("productId");

        return res.json(purchases);

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};
export const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        
        const product = await Product.findOne({ "variants.barcode": purchase.barcode });
        if (product) {
            const variant = product.variants.find(v => v.barcode === purchase.barcode);
            if (variant) {
                variant.stock -= purchase.quantity;
                if (variant.stock < 0) variant.stock = 0;
                await product.save();
            }
        }

        await Purchase.findByIdAndDelete(id);
        return res.status(200).json({ message: "Purchase deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};