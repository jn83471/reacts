import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { AlertComponent } from "../components/AlertComponent";
import { useEffect, useState } from "react";
import ClientAxios from "../config/ClientAxios";

export const NewPassword = () => {
    const params =useParams();
    const {token}=params;

    const [tokenValido,SetTokenValido]=useState(false)

    const [password,SetPassword] = useState("");
    
    useEffect(()=>{
        const ComprobateToken=async()=>{
            try {
                const {data}=await ClientAxios(`/users/forgetPassword/${token}`)
                console.log(data);
                SetTokenValido(true)

            } catch (error) {
                SetAlert({msg:error.response.data.msg,error:true})
            }
        }
        ComprobateToken();
        
    },[])
    const [Alert, SetAlert]=useState("");
    const {msg}=Alert


    const HandleSubmit=async (e)=>{
        e.preventDefault();
        if(password.length<6){
            SetAlert({msg:"La contraseña debe ser mayor a 6 caracteres",error:true})
        }
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgetPassword/${token}`,{password})
            SetAlert({msg:data.msg,error:false})
            SetPassword("");
            SetTokenValido(false)

        } catch (error) {
            SetAlert({msg:error.response.data.msg,error:true})
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center">Restablece tu password y no piedas acceso a tus {''} <span className="text-slate-700 capitalize">proyectos</span> </h1>
            {msg && <AlertComponent Alert={Alert}/>}
            {tokenValido && <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={HandleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nuevo Password:</label>
                    <input type="password" id="password" placeholder="Escribe tu nueva contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password} onChange={e=>SetPassword(e.target.value)} />
                </div>
                <input type="submit" value="Cambiar contraseña" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form> }
            <nav className="lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Ya tienes una cuenta? Inicia</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/forget">Olvide mi contraseña</Link>

            </nav>
        </>
    )
}
