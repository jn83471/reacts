import { useParams } from "react-router-dom"
import { useProyects } from "../hook/useProyects"
import { useEffect } from "react"

export const Proyect = () => {

    const params = useParams()

    const {GetProyectsByid,proyect }=useProyects()

    const {nombre}=proyect
    
    useEffect(()=>{
        GetProyectsByid(params.id)
    },[])
    return (
        <div>
            <h1 className="font-black text-4xl">{nombre}</h1>
        </div>
        
    )
}
