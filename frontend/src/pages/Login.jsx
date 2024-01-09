import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AlertComponent } from "../components/AlertComponent"
import ClientAxios from "../config/ClientAxios"
import { useAuth } from "../hook/useAuth"

export const Login = () => {

  const {SetAuth}=useAuth()

  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")

  const [Alert, SetAlert] = useState("");
  const { msg } = Alert
  
  const Navigate=useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if ([email.trim(), password.trim()].includes("")) {
      SetAlert({ msg: "Todos los campos son obligatorios", error: true })
      return
    }
    if(email.length<6){
      SetAlert({msg:"El correo no puede tener menos de 6 caracteres",error:true})
      return
    }
    if(password.length<6){
      SetAlert({msg:"El correo no puede tener menos de 6 caracteres",error:true})
      return
    }
    try {
      const  {data}=await ClientAxios.post("/users/login",{email,password})
      localStorage.setItem("token",data.token)
      SetAlert({})
      SetAuth(data)
      Navigate("/proyects")
    } catch (error) {
      SetAlert({msg:error.response.data.msg,error:true})
    }
  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl text-center">Iniciar sesion y administra tus <span className="text-slate-700 capitalize">proyectos</span> </h1>
      {msg && <AlertComponent Alert={Alert}/>}
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={HandleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email} onChange={e => SetEmail(e.target.value)} />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Password de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password} onChange={e => SetPassword(e.target.value)} />
        </div>
        <input type="submit" value="Iniciar Sesion" className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="register">No tienes una cuenta? Resistrate</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="forget">Olvide mi contraseña</Link>

      </nav>
    </>
  )
}
