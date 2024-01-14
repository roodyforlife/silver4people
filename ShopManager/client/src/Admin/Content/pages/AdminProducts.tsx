import React, { useState, useEffect } from "react";
import { Button } from "../../../components/UI/Button/Button";
import { Modal } from "../../../components/UI/Modal/Modal";
import { REACT_APP_API_URL } from "../../../consts";
import { generateArticle } from "../../utils/generateArticle";
import {
  IProductCreateFormData,
  ProductCreateForm,
} from "../components/Product/ProductCreate/ProductCreateForm";
import { TableWrapper } from "../components/TableWrapper/TableWrapper";
import { getProducts } from "../http/productApi";
import tablePageClasses from "../styles/TablePage.module.css";
import { ICategory } from "./AdminCategories";
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  article: string;
  published: boolean;
  purchasePrice: number;
  salePrice: number;
  trackNumber: string;
  location:string,
  images:IImage[],
  sites: ISite[],
  categories: ICategory[],
}

interface ISite {
  id: string,
  name: string,
}

interface IImage {
  id: string,
  index: number,
}

const headColumns: string[] = [
  "Картинка",
  "Назва",
  "Опис",
  "Артикуль",
  "Опубліковано",
  "Ціна закупки",
  "Ціна продажу",
  "Трек номер",
  "Місцезнаходження",
];

export const AdminProducts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    await getProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className={tablePageClasses.container}>
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Створення продукту"
      >
        <ProductCreateForm fetchProducts={fetchProducts} handleCloseCreateModal={handleCloseCreateModal}></ProductCreateForm>
      </Modal>
      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.createButton}>
          <Button onClick={handleShowCreateModal} type="button" variant='primary'>
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
                <td>
                  <div className={tableWrapperCl.image}>
                    <img src={`${REACT_APP_API_URL}api/Image/${(row.images.find((image) => image.index === 0))?.id}`} alt="" />
                  </div>
                </td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.article}</td>
                <td>{row.published ? "Так" : "Ні"}</td>
                <td>{row.purchasePrice}</td>
                <td>{row.salePrice}</td>
                <td>{row.trackNumber}</td>
                <td>{row.location}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </TableWrapper>
      </div>
    </div>
  );
};
