import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import createtoken from "../utils/tokengenerator.js";

export const signup = async (req,res) =>{
   try {       
const {fullname,username,password,confirmedpass,gender,profilepic} = req.body;
   const alreadyexist = await userModel.findOne({username})
   if(alreadyexist){
    return res.status(400).json({message:"username already exist"})
   } 
   if(password != confirmedpass){
    return res.status(400).json({message:"passwords do not match"})
}
const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`
   bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash) => {
            if(err){
                return res.status(450).json({error:"hash not generated",
                    message:err.message
                })
            } else{
                let user = await new userModel({
                    fullname,
                    username,
                    password:hash,
                    gender,
                    profilepic:gender === "male"? boyprofilepic : girlprofilepic
                   })
                   await createtoken(user.id,res)
                   await user.save()
                   res.status(201).json({message:"user created successfully",
                    id:user._id,
                    fullname: user.fullname,
                    username: user.username,
                    profilepic: user.profilepic
                })
                }
        })
                  
   })
   
} catch (error) {
    console.log(error.message)
    res.status(500).json({error:"server side error",
        message:error.message})
}}

export const login = async (req,res) => {
    try {
    const {username,password} = req.body 
    const user = await userModel.findOne({username})
    if(req.cookies.token == ""){
        return res.status(400).json({message:"already logged in"})
    }
    if(!user){
        return res.status(404).json({message:"user not found"}) 
    }
    bcrypt.compare(password,user.password,(err,result)=>{
       if(err){ 
        return res.status(400).json({error:"bcrypt error",})
       }
       if(result){
        createtoken(user.id,res)
        res.status(200).json({message:"logged in successfully",
            id:user._id,
            username: user.username,
            fullname:user.fullname,
            profilepic: user.profilepic
        })
       }
    })
    } catch (error) {
    console.log(error.message)
    res.status(500).json({error:"login side error",
    message:error.message})
        
    }
}
export const logout = (req,res) => {
    req.cookies.token = ""
    res.status(200).json({message:"logged out successfully"})
}