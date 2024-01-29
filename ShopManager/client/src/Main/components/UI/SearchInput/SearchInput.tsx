import React from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import cl from './SearchInput.module.css';

interface IProps <T extends FieldValues, TName extends Path<T>> {
    field?:ControllerRenderProps<T, TName>,
    placeholder?:string,
    disabled?: boolean,
    callback: () => void
}

export const SearchInput = <T extends FieldValues, TName extends Path<T>>(props:IProps<T, TName>) => {
  return (
    <div className={cl.input}>
      <input type="text" placeholder={props.placeholder} disabled={props.disabled} {...props.field}></input>
      <button onClick={props.callback}>Знайти</button>
    </div>
  )
}