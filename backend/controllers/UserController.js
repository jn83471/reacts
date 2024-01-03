
import { Error } from "mongoose";
import Users from "../models/Users.js"
import GenerateId from "../helpers/GenerateId.js";
import GenerateJWT from "../helpers/GenerateJWT.js";
import { ForgetPasswordEmail, RegisterEmail } from "../helpers/Emails.js";

const User=(req,res)=>{
    res.send("Desde api de usuarios controller")
}

const CreateUser=async (req,res)=>{
    //Evitar registros duplicados
    const {email} = req.body;
    const checkUsers= await Users.findOne({email});

    if(checkUsers){
        const error =new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }
    try {
        const Usr= new Users(req.body);
        Usr.token=GenerateId();

        const StorageUser= await Usr.save();

        //enviar email

        RegisterEmail({email:StorageUser.email,
                        nombre: StorageUser.nombre,
                        token:StorageUser.token});

        return res.json({msg:"Usuario generado automaticamente."});
    } catch (error) {
        console.log(error)
        return res.json({msg:"No se ha podido generar el usuario"});
    }

    //console.log(req.body)
    //res.send("Desde api de crear usuarios controller")
}
const LoginUser=async (req,res)=>{
    //check email
    const {email,password} = req.body;
    const checkUsers= await Users.findOne({email});
    
    if(!checkUsers){
        const error =new Error("Usuario no existe");
        return res.status(400).json({msg: error.message});
    }
    //user confirm
    if(!checkUsers.verify){
        const error =new Error("Usuario no confirmado");
        return res.status(400).json({msg: error.message});
    }

    //check password
    if(!await checkUsers.comprobatePass(password)){
        const error =new Error("Contraseña y/o usuario no valida");
        return res.status(400).json({msg: error.message});
    }
    else{
        return res.json({
            _id: checkUsers._id,
            nombre: checkUsers.nombre,
            email: checkUsers.email,
            token: GenerateJWT(checkUsers._id)
        });
    }

}
const confirmUser=async (req,res)=>{
    //return res.send(req.params);
    const {token}= req.params;
    const confirmUsers=await Users.findOne({token})
    if(!confirmUsers){
        const error =new Error("Token no valido");
        return res.status(400).json({msg: error.message});
    }

    try {
        confirmUsers.verify=true;
        confirmUsers.token="";
        await confirmUsers.save();
        return res.json({msg: "Usuario confirmado correctamente"})
    } catch (errors) {
        const error =new Error("Ha ocurrido un error en la autentificacion");
        return res.status(400).json({msg: error.message});
    }

}

const ForgetPassword=async(req,res)=>{
    const {email}= req.body;
    const confirmUsers=await Users.findOne({email})
    if(!confirmUsers){
        const error =new Error("Correo no valido");
        return res.status(400).json({msg: error.message});
    }
    confirmUsers.token=await GenerateId();
    await confirmUsers.save();

    ForgetPasswordEmail({email,
        nombre: confirmUsers.nombre,
        token:confirmUsers.token});

    return res.json({token:confirmUsers.token});
}
const ComprobateToken=async (req,res)=>{
    const {token}= req.params;
    const confirmUsers=await Users.findOne({token})
    if(!confirmUsers){
        const error =new Error("Token no valido");
        return res.status(400).json({msg: error.message});
    }

    try {
        return res.json({msg: "Token valido"})
    } catch (errors) {
        const error =new Error("Ha ocurrido un error en la autentificacion");
        return res.status(400).json({msg: error.message});
    }
}

const ChangePassword=async (req,res)=>{
    const {token}= req.params;
    const {password} =req.body;
    const confirmUsers=await Users.findOne({token})
    if(confirmUsers){
        confirmUsers.password=password;
        confirmUsers.token="";
        try {
            await confirmUsers.save();
            return res.json({msg: "Password modificada"})
        } catch (errors) {
            const error =new Error("Ha ocurrido un error en la autentificacion");
            return res.status(400).json({msg: error.message});
        }
    }
    else{
        const error =new Error("Token no valida");
        return res.status(400).json({msg: error.message});
    }
}
const Profile=async (req,res )=>{
    const {usuario}=req;
    return res.json(usuario);
}

export {User,CreateUser,LoginUser,confirmUser,ForgetPassword,ComprobateToken,ChangePassword,Profile}