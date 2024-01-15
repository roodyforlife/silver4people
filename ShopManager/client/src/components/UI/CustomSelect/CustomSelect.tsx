import React from 'react'
import { Control, Controller, ControllerRenderProps, FieldValues, Path, PathValue } from 'react-hook-form';
import Select from 'react-select';
import { DARK_GRAY_COLOR, GRAY_COLOR, MAIN_COLOR, RED_COLOR, } from '../../../Admin/consts'
import { ISelect } from '../../../Admin/utils/SelectUtils/getSelectsItems'
import cl from './CustomSelect.module.css';

interface IProps <T extends FieldValues, TName extends Path<T>> {
    multiple?: boolean;
    items: ISelect[];
    label: string,
    control:Control<T, any>,
    name: Path<T>,
  }

  const customStyles = {
    control: (baseStyles:any, {isFocused}:any) => ({
        ...baseStyles,
        border: `1px solid ${DARK_GRAY_COLOR}`,
        ':hover': {
            border: `1px solid ${DARK_GRAY_COLOR}`,
        },
        boxShadow: isFocused && 'none',
        width: '100%'
    }),
    option: (styles:any, {isFocused, isSelected}:any) => ({
        ...styles,
        background: isFocused ? GRAY_COLOR : isSelected ? MAIN_COLOR : 'white',
        color: 'black'
    }),
    multiValueRemove: (styles:any, {data}:any) => ({
        ...styles,
        ':hover': {
            background: RED_COLOR,
        },
    }) 
}

export const CustomSelect = <T extends FieldValues, TName extends Path<T>>({name, control, multiple = false, items, label}:IProps<T, TName>) => {
  return (
    <Controller
        control={control}
        name={name}
        render={({ field}) => (
            <div className={cl.content}>
            <label>{label}</label>
            <Select
                options={items as PathValue<T, TName>}
                isMulti={multiple}
                styles={customStyles}
                noOptionsMessage={() => "Нічого не знайдено"}
                closeMenuOnSelect={!multiple}
                hideSelectedOptions={false}
                {...field}
            ></Select>
            </div>
        )}></Controller>
  )
}
