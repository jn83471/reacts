import { useAuth } from "../hook/useAuth"
import { useProyects } from "../hook/useProyects"

export const Proyects = () => {

    const {proyects}=useProyects();
  return (
    <>
    <h1 className="text-4xl font-black">
        Proyectos
    </h1>
    <div>

    </div>
    </>
  )
}
