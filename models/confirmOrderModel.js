const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/EWV");
const confirmSchema = mongoose.Schema({
   customerId:{
     type: mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true
   },
    name:{
        type:String,
        required: true,
    },
    email:{
       type:String,
       required: true
    },
    company:{
        type:String,
        required: true
     },
     streetAddress:{
        type:String,
        required: true,

     },
     town:{
        type:String,
        required: true
     },
     state:{
        type:String,
        required: true
     },
     postCode:{
        type:String,
        required: true
     },
     phone:{
        type:String,
        required: true
     },
     status:{
        type:String,
        required: true,
        default: "pending"
     },
},{timestamps: true})

const orderModel = mongoose.model("Orders", confirmSchema);
module.exports = orderModel