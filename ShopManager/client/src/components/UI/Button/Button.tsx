import React, {ReactNode} from 'react'
import cl from './Button.module.css';

interface IProps {
  type:ButtonType,
  children:ReactNode
}

type ButtonType = "submit";

export const Button = (props:IProps) => {
  return (
      <button className={cl.button}>{props.children}</button>
  )
}
