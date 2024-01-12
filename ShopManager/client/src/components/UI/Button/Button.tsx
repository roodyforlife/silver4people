import React, {ReactNode} from 'react'
import cl from './Button.module.css';

interface IProps {
  type:ButtonType,
  children:ReactNode,
  onClick?:() => void
}

type ButtonType = "submit" | "button";

export const Button = (props:IProps) => {
  return (
      <button onClick={props.onClick} className={cl.button}>{props.children}</button>
  )
}
