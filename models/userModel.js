const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://EWV:ewvtestmongodb@cluster0.rtzboh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
       type:String,
       required: true,
       unique: true
    },
    password:{
        type:String,
        required: true,
    }
},{timestamps: true})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel