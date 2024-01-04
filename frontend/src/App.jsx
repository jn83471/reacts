import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthLayout } from './layouts/AuthLayout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgePassword } from './pages/ForgePassword'
import { NewPassword } from './pages/NewPassword'
import { ConfirmAccount } from './pages/ConfirmAccount'
import { AuthProvider } from './context/AuthProvider'
import { ProyectsProvider } from './context/ProyectsProvider'
import { Proyects } from './pages/Proyects'
import { ProtectedRoutes } from './layouts/ProtectedRoutes'
import { AddProyects } from './pages/AddProyects'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />} >
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forget' element={<ForgePassword />} />
              <Route path='forget/:token' element={<NewPassword />} />
              <Route path='confirmAccount/:id' element={<ConfirmAccount />} />
            </Route>

            <Route path='/proyects' element={<ProtectedRoutes />}>
              <Route index element={<Proyects />} />
              <Route path='AddProyects' element={<AddProyects />} />
            </Route>

          </Routes>
        </ProyectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
