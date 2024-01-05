import { useState } from "react"
import { useProyects } from "../hook/useProyects"
import { AlertComponent } from "./AlertComponent"
//usar guion medio paraseparar palabras
export const FormProyects = () => {
    const [nombre,SetNombre]=useState("")
    const [description,SetDescription]=useState("")
    const [delivery,SetDelivery]=useState("")
    const [client,SetClient]=useState("")


    const {ShowAlert,Alert,CreateProyect}=useProyects()

    const HandleSubmit=async (e)=>{
        e.preventDefault()
        if([nombre,description,delivery,client].includes("")){
            ShowAlert({msg:"Todos los Campos son obligatorios",error:true})
            return
        }
        await CreateProyect({nombre,description,delivery,client})

        SetNombre("")
        SetDescription("")
        SetDelivery("")
        SetClient("")
    }

    


  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={HandleSubmit}>
        {Alert.msg && <AlertComponent  Alert={Alert}/>}
        <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre de proyecto</label>
            <input id="nombre" type="text" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={e=>SetNombre(e.target.value)} />
        </div>
        <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Descripcion</label>
            <textarea id="nombre" type="text" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={description} onChange={e=>SetDescription(e.target.value)} />
        </div>
        <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre de proyecto</label>
            <input id="nombre" type="date" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={delivery} onChange={e=>SetDelivery(e.target.value)} />
        </div>
        <div className="mb-5">
            <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre de Cliente</label>
            <input id="nombre" type="date" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={client} onChange={e=>SetClient(e.target.value)} />
        </div>
        <input type="submit" value="crear proyecto" className="w-full bg-sky-600 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" />
    </form>
  )
}
