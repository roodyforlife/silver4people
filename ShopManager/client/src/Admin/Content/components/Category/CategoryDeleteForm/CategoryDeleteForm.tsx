import React from 'react'
import { Button } from '../../../../../components/UI/Button/Button';
import { deleteCategory } from '../../../http/categoryApi';
import { ICategory } from '../../../pages/AdminCategories';
import cl from './CategoryDeleteForm.module.css';
import formCl from '../../../../../styles/Form.module.css';

interface IProps {
    fetchCategories: () => void,
    handleCloseDeleteModal: () => void,
    category?: ICategory
}

export const CategoryDeleteForm = ({fetchCategories, handleCloseDeleteModal, category}:IProps) => {
    const handleDelete = async () => {
        if (category) {
            await deleteCategory(category?.id).then(() => {
                fetchCategories();
                handleCloseDeleteModal();
            })
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити категорію "{category?.name}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger">Видалити</Button>
        </div>
    </>
  )
}
