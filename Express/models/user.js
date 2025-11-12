import mongoose from 'mongoose';
 let userchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Password must be at least 8 characters long"],
    }
 })
 const usermodel=mongoose.model('users',userchema);
 export default usermodel;