import userModel from "../models/user.model.js";

export const getuserside = async (req,res) =>{
    try {
    const user = req.user;
    const othetusers =  await userModel.find({
        _id: {$ne: user._id}
    }).select("-password")
    res.status(200).json(othetusers)    
} catch (error) {
    console.log("error:",error.message)
    res.status(350).json({error: "sidebaruser controller problem"})
}
}