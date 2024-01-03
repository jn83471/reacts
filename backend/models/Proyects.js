import mongoose, { Mongoose } from "mongoose";

const ProyectSchema=mongoose.Schema({
    nombre:{
        type:String,
        trim: true,
        required: true
    },
    description:{
        type:String,
        trim: true,
        required: true
    },
    client:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    colaborators:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }],
},{
    timestamps: true
})

const Proyect= mongoose.model("proyects",ProyectSchema)

export default Proyect;