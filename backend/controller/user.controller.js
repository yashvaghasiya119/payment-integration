import user from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
 const {username,email,password} = req.body;

 const userfind = await user.findOne({email})

 if(userfind){
    return res.status(400).json({message:"User already exists"})
 }

  try {

    const userCreate = await user.create({
        username,
        email,
        password    
     })
    
     return res.json({message:"User created successfully"})
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }

}

export async function loginUser(req,res){

    const {email,password} = req.body;

    const userfind = await user.findOne({email})
 if(!userfind){
    return res.json({msg:"invalid email"})
 }

 const checkpass = await user.findOne({email,password})
 if(!checkpass){
    return res.json({msg:'invalid password'})
 }

 const token = jwt.sign({id:userfind._id,email:userfind.email},"yash")

 res.cookie("usertoken",token)
    
 return res.json({msg:"login successful"})
}
