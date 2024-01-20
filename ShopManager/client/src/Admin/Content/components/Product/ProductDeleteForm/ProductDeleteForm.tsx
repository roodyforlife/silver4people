import React from 'react'
import { deleteProduct } from '../../../http/productApi'
import { IProduct } from '../../../pages/AdminProducts'
import formCl from '../../../../../styles/Form.module.css';
import { Button } from '../../../../../components/UI/Button/Button';

interface IProps {
    fetchProducts: () => void,
    handleCloseDeleteModal: () => void,
    product?: IProduct
}

export const ProductDeleteForm = ({fetchProducts, handleCloseDeleteModal, product}:IProps) => {
    const handleDelete = async () => {
        if (product) {
            await deleteProduct(product?.id).then(() => {
                fetchProducts();
                handleCloseDeleteModal();
            }).catch((error) => {
                console.error(error);
            })
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити категорію "{product?.name}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger">Видалити</Button>
        </div>
    </>
  )
}
