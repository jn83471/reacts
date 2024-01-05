import { FormProyects } from "../components/FormProyects"
import { useProyects } from "../hook/useProyects"

export const AddProyects = () => {
  
  return (
    <>
    <h1 className="text-4xl font-black">
        Crear proyecto
    </h1>
    <div className="mt-10 flex justify-center">
        <FormProyects/>
    </div>
    </>
  )
}
