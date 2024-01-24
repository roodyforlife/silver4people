import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Categories } from "../../components/Categories/Categories";
import { Products } from "../../components/Products/Products";
import cl from "./MainPage.module.css";

export interface ICategory {
  id: number,
  name: string,
  paranentCategory?: ICategory,
  parentCategoryId?: number,
}

export interface IProduct {
  id: string,
  name: string,
  images: IImage[],
}

interface IImage {
  id: string,
  index: number,
}

export const MainPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([
    { id: 1, name: "Test1" },
    { id: 2, name: "Test2" },
    { id: 3, name: "Books, Maps & Manuscriptsds fewr er ersdc 3 fe  fg erg re g" },
    { id: 4, name: "Test4" },
    { id: 5, name: "Test5" },
    { id: 6, name: "Test6" },
  ]);
  const [products, setProducts] = useState<IProduct[]>([
    {id: "1", name: "Test1", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "2", name: "Test2", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "3", name: "Test3", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "4", name: "Test4", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "5", name: "Test5", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "6", name: "Test6", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "7", name: "Test7", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
    {id: "8", name: "Test8", images: [{id: "https://cdn03.ciceksepeti.com/cicek/kc5805843-1/XL/pubg-fortnite-m249-taramali-orjinal-metal-hediyelik-anahtarlik-kc5805843-1-54a3c3df5e9a4ec2bfbe3ae8992522d9.jpg", index: 0}]},
  ])

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('category');
    fetchProducts(categoryId);
  }, [location.search]);

  const fetchProducts = async (categoryId: string | null ) => {

  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <Categories items={categories} />
        <Products items={products}/>
      </div>
    </div>
  );
};
