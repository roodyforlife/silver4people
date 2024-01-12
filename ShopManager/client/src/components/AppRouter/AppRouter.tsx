import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../..'
import { Navbar } from '../../Admin/components/Navbar/Navbar'
import { authRoutes, publicRoutes } from '../../routes'

export const AppRouter = () => {
    const contextValue = useContext(Context);
    const user = contextValue!.user;
    
  return (
    <div>
        {user.isAuth ?
            <Navbar>
              <Routes>
                  {authRoutes.map(({path, Component}) => <Route path={path} key={path} element={<Component></Component>} /> )}
              </Routes>
            </Navbar>
        :
        <Routes>
          {publicRoutes.map(({path, Component}) => <Route path={path} element={<Component></Component>} key={path}/> )}
        </Routes>       
        }
    </div>
  )
}
