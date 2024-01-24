import React from 'react'
import cl from './Input.module.css';

interface IProps {
    type: InputType,
}

type InputType = "text" | "search";

export const Input = ({type}:IProps) => {
  return (
    <div className={cl.input}>
        <input type={type === "search" ? 'text' : type} />
        {type === "search" && <button type='submit' className={cl.searchButton}>Search</button>}
    </div>
  )
}
