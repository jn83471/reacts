import { createContext, useContext, useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";
import { Navigate, useNavigate } from "react-router-dom";

const ProyectsContext=createContext()

const ProyectsProvider=({children})=>{
    const [proyects,SetProyects]=useState([])
    const [proyect,SetProyect]=useState({})
    const [Alert,SetAlert]=useState({})


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
            SetProyects([...proyects,data])
            setTimeout(() => {
                SetAlert({})
                Navigate("/proyects")
            }, 3000);
        } catch (error) {
            
        }
    }

    const GetProyects=async ()=>{
        try {
            const token=localStorage.getItem("token")
            if(!token) return
            const config={
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            const {data}=await ClientAxios.get("/proyects",config)
            SetProyects(data)
        } catch (error) {
            
        }
    }

    const GetProyectsByid=async (id)=>{
        try {
            const token=localStorage.getItem("token")
            if(!token) return
            const config={
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            const {data}=await ClientAxios.get(`/proyects/${id}`,config)
            SetProyect(data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        GetProyects()
    },[])

    return <ProyectsContext.Provider value={{proyects,Alert,ShowAlert,CreateProyect,proyect,GetProyectsByid}}>
        {children}
    </ProyectsContext.Provider>
}

export {
    ProyectsProvider
}
export default ProyectsContext;