import React from 'react'
import { Button } from '../../../../../components/UI/Button/Button';
import formCl from '../../../../../styles/Form.module.css';
import { deleteSite } from '../../../http/siteApi';
import { ISite } from '../../../pages/AdminSites';

interface IProps {
    fetchSites: () => void,
    handleCloseDeleteModal: () => void,
    site?: ISite
}

export const SiteDeleteForm = ({fetchSites, handleCloseDeleteModal, site}:IProps) => {
    const handleDelete = async () => {
        if (site) {
            await deleteSite(site?.id).then(() => {
                fetchSites();
                handleCloseDeleteModal();
            }).catch(({response}) => {
                if (response.status === 400) {
                    alert("Неможливо видалити сайт, тому що він прив'язаний до якогось товару");
                }
            })
        }
    }

  return (
    <>
        <div className={formCl.item}>Ви дійсно хочете видалити сайт "{site?.name}"?</div>
        <div className={formCl.buttons}>
            <Button type="button" onClick={handleCloseDeleteModal} variant='secondary'>Закрити</Button>
            <Button type="button" onClick={handleDelete} variant="danger">Видалити</Button>
        </div>
    </>
  )
}
