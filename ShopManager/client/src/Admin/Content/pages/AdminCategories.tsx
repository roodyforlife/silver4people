import { Guid } from 'guid-typescript';
import React, { useState, useEffect } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { CategoryCreateForm, ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';
import { CategoryEditForm } from '../components/Category/CategoryEditForm/CategoryEditForm';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import { getCategories } from '../http/categoryApi';
import tablePageClasses from '../styles/TablePage.module.css';
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';
import { CategoryDeleteForm } from '../components/Category/CategoryDeleteForm/CategoryDeleteForm';

export interface ICategory {
  id: string,
  name:string,
}

const headColumns:string[] = ["#", "Назва"];

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

  const [categories, setCategories] = useState<ICategory[]>([
    { id: "dssdf", name: "Test1" },
    { id: "dssdf", name: "Test2" },
    { id: "dssdf", name: "Test3" },
    { id: "dssdf", name: "Test4" },
    { id: "dssdf", name: "Test5" },
  ]);

 /*  useEffect(() => {
    fetchCategories()
  }, []) */

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
        <CategoryCreateForm fetchCategories={fetchCategories} handleCloseCreateModal={handleCloseCreateModal}></CategoryCreateForm>
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
                <th>Controlls</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((row, rowIndex) => (
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
