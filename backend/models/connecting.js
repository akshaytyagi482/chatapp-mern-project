import mongoose from 'mongoose'
 const connectiondb = async () =>{
    try {
        await mongoose.connect(process.env.Mongo_DB);
        console.log("connected to database");
    } catch (error) {
        console.log(error.message)
    }
}
export default connectiondb