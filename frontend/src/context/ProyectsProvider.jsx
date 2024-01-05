import { createContext, useContext, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import { Navigate, useNavigate } from "react-router-dom";

const ProyectsContext=createContext()

const ProyectsProvider=({children})=>{
    const [proyects,SetProyects]=useState([])
    const [Alert,SetAlert]=useState([])


    const Navigate=useNavigate();

    const ShowAlert=(alerta)=>{
        SetAlert(alerta)
        setTimeout(() => {
            SetAlert({})
        }, 5000);
    }

    const CreateProyect=async (proyect)=>{
        try {
            const token=localStorage.getItem("token")
            if(!token) return
            const config={
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            const {data}=await ClientAxios.post("/proyects",proyect,config)
            SetAlert({msg:"Proyecto creado correctamente",error:false})

            setTimeout(() => {
                SetAlert({})
                Navigate("/proyects")
            }, 3000);
        } catch (error) {
            
        }
    }

    return <ProyectsContext.Provider value={{proyects,Alert,ShowAlert,CreateProyect}}>
        {children}
    </ProyectsContext.Provider>
}

export {
    ProyectsProvider
}
export default ProyectsContext;