import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Loader } from "../../../Admin/components/UI/Loader/Loader";
import { MAIN_ROUTE, REACT_APP_API_URL } from "../../../consts";
import { ImageSlider } from "../../components/UI/ImageSlider/ImageSlider";
import { getProduct } from "../../http/productApi";
import { IProduct } from "../MainPage/MainPage";
import cl from "./Product.module.css";

export const Product = () => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const imageArray: string[] = useMemo(() => {
    if (product) {
      const images = product.images;
      return images
        .sort((a, b) => a.index - b.index)
        .map(({ id }) => `${REACT_APP_API_URL}api/image/${id}`);
    }

    return [];
  }, [product]);

  const fetchProduct = async () => {
    setLoading(true);
    if (params.id) {
      await getProduct(params.id).then((data) => setProduct(data)).finally(() => setLoading(false));
    }
  };

  return (
    <div className={cl.wrapper}>
      {loading && <Loader />}
      <div className={cl.container}>
        <div className={cl.content}>
          <div className={cl.title}>
            <h1>
              {product?.article}. {product?.name}
            </h1>
          </div>
          <div className={cl.image}>
            <ImageSlider imagesUrls={imageArray} />
          </div>
        </div>
        <div className={cl.content}>
          <div className={cl.info}>
            <div className={cl.infoTitle}>
              <h2>Категорія</h2>
            </div>
            <div className={cl.infoContent}>
              <div className={cl.tiles}>
                {product?.categories.map((category) => (
                  <NavLink to={MAIN_ROUTE + `?category=${category.id}`} key={category.id}>
                    <div className={cl.tile}>{category.name}</div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className={cl.info}>
            <div className={cl.infoTitle}>
              <h2>Опис</h2>
            </div>
            <div className={cl.infoContent}>
              <p>{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
