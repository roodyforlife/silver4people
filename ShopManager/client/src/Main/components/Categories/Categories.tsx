import React from 'react'
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../consts';
import { ICategory } from '../../pages/MainPage/MainPage'
import cl from './Categories.module.css';

interface IProps {
    items: ICategory[],

}

export const Categories = ({items}:IProps) => {
  return (
    <div className={cl.wrapper}>
        <div className={cl.content}>
            <div className={cl.header}>
                <h4>Категорії</h4>
            </div>
            <div className={cl.items}>
                {items.map((item) =>
                    <div className={cl.item} key={item.id}><NavLink to={MAIN_ROUTE + `?category=${item.id}`}>{item.name}</NavLink></div>
                )}
            </div>
        </div>
    </div>
  )
}
