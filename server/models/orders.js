const mongoose = require("mongoose")

const uploadBill = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        require:true,
    },
    bill:{
        type:[String],
        required:true
    }
})

const ordersModel = mongoose.model("uploadedbills", uploadBill)
module.exports = ordersModel