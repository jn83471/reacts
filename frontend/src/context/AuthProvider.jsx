import { createContext, useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";

const AuthContext = createContext()

const AuthProvider=({children})=>{

    const [auth,SetAuth] = useState({})


    useEffect(()=>{
        const token=localStorage.getItem('token')
        
        const AutenticateUser=async ()=>{
            if(!token){
                return 
            }
            try {
                const user=await ClientAxios('/users/profile')
            } catch (error) {
                
            }
        }
        AutenticateUser();
    },[])

    return(<AuthContext.Provider
    value={{
        SetAuth
    }}>
        {children}
    </AuthContext.Provider>)
}
export {
    AuthProvider
}
export default AuthContext;