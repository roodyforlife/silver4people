import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../..'
import { authRoutes, publicRoutes } from '../../routes'

export const AppRouter = () => {
    const contextValue = useContext(Context);
    const user = contextValue!.user;
    
  return (
    <div>
        {user.isAuth ?
          <Routes>
            {authRoutes.map(({path, Component}) => <Route path={path} key={path} element={Component} /> )}
          </Routes>
        :
        <Routes>
          {publicRoutes.map(({path, Component}) => <Route path={path} element={<Component></Component>} key={path}/> )}
        </Routes>       
        }
    </div>
  )
}
