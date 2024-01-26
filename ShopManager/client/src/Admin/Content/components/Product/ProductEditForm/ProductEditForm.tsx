import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { getSelectsCategoryItems, getSelectsSiteItems } from '../../../../utils/SelectUtils/getSelectsItems';
import { IProduct } from '../../../pages/AdminProducts'
import formCl from '../../../../../styles/Form.module.css';
import cl from './ProductEditForm.module.css';
import { Input } from '../../../../../components/UI/Input/Input';
import { Textarea } from '../../../../components/UI/Textarea/Textarea';
import { DragDropList, IItem } from '../../UI/DragDropList/DragDropList';
import { FileInput } from '../../UI/FileInput/FileInput';
import { CheckBox } from '../../../../components/UI/Checkbox/CheckBox';
import { CustomSelect, ISelect } from '../../../../../components/UI/CustomSelect/CustomSelect';
import { Button } from '../../../../../components/UI/Button/Button';
import { getCategories } from '../../../http/categoryApi';
import { getSites } from '../../../http/siteApi';
import { ISite } from '../../../pages/AdminSites';
import { ICategory } from '../../../pages/AdminCategories';
import { REACT_APP_API_URL } from '../../../../../consts';
import { convertImageLinkIntoFile } from '../../../../utils/convertImageLinkIntoFile';
import { getFileListNode } from '../../../../utils/getFileListNode';
import { Guid } from 'guid-typescript';
import { editProduct } from '../../../http/productApi';
import { createImage } from '../../../http/imageApi';
import { Loader } from '../../../../components/UI/Loader/Loader';
import { toast } from 'react-toastify';

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
    editionDate: string,
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
    isSaled: boolean,
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
    const { handleSubmit, control, formState: {errors}, setError } = useForm<IForm>({
        defaultValues: {
            ...product,
            categoryIdes: product?.categories ? getSelectsCategoryItems(product.categories) : [],
            siteIdes: product?.sites ? getSelectsSiteItems(product.sites) : [],
        }
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [mainLoading, setMainLoading] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [sites, setSites] = useState<ISite[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const categoriesData = await fetchCategories();
          const sitesData = await fetchSites();
          setCategories(categoriesData.filter((category:ICategory) => category.parentCategory));
          setSites(sitesData);
        };
      
        setMainLoading(true);
        fetchData().finally(() => setMainLoading(false));
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          if (product) {
            const filesPromises = product.images.map(async ({ id, index }) => {
              return {
                file: await convertImageLinkIntoFile(`${REACT_APP_API_URL}api/Image/${id}`, `${id}.webp`),
                id: index,
              };
            });
      
            const files = await Promise.all(filesPromises);
            const sortedFiles = files.sort((a, b) => a.id - b.id);
            setFiles(sortedFiles as FileInfo[]);
          }
        };
      
        setImageLoading(true);
        fetchData().finally(() => setImageLoading(false));
      }, [product?.images]);

      const handleChangeList = (items:IItem[]) => {
            const updatedFiles = files.filter((file) => items.some((item) => item.id === file.id));
            const sortedFiles = [...updatedFiles].sort((a, b) => {
              const idA = items.findIndex((item) => item.id === a.id);
              const idB = items.findIndex((item) => item.id === b.id);
        
              return idA - idB;
            });
        
            setFiles(sortedFiles);
      }

      const addMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const additionalFiles = e.target.files;
      
        if (additionalFiles) {
          const maxId = files.reduce((max, file) => (file.id > max ? file.id : max), 0);
          const newFiles = Array.from(additionalFiles).map((file, index) => ({
            id: maxId + index + 1,
            file: file,
          }));
      
          const updatedFiles = [...files, ...newFiles];
          setFiles(updatedFiles);
        }
      };
      
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

    const onSubmit = async (data:IForm) => {
       if (product) {
        setLoading(true);
         const imageArray: IImage[] = files.map((value, index) => {
            return { id: Guid.create().toString(), index: index};
          });
          const dateNow = new Date();
        
          const formData:IProductEditFormData = {
            ...data,
            categoryIdes: data.categoryIdes?.map(({value}) => +value),
            siteIdes: data.siteIdes?.map(({value}) => +value),
            id: product.id,
            article: product.article,
            images: imageArray,
            editionDate: dateNow.toUTCString(),
          }

          await editProduct(formData).then(() => {
            files.map(({file}, index) => {
              const formData = new FormData()
              formData.append("file", file);
                createImage(imageArray[index].id, formData).then(() => {
                fetchProducts();
                handleCloseEditModal();
              })
            });
            toast.success("Продукт успішно відредаговано");
          }).catch(() => {
            toast.error("Щось пішло не так, спробуйте ще раз");
          }).finally(() => setLoading(false));
       }
    }
    
    return (
        <div>
          {mainLoading && <Loader />}
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
        {imageLoading ?
          <div className={cl.imageLoader}>
            <Loader position='static' size={20}/>
            <span>Завантаження фотографій...</span>
          </div>
          :
          <DragDropList items={getFileListNode(files as FileInfo[])} setItems={handleChangeList}></DragDropList>
        }
        <div className={formCl.item}>
    <Controller
        control={control}
        name={'images'}
        rules={{
          validate: () => files.length > 0 ? undefined : "Додайте хочаб одну фотографію"
        }}
        render={() => (
          <FileInput onChange={addMoreFiles} multiple={true}></FileInput>
        )}
      ></Controller>
      <p style={{color: 'red'}}>{errors.images?.message}</p>
    </div>
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
            name={'isSaled'}
            render={({ field }) => (
              <CheckBox label={"Продано"} field={field}></CheckBox>
            )}
          ></Controller>
          <p style={{color: 'red'}}>{errors.isSaled?.message}</p>
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
          <Button type="submit" variant='primary' disabled={loading}>{loading ? "Завантаження..." : "Редагувати"}</Button>
        </div>
      </form>
        </div>
      )
}
