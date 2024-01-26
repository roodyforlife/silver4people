import React, { useState, useEffect, useMemo } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { isJSDocNullableType } from "typescript";
import { Button } from "../../../components/UI/Button/Button";
import {
  CustomSelect,
  ISelect,
} from "../../../components/UI/CustomSelect/CustomSelect";
import { Pagination } from "../../../components/UI/Pagination/Pagination";
import { Categories } from "../../components/Categories/Categories";
import { Products } from "../../components/Products/Products";
import { getCategories } from "../../http/categoryApi";
import { getProducts } from "../../http/productApi";
import cl from "./MainPage.module.css";
import { Input } from "../../../components/UI/Input/Input";
import { MAIN_ROUTE } from "../../../consts";
import { Loader } from "../../../Admin/components/UI/Loader/Loader";

export interface ICategory {
  id: number;
  name: string;
  paranentCategory?: ICategory;
  parentCategoryId?: number;
}

export interface ICategoryNormalize {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}

export interface IProduct {
  id: string;
  name: string;
  article: string,
  images: IImage[],
}

export interface IProductResponse {
  pageItems: IProduct[];
  itemsCount: number;
}

interface IImage {
  id: string;
  index: number;
}

interface IProductFiltration extends FieldValues {
  searchString: string;
}

export interface IProductsRequest {
  categoryIdes?: number[] | null;
  searchString: string;
  skip: number;
  take: number;
}

const takeItems = 48;

export const MainPage = () => {
  const { control, getValues } = useForm<IProductFiltration>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();

  const normalizedCategories: ICategoryNormalize[] = useMemo(() => {
    const categoryMap: ICategoryNormalize[] = [];

    categories.forEach((category) => {
      const normalizedCategory: ICategoryNormalize = {
        id: category.id,
        name: category.name,
        childrenCategories: [],
      };

      if (!category.parentCategoryId) {
        categoryMap.push(normalizedCategory);
      } else {
        const parentCategoryIndex = categoryMap.findIndex(
          ({ id }) => id === category.parentCategoryId
        );
        if (parentCategoryIndex !== -1) {
          categoryMap[parentCategoryIndex].childrenCategories.push(
            normalizedCategory
          );
        }
      }
    });

    return categoryMap;
  }, [categories]);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const pageNumber = queryParams.get("page");
    setCurrentPage(pageNumber ? +pageNumber : 1);
    setCategoryId(category);

    const fetchData = async () => {
      await fetchProducts(category);
      await fetchCategories().then((data) => setCategories(data));
    };

    Promise.resolve(fetchData()).finally(() => setLoading(false));
  }, [location.search]);

  const fetchProducts = async (categoryId: string | null) => {
    const categoryIdes = categoryId !== null ? [+categoryId] : [];
    const request: IProductsRequest = {
      categoryIdes: categoryIdes,
      searchString: getValues().searchString,
      skip: currentPage - 1,
      take: takeItems,
    };

    await getProducts(request).then((data) => {
      setProducts(data.pageItems);
      setPagesCount(Math.ceil(data.itemsCount / takeItems));
    });
  };

  const fetchCategories = async () => {
    return await getCategories();
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryId)
    .finally(() => setLoading(false));
  }, [currentPage])

  const handlePageChange = async (number:number) => {
    navigate((MAIN_ROUTE + `?page=${number}`) + (categoryId !== null ? `&category=${categoryId}` : ''))
  }

  const onSubmit = async () => {
    await fetchProducts(categoryId);
  };

  return (
    <div className={cl.wrapper}>
      {loading && <Loader />}
      <div className={cl.container}>
        <Categories items={normalizedCategories} />
        <div className={cl.productsContent}>
          <div className={cl.filtration}>
            <div className={cl.filtrationItem}>
              <Controller
                control={control}
                name={"searchString"}
                render={({ field }) => (
                  <Input label={"Назва"} inputType="text" field={field}></Input>
                )}
              ></Controller>
            </div>
            <div className={cl.filtrationItem}>
              <Button type="submit" variant="secondary" onClick={onSubmit}>
                Знайти
              </Button>
            </div>
          </div>
          <div className={cl.pagination}>
            <Pagination
              color={{ backgroundColor: "black", color: "white" }}
              setPage={handlePageChange}
              currentPage={currentPage}
              pagesCount={pagesCount}
            ></Pagination>
          </div>
          <Products products={products} />
          <div className={cl.pagination}>
            <Pagination
              color={{ backgroundColor: "black", color: "white" }}
              setPage={handlePageChange}
              currentPage={currentPage}
              pagesCount={pagesCount}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
