import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom';
import { ADMIN_CATEGORIES_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_USERS_ROUTE } from '../../Content/consts';
import cl from './Navbar.module.css';

interface IProps {
    children:ReactNode
}

interface ILink {
    path:string,
    name:string
}

export const Navbar = (props:IProps) => {
    const links:ILink[] = [
        {path: ADMIN_PRODUCTS_ROUTE, name: "Товари"},
        {path: ADMIN_CATEGORIES_ROUTE, name: "Категорії"},
        {path: ADMIN_USERS_ROUTE, name: "Аккаунти"},
    ]

  return (
    <div className={cl.container}>
        <div className={cl.navbar}>
            <nav>
                {links.map(({path, name}) => <ul key={path}><NavLink to={path}>{name}</NavLink></ul>)}
            </nav>
        </div>
        <div className={cl.content}>
            {props.children}
        </div>
    </div>
  )
}