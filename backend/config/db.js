const mongoose=require("mongoose")
require('dotenv').config()
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to DB")
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectDB