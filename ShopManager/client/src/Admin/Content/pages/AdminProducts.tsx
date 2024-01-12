import React, { useState, useEffect } from "react";
import { Button } from "../../../components/UI/Button/Button";
import { Modal } from "../../../components/UI/Modal/Modal";
import { generateArticle } from "../../utils/generateArticle";
import {
  IProductCreateFormData,
  ProductCreateForm,
} from "../components/Product/ProductCreate/ProductCreateForm";
import { TableWrapper } from "../components/TableWrapper/TableWrapper";
import { getProducts } from "../http/productApi";
import tablePageClasses from "../styles/TablePage.module.css";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  article: string;
  published: boolean;
  purchasePrice: number;
  salePrice: number;
  trackNumber: string;
}

const headColumns: string[] = [
  "#",
  "Назва",
  "Опис",
  "Артикуль",
  "Опубліковано",
  "Ціна закупки",
  "Ціна продажу",
  "Трек номер",
];

export const AdminProducts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const [products, setProducts] = useState<IProduct[]>([
    {
      id: "1",
      name: "Test1",
      description: "test desc",
      article: "03204203432",
      published: true,
      purchasePrice: 233,
      salePrice: 234,
      trackNumber: "423323244542432",
    },
    {
      id: "2",
      name: "Test2",
      description: "test desc",
      article: "03204203432",
      published: true,
      purchasePrice: 233,
      salePrice: 234,
      trackNumber: "423323244542432",
    },
    {
      id: "3",
      name: "Test3",
      description: "test desc",
      article: "03204203432",
      published: true,
      purchasePrice: 233,
      salePrice: 234,
      trackNumber: "423323244542432",
    },
    {
      id: "4",
      name: "Test4",
      description: "test desc",
      article: "03204203432",
      published: true,
      purchasePrice: 233,
      salePrice: 234,
      trackNumber: "423323244542432",
    },
    {
      id: "5",
      name: "Test5",
      description: "test desc",
      article: "03204203432",
      published: true,
      purchasePrice: 233,
      salePrice: 234,
      trackNumber: "423323244542432",
    },
  ]);

  const fetchProducts = async () => {
    await getProducts().then((data) => setProducts(data));
  };

  /* useEffect(() => {
    fetchProducts();
  }, []) */

  return (
    <div className={tablePageClasses.container}>
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Створення продукту"
      >
        <ProductCreateForm fetchProducts={fetchProducts}></ProductCreateForm>
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
              {products?.map((row, rowIndex) => (
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
  );
};
