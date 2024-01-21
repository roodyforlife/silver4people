import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import cl from './CategoryEditForm.module.css';
import formCl from '../../../../../styles/Form.module.css';
import { Input } from '../../../../../components/UI/Input/Input';
import { Button } from '../../../../../components/UI/Button/Button';
import { Guid } from 'guid-typescript';
import { editCategory } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import { Loader } from '../../../../../components/UI/Loader/Loader';
import { toast } from 'react-toastify';

export interface ICategoryEditFormData {
    id: string,
    name:string,
  }
  
  interface IProps {
    fetchCategories: () => void,
    handleCloseEditModal: () => void,
    category?: ICategory,
  }

export const CategoryEditForm = ({fetchCategories, handleCloseEditModal, category}:IProps) => {
    const { handleSubmit, control, formState: {errors} } = useForm<ICategoryEditFormData>();
    const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:ICategoryEditFormData) => {
        if (category !== undefined) {
            setLoading(true);
            await editCategory({...data, id: category.id}).then(() => {
                fetchCategories();
                toast.success("Категорія успішно відредагована");
                handleCloseEditModal();
            }).catch(() => {
              toast.error("Невідома помилка")
            }).finally(() => setLoading(false));
        }
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'name'}
          defaultValue={category?.name}
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
      <div className={formCl.buttons}>
        <Button type="button" variant='secondary' onClick={handleCloseEditModal}>Закрити</Button>
        <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Редагувати"}</Button>
      </div>
    </form>
      </div>
    )
}
