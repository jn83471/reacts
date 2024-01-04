import React from 'react'
import { useContext } from 'react'
import ProyectsContext from '../context/ProyectsProvider'

export const useProyects = () => {
  return useContext(ProyectsContext)
}
