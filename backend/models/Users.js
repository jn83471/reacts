import mongoose from "mongoose";

import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    token: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
UserSchema.pre("save", async function (next) {
    //evita hashear lo hashedo
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comprobatePass = async function (passwordForm) {
    console.log(await bcrypt.compare(this.password, passwordForm));
    console.log(passwordForm);
    console.log(this.password);
    return await bcrypt.compare(passwordForm,this.password);
}

const Users = mongoose.model("User", UserSchema)

export default Users;