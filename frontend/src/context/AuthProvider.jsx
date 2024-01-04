import { createContext, useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider=({children})=>{

    const [auth,SetAuth] = useState({})
    const [load,SetLoad]=useState(true);

    const Navigate= useNavigate()


    useEffect(()=>{
        const token=localStorage.getItem('token')
        
        const AutenticateUser=async ()=>{
            if(!token){
                SetLoad(false)
                Navigate("/proyects")
                return 
            }
            try {
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                const {data}=await ClientAxios('/users/profile',config)
                console.log(data);
                SetAuth(data)
                SetLoad(false)
                
            } catch (error) {
                SetAuth({})
                SetLoad(false)
                Navigate("/proyects")
            }
        }
        AutenticateUser();
    },[])

    return(<AuthContext.Provider
    value={{
        auth
        ,load
        ,SetAuth
    }}>
        {children}
    </AuthContext.Provider>)
}
export {
    AuthProvider
}
export default AuthContext;