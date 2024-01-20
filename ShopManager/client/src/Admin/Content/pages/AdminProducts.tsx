import React, { useState, useEffect, useMemo } from "react";
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
import { Pagination } from "../components/UI/Pagination/Pagination";
import filtrationCl from '../styles/Filtration.module.css';
import { Input } from "../../../components/UI/Input/Input";
import { getCategories } from "../http/categoryApi";
import { getSites } from "../http/siteApi";
import { getSelectsCategoryItems, getSelectsSiteItems, ISelect } from "../../utils/SelectUtils/getSelectsItems";
import { ISite } from "./AdminSites";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { CustomSelect } from "../../../components/UI/CustomSelect/CustomSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_PRODUCTS_ROUTE } from "../consts";
import { ProductEditForm } from "../components/Product/ProductEditForm/ProductEditForm";

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

interface IImage {
  id: string,
  index: number,
}

export interface IProductsRequest {
  minPurchasePrice:number,
  maxPurchasePrice:number,
  minSalePrice:number,
  maxSalePrice:number,
  categoryIdes:number[],
  siteIdes:number[],
  publishedFilter:PublishedFilterType,
  order:OrderField,
  orderType:OrderType,
  take:number,
  skip:number,
  searchString?:string,
}

interface IFiltration extends FieldValues{
  minPurchasePrice:number,
  maxPurchasePrice:number,
  minSalePrice:number,
  maxSalePrice:number,
  categoryIdes:ISelect[],
  siteIdes:ISelect[],
  publishedFilter:ISelect,
  orderField:ISelect,
  orderType:ISelect,
  searchString:string,
}

type PublishedFilterType = "All" | "True" | "False";
type OrderField = "Name" | "PurchasePrice" | "SalePrice";
type OrderType = "Ascending" | "Descending";

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
  "Контроллери",
];

const takeItems = 1;

export const AdminProducts = () => {
  const { control, setValue, getValues } = useForm<IFiltration>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableProduct, setEditableProduct] = useState<IProduct>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sites, setSites] = useState<ISite[]>([]); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleShowEditModal = (product:IProduct) => {
    setEditableProduct(product);
    setShowEditModal(true);
  }
  
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowDeleteModal = (product:IProduct) => {
    setShowDeleteModal(true);
  }
  
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const fetchProducts = async () => {
    const categoryIdes = (getValues().categoryIdes ? getValues().categoryIdes?.map(({ value }) => +value) : []);
    const siteIdes = (getValues().siteIdes ? getValues().siteIdes.map(({ value }) => +value) : []);
    const publishedFilter:PublishedFilterType = (getValues().publishedFilter ? getValues().publishedFilter?.value : "All") as PublishedFilterType;
    const orderField:OrderField = (getValues().orderField ? getValues().orderField?.value : "Name") as OrderField;
    const orderType:OrderType = (getValues().orderType ? getValues().orderType?.value : "Ascending") as OrderType;

    const requestData: IProductsRequest = {
      ...getValues(),
      categoryIdes: categoryIdes,
      siteIdes: siteIdes, 
      publishedFilter: publishedFilter,
      order: orderField,
      orderType: orderType,
      take: takeItems,
      skip: currentPage - 1,
    };

    await getProducts(requestData).then((data) => {
      setProducts(data.pageItems)
      setPagesCount(Math.ceil(data.itemsCount / takeItems));
    });
  };
 
  const fetchCategories = async () => {
    await getCategories().then((data) => setCategories(data)); 
  }

  const fetchSites = async () => {
    await getSites().then((data) => setSites(data));
  }

  const handlePageChange = async (number:number) => {
    navigate(ADMIN_PRODUCTS_ROUTE + `?page=${number}`)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageNumber = queryParams.get('page');
    setCurrentPage(pageNumber ? +pageNumber : 1);
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage])

const selectCategoryItems = useMemo<ISelect[]>(() => {
  return getSelectsCategoryItems(categories);
}, [categories]);
 
const selectSiteItems = useMemo<ISelect[]>(() => {
  return getSelectsSiteItems(sites);
}, [sites]);

const selectPublishedItems = [
  {value: "True", label: "Опубліковано"},
  {value: "False", label: "Не опубліковано"},
]

const selectOrderFieldItems = [
  {value: "Name", label: "Сортувати за назвою"},
  {value: "PurchasePrice", label: "Сортувати за ціною покупки"},
  {value: "SalePrice", label: "Сортувати за ціною продажу"},
]

const selectOrderTypeItems = [
  {value: "Ascending", label: "За збільшенням"},
  {value: "Descending", label: "За зменшенням"},
]

const onSubmit = async () => {
  fetchProducts()
}

  useEffect(() => {
    Promise.all([fetchCategories(), fetchSites()]);
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
      <Modal
        onClose={handleCloseEditModal}
        show={showEditModal}
        title="Редагування продукту"
      >
        <ProductEditForm fetchProducts={fetchProducts} handleCloseEditModal={handleCloseEditModal} product={editableProduct}></ProductEditForm>
      </Modal>
      <div className={tablePageClasses.content}>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'minPurchasePrice'}
        defaultValue={0}
        render={({ field }) => (
          <Input label={"Ціна закупки (від)"} inputType="number" field={field}></Input>
        )}></Controller>
          <Controller
        control={control}
        name={'maxPurchasePrice'}
        defaultValue={1000000}
        render={({ field }) => (
          <Input label={"Ціна закупки (до)"} inputType="number" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'minSalePrice'}
        defaultValue={0}
        render={({ field }) => (
          <Input label={"Ціна продажу (від)"} inputType="number" field={field}></Input>
        )}></Controller>
        <Controller
        control={control}
        name={'maxSalePrice'}
        defaultValue={1000000}
        render={({ field }) => (
          <Input label={"Ціна продажу (до)"} inputType="number" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
          <CustomSelect name="categoryIdes" control={control} label={"Категорії"} multiple={true} isClearable={true} setValue={setValue} items={selectCategoryItems}/>
          <CustomSelect name="siteIdes" control={control} label={"Сайти"} multiple={true} isClearable={true} setValue={setValue} items={selectSiteItems}/>
        </div>
        <div className={filtrationCl.item}>
          <CustomSelect name="publishedFilter" control={control} label={"Статус публікації"} setValue={setValue} items={selectPublishedItems} isClearable={true}/>
          <CustomSelect name="orderField" control={control} label={"Сортування за"} setValue={setValue} items={selectOrderFieldItems} value={getValues().orderField || selectOrderFieldItems[0]} />
          <CustomSelect name="orderType" control={control} label={"Тип сортування"} setValue={setValue} items={selectOrderTypeItems} value={getValues().orderType || selectOrderTypeItems[0]} />
        </div>
        <div className={filtrationCl.item}>
        <Controller
        control={control}
        name={'searchString'}
        defaultValue={""}
        render={({ field }) => (
          <Input label={"Назва"} inputType="text" field={field}></Input>
        )}></Controller>
        </div>
        <div className={filtrationCl.item}>
          <div className={filtrationCl.button}>
            <Button type="button" variant="primary" onClick={onSubmit}>Знайти</Button>
          </div>
        </div>
      </div>
      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.createButton}>
          <Button onClick={handleShowCreateModal} type="button" variant='primary'>
            Створити
          </Button>
        </div>
        {products.length === 0 ? <div>Нічого не знайдено</div> :
        <>
        <div className={tablePageClasses.pagination}>
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={handlePageChange}></Pagination>
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
        <div className={tablePageClasses.pagination}>
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={handlePageChange}></Pagination>
        </div>
        </>
        }
      </div>
    </div>
  );
};
