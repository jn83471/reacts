import { useState } from "react"
import { Link } from "react-router-dom"
import { AlertComponent } from "../components/AlertComponent"
import axios from "axios"
import ClientAxios from "../config/ClientAxios"

export const Register = () => {
    const [nombre,SetNombre]=useState("");
    const [email,SetEmail]=useState("");
    const [password,SetPassword]=useState("");
    const [password2,SetPassword2]=useState("");

    const [Alert, SetAlert]=useState("");
    const {msg}=Alert

    const HandleSubmit=async (e)=>{
        e.preventDefault();
        if([nombre.trim(),email.trim(),password.trim(),password2.trim()].includes("")){
            SetAlert({msg:"Todos los campos son obligatorios",error:true})
            return
        }
        if(password!==password2){
            SetAlert({msg:"Los passwords no son iguales",error:true})
            return
        }
        if(password.length<6){
            SetAlert({msg:"Los passwords no pueden ser menor a 6 caracteres",error:true})
            return
        }
        SetAlert({})
        try {
            const response= await ClientAxios.post('/users',{
                nombre,password,email
            });
            SetAlert({msg:response.data.msg,error:false})
            SetNombre("")
            SetEmail("")
            SetPassword("")
            SetPassword2("")
        } catch (error) {
            SetAlert({msg:error.response.data.msg,error:true})
        }

    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">Crea tu cuenta y crea tus {''} <span className="text-slate-700 capitalize">proyectos</span> </h1>
            {msg && <AlertComponent Alert={Alert}/>}
            <form onSubmit={HandleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre::</label>
                    <input type="text" id="nombre" placeholder="Nombre de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre} onChange={e=>SetNombre(e.target.value)} />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email} onChange={e=>SetEmail(e.target.value)} />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Password de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password} onChange={e=>SetPassword(e.target.value)} />
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir password:</label>
                    <input type="password" id="password2" placeholder="Repite la Password de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password2} onChange={e=>SetPassword2(e.target.value)} />
                </div>
                <input type="submit" value="Crear cuenta" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Ya tienes una cuenta? Inicia</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forget">Olvide mi contraseña</Link>

            </nav>
        </>
    )
}
