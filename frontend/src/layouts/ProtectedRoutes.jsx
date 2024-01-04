import { Outlet } from "react-router-dom"
import { useAuth } from "../hook/useAuth";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const ProtectedRoutes = () => {
    const {auth,load} =useAuth();
    console.log(auth);
    if(load) return "Cargando"
  return (
    <>
        {auth._id ?
        <div className="bg-gray-100">
            <Header/>
            <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="p-10 flex-1">
                    <Outlet/>
                </main>
            </div>
        </div>:<Navigate to={"/"} />}
    </>
  )
}
