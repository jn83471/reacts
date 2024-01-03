import { useState } from "react"
import { Link } from "react-router-dom"
import { AlertComponent } from "../components/AlertComponent"
import axios from "axios"
import ClientAxios from "../config/ClientAxios"

export const ForgePassword = () => {
    const [email,SetEmail]=useState("")

    const HandleSubmit=async (e)=>{
        e.preventDefault();
        if(email===""){
            SetAlert({msg:"Todos los campos son obligatorios",error:true})
            return
        }
        if(email.length<6){
            SetAlert({msg:"Debe contener el email minimo 6 caracteres",error:true})
            return
        }
        try {
            // const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgetPassword`,{email})
            const {data}=await ClientAxios.post(`/users/forgetPassword`,{email})
            SetAlert({msg:"Se ha enviado ha su correo",error:false})
        } catch (error) {
            console.log(error)
            SetAlert({msg:error.response.data.msg,error:true})
        }
    }


    const [Alert, SetAlert]=useState("");
    const {msg}=Alert
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">Recupera tu acceso y no pierdas tus proyectos {''} <span className="text-slate-700 capitalize">proyectos</span> </h1>
            {msg && <AlertComponent Alert={Alert}/>}
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={HandleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email} onChange={(e)=>SetEmail(e.target.value)} />
                </div>
                <input type="submit" value="Enviar instrucciones" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Ya tienes una cuenta? Inicia</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/register">No tienes una cuenta? Resistrate</Link>

            </nav>
        </>
    )
}
