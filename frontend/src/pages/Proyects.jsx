import { PreviewProyect } from "../components/PreviewProyect";
import { useAuth } from "../hook/useAuth"
import { useProyects } from "../hook/useProyects"

export const Proyects = () => {

    const {proyects}=useProyects();
    console.log(proyects)
  return (
    <>
    <h1 className="text-4xl font-black">
        Proyectos
    </h1>
    <div className="bg-white shadow mt-10 rounded-lg p-5">
      {proyects.length >0? 
        proyects.map(x=><PreviewProyect key={x._id} proyect={x}/>)
      :<p className="mt-5 text-center text-gray-600 uppercase">No hay proyectos</p>}
    </div>
    </>
  )
}
