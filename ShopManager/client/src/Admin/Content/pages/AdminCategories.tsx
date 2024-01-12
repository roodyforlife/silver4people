import React, { useState, useEffect } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { CategoryCreateForm, ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import { getCategories } from '../http/categoryApi';
import tablePageClasses from '../styles/TablePage.module.css';

export interface ICategory {
  id:string,
  name:string,
}

const headColumns:string[] = ["#", "Назва"];

export const AdminCategories = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const [categories, setCategories] = useState<ICategory[]>([
    {id: "1", name: "Test1"},
    {id: "2", name: "Test2"},
    {id: "3", name: "Test3"},
    {id: "4", name: "Test4"},
    {id: "5", name: "Test5"},
    {id: "6", name: "Test6"},
    {id: "7", name: "Test7"},
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
        <CategoryCreateForm fetchCategories={fetchCategories}></CategoryCreateForm>
      </Modal>
      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.createButton}>
          <Button onClick={handleShowCreateModal} type="button">
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
              {categories?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </div>
    </div>
  )
}
