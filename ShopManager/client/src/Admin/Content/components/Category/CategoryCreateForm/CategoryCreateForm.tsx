import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../../components/UI/Button/Button'
import { Input } from '../../../../../components/UI/Input/Input'
import { Select } from '../../../../../components/UI/Selects/Select/Select';
import formCl from '../../../../../styles/Form.module.css';
import { getCategoryFullName } from '../../../../utils/getCategoryFullName';
import { createCategory } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import cl from './CategoryCreateForm.module.css';

export interface ICategoryCreateFormData {
    name:string,
    parentCategoryId:number,
  }

export interface ISelect {
  value:string,
  text:string,
}
  
  interface IProps {
    fetchCategories: () => void,
    handleCloseCreateModal: () => void,
    categories:ICategory[],
  }

export const CategoryCreateForm = ({fetchCategories, handleCloseCreateModal, categories}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues, setValue} = useForm<ICategoryCreateFormData>()
  
    const onSubmit = async (data:ICategoryCreateFormData) => {
      await createCategory(data).then(() => { fetchCategories(); handleCloseCreateModal(); })
    }

    const selectItems = useMemo<ISelect[]>(() => {
      const selects: ISelect[] = categories.map((category) => {return {value: category.id, text: getCategoryFullName(category)}});
      return [{ value: "0", text: "None" }, ...selects];
    }, [categories]);
  
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
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'parentCategoryId'}
          render={({ field }) => (
            <Select label="Батьківська категорія" setValue={(value) => setValue('parentCategoryId', +value[0])} multiple={false} items={selectItems}></Select>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.parentCategoryId?.message}</p>
      </div>
      <div className={formCl.buttons}>
        <Button type="button" onClick={handleCloseCreateModal} variant='secondary'>Закрити</Button>
        <Button type="submit" variant='primary'>Створити</Button>
      </div>
    </form>
      </div>
    )
}
