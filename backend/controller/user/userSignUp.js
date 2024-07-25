const bcrypt = require('bcrypt');
const userModel=require('../../models/userModel')
async function userSignUpController(req,res){
    try{
         const{name,email,password}=req.body
         const user=await userModel.findOne({email})
         if(user){
            throw new Error("User already exists")
         }
         if(!email){
            throw new Error("please provide email")
         }
         if(!name){
            throw new Error("please provide name")
         }
         if(!password){
            throw new Error("please provide password")
         }

         const salt = bcrypt.genSaltSync(10);
         const hashPassword = await bcrypt.hashSync(password, salt);   
         if(!hashPassword){
            throw new Error("Something is wrong")
         }
         
         const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword
         }

         const userData=new userModel(payload);
         const saveUser=await userData.save();
        
         res.status(201).json({
           data:saveUser,
           success:true,
           error:false ,
           message:"User created Successfully!",
         })
    }
    catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false,
        })
    }
}

module.exports=userSignUpController