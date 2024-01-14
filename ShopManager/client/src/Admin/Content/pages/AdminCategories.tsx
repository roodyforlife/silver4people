import { Guid } from 'guid-typescript';
import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { CategoryCreateForm, ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';
import { CategoryEditForm } from '../components/Category/CategoryEditForm/CategoryEditForm';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import { getCategories } from '../http/categoryApi';
import tablePageClasses from '../styles/TablePage.module.css';
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';
import { CategoryDeleteForm } from '../components/Category/CategoryDeleteForm/CategoryDeleteForm';
import { getCategoryFullName } from '../../utils/getCategoryFullName';

export interface ICategory {
  id: string,
  name:string,
  parentCategory?:ICategory,
}

const headColumns:string[] = ["#", "Назва", "Контроллери"];

export const AdminCategories = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editableCategory, setEditableCategory] = useState<ICategory>();
  const [deletableCategory, setDeletableCategory] = useState<ICategory>();

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (row:ICategory) => {
    setEditableCategory(row);
    setShowEditModal(true);
  }
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (row:ICategory) => {
    setDeletableCategory(row);
    setShowDeleteModal(true)
  };

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [])

  const filteredCategories = useMemo<ICategory[]>(() =>
    categories.map((category):ICategory => ({ id: category.id, name: getCategoryFullName(category) })),
  [categories]
);

  const fetchCategories = async () => {
    await getCategories().then((data) => setCategories(data));
  }

  return (
    <div className={tablePageClasses.container}>
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Створення категорії продукту"
      >
        <CategoryCreateForm fetchCategories={fetchCategories} categories={categories} handleCloseCreateModal={handleCloseCreateModal}></CategoryCreateForm>
      </Modal>
      <Modal
        onClose={handleCloseEditModal}
        show={showEditModal}
        title="Редагування категорії продукту"
      >
        <CategoryEditForm fetchCategories={fetchCategories} handleCloseEditModal={handleCloseEditModal} category={editableCategory}></CategoryEditForm>
      </Modal>
      <Modal
        onClose={handleCloseDeleteModal}
        show={showDeleteModal}
        title="Видалення категорії продукту"
      >
        <CategoryDeleteForm fetchCategories={fetchCategories} handleCloseDeleteModal={handleCloseDeleteModal} category={deletableCategory}></CategoryDeleteForm>
      </Modal>
      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.createButton}>
          <Button onClick={handleShowCreateModal} type="button" variant="primary">
            Створити
          </Button>
        </div>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                {headColumns?.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                  <td>
                    <div className={tableWrapperCl.controlls}>
                      <div className={tableWrapperCl.button}><Button type="button" variant='warning' onClick={() => handleShowEditModal(row)}>Редагувати</Button></div>
                      <div className={tableWrapperCl.button}><Button type="button" variant='danger' onClick={() => handleShowDeleteModal(row)}>Видалити</Button></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </div>
    </div>
  )
}
