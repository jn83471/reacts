import jwt from "jsonwebtoken"
import Users from "../models/Users.js";
import { Error } from "mongoose";
const CheckAuth=async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        //console.log(req.headers.authorization)
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

            req.usuario=await Users.findById(decoded.id).select("-password -verify -token -createdAt -updatedAt")

            return next();
        }
        catch(errors){
            res.status(404).json({msg: "Hubo un error"});
        }
        
    }
    if(!token){
        const error=new Error('Token no valido');
        res.status(401).json({msg: error.message});
    }
    next();
}
export default CheckAuth;