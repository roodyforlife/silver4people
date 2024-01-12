import React, { useEffect, useState, useRef, ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../components/UI/Button/Button';
import { Input } from '../../../../../components/UI/Input/Input';
import cl from './ProductCreateForm.module.css';
import formCl from '../../../../../styles/Form.module.css';
import { DragDropList, IItem } from '../../UI/DragDropList/DragDropList';
import { FileInput } from '../../UI/FileInput/FileInput';
import { Guid } from "guid-typescript";
import { Textarea } from '../../../../../components/UI/Textarea/Textarea';
import { createProduct } from '../../../http/productApi';

interface IImage {
  id: Guid,
  index:number,
  file:File,
}

export interface IProductCreateFormData {
  name:string,
  description:string,
  purchasePrice:number,
  salePrice:number,
  trackNumber:string,
  images:IImage[]
}

interface IProps {
  fetchProducts: () => void,
}

interface FileInfo {
  id: number;
  file: File;
}

export const ProductCreateForm = ({fetchProducts}:IProps) => {
  const { handleSubmit, control, formState: {errors}, getValues } = useForm<IProductCreateFormData>()
  const [files, setFiles] = useState<FileInfo[]>([])
  
const getFileListNode = (fileList: FileInfo[]): IItem[] => {
  if (fileList) {
    const newPhotos: IItem[] = fileList.map((fileInfo) => ({
      id: fileInfo.id,
      content: (
        <div className={cl.listItem} key={fileInfo.id}>
          <div className={cl.image}>
            <img src={URL.createObjectURL(fileInfo.file)} alt={`Image ${fileInfo.id}`} />
          </div>
          <div className={cl.imageName}>
            <span>{fileInfo.file.name}</span>
          </div>
        </div>
      ),
    }));

    return newPhotos;
  }
  return [];
};

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

const onSubmit = async (data:IProductCreateFormData) => {
  const imageArray:IImage[] = files.map(({file}, index) => { return {id: Guid.create(), index: index, file} });
  data.images = imageArray;
  await createProduct(data).then(() => fetchProducts())
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
      <DragDropList items={getFileListNode(files)} setItems={handleChangeList}></DragDropList>
    <div className={formCl.item}>
      <FileInput onChange={addMoreFiles} multiple={true}></FileInput>
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
        name={'trackNumber'}
        render={({ field }) => (
          <Input label={'Трек-номер'} inputType="text" field={field}></Input>
        )}
      ></Controller>
      <p style={{color: 'red'}}>{errors.trackNumber?.message}</p>
    </div>
    <Button type="submit">Створити</Button>
  </form>
    </div>
  )
}
