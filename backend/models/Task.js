import mongoose from "mongoose";

const TaksSchema =mongoose.Schema( {
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
    state:{
        type:Boolean,
        default: false
    },
    Delivery:{
        type: Date,
        required: true,
        default: Date.now()
    },
    Priority:{
        type:String,
        required: true,
        enum: ['Baja','Media','Alta']
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'proyects'
    }
},{
    timestamps: true
})
const Tasks=mongoose.model("task",TaksSchema)
export default Tasks;