import { createContext, useContext, useState } from "react";

const ProyectsContext=createContext()

const ProyectsProvider=({children})=>{
    const [proyects,SetProyects]=useState([])
    return <ProyectsContext.Provider value={{proyects}}>
        {children}
    </ProyectsContext.Provider>
}

export {
    ProyectsProvider
}
export default ProyectsContext;