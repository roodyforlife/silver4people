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
  publishedFilter:PublishedFilterType,
  orderType:OrderType,
  searchString:string,
}

type PublishedFilterType = "All" | "True" | "False";
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
];

export const AdminProducts = () => {
  const { control, setValue, getValues } = useForm<IFiltration>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const [pagesCount, setPagesCount] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  /* const [searchForm, setSearchForm] = useState<IProductsRequest>({
    minPurchasePrice: 0,
    maxPurchasePrice: 0,
    minSalePrice: 0,
    maxSalePrice: 0,
    categoryIdes: [],
    siteIdes: [],
    publishedFilter: 'All',
    orderType: 'Ascending',
    take: 20,
    skip: 0,
    searchString: ""}); */

  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sites, setSites] = useState<ISite[]>([]); 

  const fetchProducts = async () => {
    console.log(getValues())
    /* const categoryIdes = getValues().categoryIdes.map(({ value }) => +value);
    const siteIdes = getValues().siteIdes.map(({ value }) => +value);
    
    const requestData: IProductsRequest = {
      ...getValues(),
      categoryIdes: categoryIdes,
      siteIdes: siteIdes, 
      take: 20,
      skip: 1,
    };
    await getProducts(requestData).then((data) => setProducts(data.pageItems)); */
  };

  const fetchCategories = async () => {
    await getCategories().then((data) => setCategories(data)); 
  }

  const fetchSites = async () => {
    await getSites().then((data) => setSites(data));
  }

  const setPage = (number:number) => {
    setCurrentPage(number);
  }

const selectCategoryItems = useMemo<ISelect[]>(() => {
  return getSelectsCategoryItems(categories);
}, [categories]);
 
const selectSiteItems = useMemo<ISelect[]>(() => {
  return getSelectsSiteItems(sites);
}, [sites]);

const onSubmit = async () => {
  fetchProducts()
}

  useEffect(() => {
    fetchCategories().then(() => fetchSites().then(() => fetchProducts()));
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
          <CustomSelect name="categoryIdes" control={control} label={"Категорії"} multiple={true} value={selectCategoryItems} setValue={setValue} items={selectCategoryItems}/>
          <CustomSelect name="siteIdes" control={control} label={"Сайти"} multiple={true} value={selectSiteItems} setValue={setValue} items={selectSiteItems}/>
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
        <div className={tablePageClasses.pagination}>
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={setPage}></Pagination>
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
        <div className={tablePageClasses.pagination}>
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setPage={setPage}></Pagination>
        </div>
      </div>
    </div>
  );
};
