import mongoose from "mongoose";

const convoSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message",default:[] }],
},{timestamps:true})

const convomodel = new mongoose.model('convo',convoSchema)
export default  convomodel