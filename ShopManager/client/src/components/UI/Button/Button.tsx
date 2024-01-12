import React, {ReactNode} from 'react'
import { PenSVG } from '../../../Admin/components/UI/PenSVG/PenSVG';
import cl from './Button.module.css';

interface IProps {
  type:ButtonType,
  variant?:ButtonColorType,
  children:ReactNode,
  onClick?:() => void
}

type ButtonType = "submit" | "button";
type ButtonColorType = "primary" | "secondary" | "danger" | "warning"

export const Button = (props:IProps) => {
  const variantColors: Record<ButtonColorType, string> = {
    primary: "rgb(124, 181, 255)",
    secondary: "rgb(230, 230, 230)",
    danger: "rgb(255, 124, 124)",
    warning: "rgb(255, 231, 124)",
  };

  const backgroundColor = props.variant ? variantColors[props.variant] : "transparent";

  const buttonStyle: React.CSSProperties = {
    backgroundColor,
  };

  return (
    <button onClick={props.onClick} style={buttonStyle} className={cl.button}>{props.children}</button>
  )
}
