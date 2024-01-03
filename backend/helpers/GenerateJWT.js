import jwt from "jsonwebtoken"
const GenerateJWT=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:"30d"
    });
}
export default GenerateJWT;