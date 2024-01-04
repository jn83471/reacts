import { Link } from "react-router-dom"
import { useAuth } from "../hook/useAuth"

export const Sidebar = () => {
    const {auth}=useAuth()
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-xl font-bold">Hola: {auth.nombre}</p>
        <Link to={'/proyects/AddProyects'} className="bg-sky-600 w-full p-3 text-white uppercase font-bold block m-5 text-center rounded-lg">Crear proyectos</Link>
    </aside>
  )
}
