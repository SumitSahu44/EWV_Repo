const mongoose = require("mongoose");
// mongodb connectivity 
mongoose.connect("mongodb+srv://EWV:ewvtestmongodb@cluster0.rtzboh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



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
