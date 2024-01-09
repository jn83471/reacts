import { Link } from "react-router-dom"

export const PreviewProyect = ({proyect}) => {
  const  {nombre,_id,description,delivery,client}=proyect
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1 font-bold">
            {nombre}
            <span className="font-normal text-sm text-gray-500 uppercase">{' '}{client}</span>
        </p>

        <Link to={`${_id}`} className="text-gray-600  hover:text-gray-800 uppercase text-sm font-bold">Ver Proyecto</Link>
    </div>
  )
}
