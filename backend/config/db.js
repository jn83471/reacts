import mongoose from "mongoose";

export const conectarDb= async()=>{
    try {
        const Connection=await mongoose.connect(process.env.Mongo_Uri);
        const url=`${Connection.connection.host}:${Connection.connection.port}`
        console.log(`conectado a ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
