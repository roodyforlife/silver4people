import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { getSelectsCategoryItems, getSelectsSiteItems, ISelect } from '../../../../utils/SelectUtils/getSelectsItems';
import { IProduct } from '../../../pages/AdminProducts'
import formCl from '../../../../../styles/Form.module.css';
import cl from './ProductEditForm.module.css';
import { Input } from '../../../../../components/UI/Input/Input';
import { Textarea } from '../../../../../components/UI/Textarea/Textarea';
import { DragDropList } from '../../UI/DragDropList/DragDropList';
import { FileInput } from '../../UI/FileInput/FileInput';
import { CheckBox } from '../../../../../components/UI/Checkbox/CheckBox';
import { CustomSelect } from '../../../../../components/UI/CustomSelect/CustomSelect';
import { Button } from '../../../../../components/UI/Button/Button';
import { getCategories } from '../../../http/categoryApi';
import { getSites } from '../../../http/siteApi';
import { ISite } from '../../../pages/AdminSites';
import { ICategory } from '../../../pages/AdminCategories';

export interface IProductEditFormData {
    id: string;
    name: string;
    published: boolean;
    description: string;
    purchasePrice: number;
    salePrice: number;
    trackNumber: string;
    location: string;
    images: IImage[];
    article: string;
    categoryIdes: number[];
    siteIdes: number[];
  }

  interface IForm {
    id: string;
    name: string;
    published: boolean;
    description: string;
    purchasePrice: number;
    salePrice: number;
    trackNumber: string;
    location: string;
    images: IImage[];
    article: string;
    categoryIdes: ISelect[];
    siteIdes: ISelect[];
  }

  interface IImage {
    id: string,
    index:number,
  }
  
interface FileInfo {
    id: number;
    file: File;
  }

  interface IProps {
    fetchProducts: () => void,
    handleCloseEditModal: () => void,
    product?: IProduct,
  }

export const ProductEditForm = ({fetchProducts, handleCloseEditModal, product}:IProps) => {
    const { handleSubmit, control, formState: {errors} } = useForm<IForm>({
        defaultValues: {
            ...product,
            categoryIdes: product?.categories?.map(({id, name}) => { return { value: id, label: name } as ISelect }),
            siteIdes: product?.sites?.map(({id, name}) => { return { value: id.toString(), label: name } as ISelect }),
        }
    });
    const [files, setFiles] = useState<FileInfo[]>([])
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [sites, setSites] = useState<ISite[]>([]);

    console.log(product);

    useEffect(() => {
        const fetchData = async () => {
          const categoriesData = await fetchCategories();
          const sitesData = await fetchSites();
          setCategories(categoriesData);
          setSites(sitesData);
        };
      
        fetchData();
      }, []);
      
      const fetchCategories = async () => {
        return await getCategories()
      }
      
      const fetchSites = async () => {
        return await getSites();
      }
      
      const selectCategoryItems = useMemo<ISelect[]>(() => {
        return getSelectsCategoryItems(categories);
      }, [categories]);
      
      const selectSiteItems = useMemo<ISelect[]>(() => {
        return getSelectsSiteItems(sites);
      }, [sites]);

    const onSubmit = () => {

    }

    return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'name'}
            rules={{
              required: "Введіть назву продукту",
              maxLength: {
                value: 100,
                message: 'Максимальна довжина продукту повинна бути не більше 100'
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
            name={'description'}
            rules={{
              required: "Введіть опис продукту",
              maxLength: {
                value: 2000,
                message: 'Максимальна довжина опису повинна бути не більше 2000'
              }
            }}
            render={({ field }) => (
              <Textarea height={200} label={"Опис"} field={field}></Textarea>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.description?.message}</p>
        </div>
          {/* <DragDropList items={getFileListNode(files)} setItems={handleChangeList}></DragDropList>
        <div className={formCl.item}>
          <FileInput onChange={addMoreFiles} multiple={true}></FileInput>
        </div> */}
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'purchasePrice'}
            rules={{
              required: "Введіть ціну закупки",
              min: {
                value: 0,
                message: 'Невірне число'
              }
            }}
            render={({ field }) => (
              <Input label={'Ціна закупки'} inputType="number" field={field}></Input>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.purchasePrice?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'salePrice'}
            rules={{
              required: "Введіть ціну продажу",
              min: {
                value: 0,
                message: 'Невірне число'
              }
            }}
            render={({ field }) => (
              <Input label={'Ціна продажу'} inputType="number" field={field}></Input>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.salePrice?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'published'}
            render={({ field }) => (
              <CheckBox label={"Опублікувати?"} field={field}></CheckBox>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.published?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'trackNumber'}
            render={({ field }) => (
              <Input label={'Трек-номер'} inputType="text" field={field}></Input>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.trackNumber?.message}</p>
        </div>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'location'}
            render={({ field }) => (
              <Input label={'Місцезнаходження'} inputType="text" field={field}></Input>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.location?.message}</p>
        </div>
        <div className={formCl.item}>
              <CustomSelect name="categoryIdes" control={control} label={"Категорії"} multiple={true} items={selectCategoryItems}/>
          <p style={{color: 'red'}}>{errors.categoryIdes?.message}</p>
        </div>
        <div className={formCl.item}>
              <CustomSelect name="siteIdes" control={control} label={"Сайти"} multiple={true} items={selectSiteItems}/>
          <p style={{color: 'red'}}>{errors.siteIdes?.message}</p> 
        </div>
        <div className={formCl.buttons}>
          <Button type="button" variant='secondary' onClick={handleCloseEditModal}>Закрити</Button>
          <Button type="submit" variant='primary'>Створити</Button>
        </div>
      </form>
        </div>
      )
}
