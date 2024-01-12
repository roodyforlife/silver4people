import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../../components/UI/Button/Button'
import { Input } from '../../../../../components/UI/Input/Input'
import formCl from '../../../../../styles/Form.module.css';
import { createCategory } from '../../../http/categoryApi';
import cl from './CategoryCreateForm.module.css';

export interface ICategoryCreateFormData {
    name:string,
  }
  
  interface IProps {
    fetchCategories: () => void
  }

export const CategoryCreateForm = ({fetchCategories}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues } = useForm<ICategoryCreateFormData>()
  
    const onSubmit = async (data:ICategoryCreateFormData) => {
      await createCategory(data).then(() => fetchCategories())
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'name'}
          rules={{
            required: "Введіть назву категорії",
            maxLength: {
              value: 20,
              message: 'Максимальна довжина категорії повинна бути не більше 20'
            },
            minLength: {
              value: 5,
              message: 'Мінімальна довжина не повинна бути менша за 5'
            },
          }}
          render={({ field }) => (
            <Input label={"Назва"} inputType="text" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.name?.message}</p>
      </div>
      <Button type="submit">Створити</Button>
    </form>
      </div>
    )
}
