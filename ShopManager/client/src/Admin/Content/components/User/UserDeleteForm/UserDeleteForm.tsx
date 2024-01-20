import React from 'react'
import { Button } from '../../../../../components/UI/Button/Button';
import formCl from '../../../../../styles/Form.module.css';
import { IUser } from '../../../pages/AdminUsers';
import { deleteUser } from '../../../http/userApi';

interface IProps {
    fetchUsers: () => void,
    handleCloseDeleteModal: () => void,
    user?: IUser
}

export const UserDeleteForm = ({fetchUsers, handleCloseDeleteModal, user}:IProps) => {
    const handleDelete = async () => {
        if (user) {
            await deleteUser(user.login).then(() => {
                fetchUsers();
                handleCloseDeleteModal();
            }).catch(({response}) => {
                if (response.status === 400) {
                    alert("Неможливо видалити категорії, тому що вона прив'язана до якогось товару, або дочірня категорія прив'язана до товару");
                }
            })
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити адміністратора "{user?.login}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger">Видалити</Button>
        </div>
    </>
  )
}
