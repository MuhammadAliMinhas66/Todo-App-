import usermodel from "../models/user.js";

let postuser=async(req,res)=>{
    try {
        let {name,email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required",success:false});
        }

        let existinguser=await usermodel.findOne({email});
        if(existinguser){
            return res.status(409).json({message:"User already exists",success:false});
        }
        let newuser=new usermodel({name,email,password});
        await newuser.save();
        return res.status(201).json({message:"User created successfully",success:true,newuser});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
    }
}

let getusers=async(req,res)=>{
    try {
        let users=await usermodel.find();
        return res.status(200).json({message:"Users fetched successfully",success:true,users});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
    }
}
let deleteuser=async(req,res)=>{
    try{
let userid = req.params.id;
let deleteduser=await usermodel.findByIdAndDelete(userid);
return res.status(200).json({message:"User deleted successfully",success:true,deleteduser});
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
    }
}
let getuserbyid=async(req,res)=>{
    try{
let userid = req.params.id;
let addeduser=await usermodel.findById(userid);
return res.status(200).json({message:"User added successfully",success:true,addeduser});
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
    }
}

let updateuser=async(req,res)=>{
    try{
let userid = req.params.id;
let updateddata=req.body;
let updateduser=await usermodel.findByIdAndUpdate(userid,updateddata,{new:true});
return res.status(200).json({message:"User updated successfully",success:true,updateduser});
    }
    catch(error){
        return res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
    }
}
export {postuser,getusers, deleteuser,getuserbyid,updateuser};