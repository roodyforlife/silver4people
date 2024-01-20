import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { createUser } from '../../../http/userApi';
import cl from './UserCreateForm.module.css'
import formCl from '../../../../../styles/Form.module.css';
import { Button } from '../../../../../components/UI/Button/Button';
import { Input } from '../../../../../components/UI/Input/Input';

export interface IUserCreateFormData {
  email: string,
  name:string,
  password: string,
  confirmPassword: string,
}

interface IProps {
  fetchUsers: () => void
  handleCloseCreateModal: () => void,
}

export const UserCreateForm = ({fetchUsers, handleCloseCreateModal}:IProps) => {
  const { handleSubmit, control, formState: {errors}, getValues, setError, watch} = useForm<IUserCreateFormData>()
  
    const onSubmit = async (data:IUserCreateFormData) => {
      await createUser(data).then(() => fetchUsers())
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
        <div className={formCl.item}>
        <Controller
          control={control}
          name={'email'}
          rules={{
            required: "Введіть пошту адміністратора",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Введіть правильно пошту',
            },
            maxLength: {
              value: 30,
              message: 'Максимальна довжина пошти повинна бути не більше 30'
            },
            minLength: {
              value: 2,
              message: 'Мінімальна довжина не повинна бути менша за 2'
            },
          }}
          render={({ field }) => (
            <Input label={"Пошта"} inputType="text" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.email?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'name'}
          rules={{
            required: "Введіть ім'я адміністратора",
            maxLength: {
              value: 20,
              message: 'Максимальна довжина імені повинна бути не більше 20'
            },
            minLength: {
              value: 2,
              message: 'Мінімальна довжина не повинна бути менша за 2'
            },
          }}
          render={({ field }) => (
            <Input label={"Ім'я"} inputType="text" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.name?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'password'}
          rules={{
            required: "Введіть пароль",
            maxLength: {
              value: 20,
              message: 'Максимальна довжина паролю повинна бути не більше 20'
            },
            minLength: {
              value: 6,
              message: 'Мінімальна довжина не повинна бути менша за 6'
            },
          }}
          render={({ field }) => (
            <Input label={"Пароль"} inputType="password" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.password?.message}</p>
      </div>
      <div className={formCl.item}>
        <Controller
          control={control}
          name={'confirmPassword'}
          rules={{
            required: "Введіть пароль",
            maxLength: {
              value: 20,
              message: 'Максимальна довжина паролю повинна бути не більше 20'
            },
            minLength: {
              value: 6,
              message: 'Мінімальна довжина не повинна бути менша за 6'
            },
            validate: (value) => value === watch("password") || "Паролі не співпадають"
          }}
          render={({ field }) => (
            <Input label={"Підтвердіть пароль"} inputType="password" field={field}></Input>
          )}
        ></Controller>
        <p style={{color: 'red'}}>{errors.confirmPassword?.message}</p>
      </div>
      <div className={formCl.buttons}>
        <Button type="button" onClick={handleCloseCreateModal} variant='secondary'>Закрити</Button>
        <Button type="submit" variant='primary'>Створити</Button>
      </div>
    </form>
      </div>
    )
}
