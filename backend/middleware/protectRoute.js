import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';

const protectroute = async (req,res,next) =>{
   try {
    const token = req.cookies.token;
    if (!token) {
       return res.status(404).json({message: "kindly login first to perforrm this task"})
    }
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    if(!decoded){
        return res.status(404).json({message: "Invalid token"})
    }
    const user = await userModel.findById(decoded.userid);
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    req.user = user;
    next();
   } catch (error) {
    console.log('error:',error.message)
    res.status(450).json({error: error.message,err:"protectroute prob"})
   }
}

export default protectroute