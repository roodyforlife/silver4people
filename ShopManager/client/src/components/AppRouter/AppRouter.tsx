import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Context } from '../..'
import { Navbar } from '../../Admin/components/Navbar/Navbar'
import { authRoutes, publicRoutes } from '../../routes'

export const AppRouter = observer(() => {
    const contextValue = useContext(Context);
    const user = contextValue!.user;
  return (
    <div>
        {user.isAuth ?
            <Navbar>
              <Routes>
                  {authRoutes.map(({path, Component, roles}) => 
                    roles && roles.includes(user.user.role) && <Route path={path} key={path} element={<Component />} />
                  )}
              </Routes>
            </Navbar>
        :
        <Routes>
          {publicRoutes.map(({path, Component}) => <Route path={path} element={<Component />} key={path}/> )}
        </Routes>       
        }
    </div>
  )
});
