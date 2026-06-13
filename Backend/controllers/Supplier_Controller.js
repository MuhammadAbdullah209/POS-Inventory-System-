import { Supplier }
from "../Models/Supplier_Model.js";

export const createSupplier =
async(req,res)=>{

    try{

        const supplier =
        await Supplier.create(req.body);

        return res.status(201)
        .json(supplier);

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};

export const getSuppliers =
async(req,res)=>{

    try{

        const suppliers =
        await Supplier.find();

        return res.json(suppliers);

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};

export const updateSupplier =
async(req,res)=>{

    try{

        const supplier =
        await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        return res.json(supplier);

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};

export const deleteSupplier =
async(req,res)=>{

    try{

        await Supplier.findByIdAndDelete(
            req.params.id
        );

        return res.json({
            message:"Supplier Deleted"
        });

    }
    catch(error){

        return res.status(500)
        .json({
            message:error.message
        });
    }
};