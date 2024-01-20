import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../components/UI/Button/Button';
import { Input } from '../../../../../components/UI/Input/Input';
import { editSite } from '../../../http/siteApi';
import { ISite } from '../../../pages/AdminSites';
import formCl from '../../../../../styles/Form.module.css';

export interface ISiteEditFormData {
    id: number,
    name: string,
  }
  
  interface IProps {
    fetchSites: () => void,
    handleCloseEditModal: () => void,
    site?: ISite,
  }

export const SiteEditForm = ({fetchSites, handleCloseEditModal, site}:IProps) => {
    const { handleSubmit, control, formState: {errors}, getValues, setValue} = useForm<ISiteEditFormData>()
  
    const onSubmit = async (data:ISiteEditFormData) => {
        if (site !== undefined) {
            setValue("id", site.id);
            await editSite(data).then(() => { fetchSites(); handleCloseEditModal(); })
        }
    }
  
    return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formCl.item}>
          <Controller
            control={control}
            name={'name'}
            defaultValue={site?.name}
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
          <Button type="button" onClick={handleCloseEditModal} variant='secondary'>Закрити</Button>
          <Button type="submit" variant='primary'>Редагувати</Button>
        </div>
      </form>
        </div>
      )
}
