import React, { useMemo, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../../../../components/UI/Button/Button'
import { CustomSelect } from '../../../../components/UI/CustomSelect/CustomSelect';
import { Input } from '../../../../components/UI/Input/Input'
import formCl from '../../../../../styles/Form.module.css';
import { getCategoryFullName } from '../../../../utils/getCategoryFullName';
import { getSelectsCategoryItems, ISelect } from '../../../../utils/SelectUtils/getSelectsItems';
import { createCategory, getCategoriesWithoutParent } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import cl from './CategoryCreateForm.module.css';
import { toast } from 'react-toastify';
import { Loader } from '../../../../components/UI/Loader/Loader';

export interface ICategoryCreateFormData {
    name:string,
    parentCategoryId:number,
}

export interface IForm {
  name:string,
  parentCategoryId:ISelect,
}

  interface IProps {
    fetchCategories: () => void,
    handleCloseCreateModal: () => void,
  }

export const CategoryCreateForm = ({fetchCategories, handleCloseCreateModal}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues, setValue} = useForm<IForm>();
    const [categories, setCategories] = useState<ICategory[]>([])
    const [mainLoading, setMainLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
  
    const onSubmit = async (data:IForm) => {
      setLoading(true);
      await createCategory({...data, parentCategoryId: +data.parentCategoryId?.value}).then(() => {
        fetchCategories();
        toast.success("Категорія успішно створена");
        handleCloseCreateModal();
      }).catch(() => {
        toast.error("Невідома помилка")
      }).finally(() => setLoading(false))
    }

    const selectItems = useMemo<ISelect[]>(() => {
      return getSelectsCategoryItems(categories);
    }, [categories]);

    const fetchChildrenCategories = async () => {
      setMainLoading(true);
      await getCategoriesWithoutParent().then((data) => setCategories(data)).finally(() => setMainLoading(false));
    }

    useEffect(() => {
      fetchChildrenCategories();
    }, [])
  
    return (
      <div>
        {mainLoading && <Loader />}
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
          <CustomSelect name="parentCategoryId" control={control} label={"Батьківська категорія"} multiple={false} items={selectItems}/>
        <p style={{color: 'red'}}>{errors.parentCategoryId?.message}</p>
      </div>
      <div className={formCl.buttons}>
        <Button type="button" onClick={handleCloseCreateModal} variant='secondary'>Закрити</Button>
        <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Створити"}</Button>
      </div>
    </form>
      </div>
    )
}
