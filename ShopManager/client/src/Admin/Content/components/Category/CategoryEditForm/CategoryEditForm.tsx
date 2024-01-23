import React, { useMemo, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import cl from './CategoryEditForm.module.css';
import formCl from '../../../../../styles/Form.module.css';
import { Input } from '../../../../components/UI/Input/Input';
import { Button } from '../../../../components/UI/Button/Button';
import { Guid } from 'guid-typescript';
import { editCategory, getCategoriesWithoutParent } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import { Loader } from '../../../../components/UI/Loader/Loader';
import { toast } from 'react-toastify';
import { getSelectsCategoryItems, ISelect } from '../../../../utils/SelectUtils/getSelectsItems';
import { CustomSelect } from '../../../../components/UI/CustomSelect/CustomSelect';

export interface ICategoryEditFormData {
    id: number,
    name:string,
    parentCategoryId: number,
}

interface IForm {
  id: number,
  name:string,
  parentCategory: ISelect,
}
  
  interface IProps {
    fetchCategories: () => void,
    handleCloseEditModal: () => void,
    category?: ICategory,
  }

export const CategoryEditForm = ({fetchCategories, handleCloseEditModal, category}:IProps) => {
    const { handleSubmit, control, formState: {errors} } = useForm<IForm>({defaultValues: {
      name: category?.name,
      parentCategory: category?.parentCategory && {value: category.parentCategoryId?.toString(), label: category.parentCategory?.name},
    }});
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [mainLoading, setMainLoading] = useState<boolean>(false);

    const onSubmit = async (data:IForm) => {
        if (category !== undefined) {
            setLoading(true);
            await editCategory({id: category.id, parentCategoryId: data.parentCategory && +data.parentCategory.value, name: data.name}).then(() => {
                fetchCategories();
                toast.success("Категорія успішно відредагована");
                handleCloseEditModal();
            }).catch(() => {
              toast.error("Невідома помилка")
            }).finally(() => setLoading(false));
        }
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
      {category?.parentCategory &&
      <div className={formCl.item}>
        <CustomSelect name="parentCategory" control={control} label={"Батьківська категорія"} multiple={false} items={selectItems}/>
        <p style={{color: 'red'}}>{errors.parentCategory?.message}</p>
      </div>
      }
      <div className={formCl.buttons}>
        <Button type="button" variant='secondary' onClick={handleCloseEditModal}>Закрити</Button>
        <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Редагувати"}</Button>
      </div>
    </form>
      </div>
    )
}
