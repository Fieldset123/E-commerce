const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
    },
    profilePic:{
        type:String
    },
    role:{
        type:String
    }
},{
    timestamps:true
})

const user=mongoose.model('user',userSchema);
module.exports=user