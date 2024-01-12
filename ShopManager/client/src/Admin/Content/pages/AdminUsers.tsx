import React, { useState } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import { UserCreateForm } from '../components/User/UserCreate/UserCreateForm';
import tablePageClasses from '../styles/TablePage.module.css';

interface IUser {
    id: string,
    email: string,
    name: string,
}

const headColumns: string[] = [
    "#",
    "Email",
    "Name"
  ];

export const AdminUsers = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => setShowCreateModal(true);
    const [users, setUsers] = useState<IUser[]>([
        { id: "1", email: 'test@gmail.com', name: "Test name" },
        { id: "2", email: 'test@gmail.com', name: "Test name" },
        { id: "3", email: 'test@gmail.com', name: "Test name" },
        { id: "4", email: 'test@gmail.com', name: "Test name" },
        { id: "5", email: 'test@gmail.com', name: "Test name" },
    ]);
  
   /*  useEffect(() => {
      fetchCategories()
    }, []) */
  
    const fetchUsers = async () => {
      /* await getCategories().then((data) => setCategories(data)); */
    }
  
    return (
      <div className={tablePageClasses.container}>
        <Modal
          onClose={handleCloseCreateModal}
          show={showCreateModal}
          title="Створення адміністратора"
        >
            <UserCreateForm fetchUsers={fetchUsers}></UserCreateForm>
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
                {users?.map((row, rowIndex) => (
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
