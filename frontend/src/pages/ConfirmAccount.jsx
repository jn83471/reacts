import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { AlertComponent } from "../components/AlertComponent";
import ClientAxios from "../config/ClientAxios";

export const ConfirmAccount = () => {
    const params= useParams();
    const [ConfirmAccount,SetConfirmAccount]=useState(false)


    const [Alert, SetAlert]=useState("");

    const {msg}=Alert
    const {id}=params
    useEffect(()=>{
        (async ()=>{
            try {
                const Url=`/users/confirm/${id}`
                const {data}=await ClientAxios(Url)
                SetAlert({msg:data.msg,error:false})
                SetConfirmAccount(true)

            } catch (error) {
                SetAlert({msg:error.response.data.msg,error:true})
            }
        })()
    },[])
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">Crea tu cuenta y comienza a crear tus {''} <span className="text-slate-700 capitalize">proyectos</span> </h1>
            {msg && <AlertComponent Alert={Alert}/>}

            {ConfirmAccount && <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/"> Inicio</Link> }
        </>
    )
}
