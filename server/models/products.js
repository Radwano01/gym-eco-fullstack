const mongoose = require("mongoose")


const uploadImage = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageone:{
        type:[String],
        required:true,
    },
    imagetwo:{
        type:[String],
        required:true,
    },
    code:{
        type:Number,
        require:true,
    }
})

const productsModel = mongoose.model("uploadedImages", uploadImage)
module.exports = productsModel