import React from "react";
import { NavLink } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../consts";
import { IProduct } from "../../pages/MainPage/MainPage";
import cl from "./Products.module.css";

interface IProps {
  items: IProduct[];
}

export const Products = ({ items }: IProps) => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <div className={cl.items}>
          {items.map((item) => (
            <article className={cl.item} key={item.id}>
              <NavLink to={PRODUCT_ROUTE + `/${item.id}`}>
                <div className={cl.itemImage}>
                  <img
                    src={item.images.find(({ index }) => index === 0)?.id}
                    alt="Продукт"
                  />
                </div>
                <div className={cl.itemInfo}>
                  <div className={cl.infoTitle}>{item.name}</div>
                </div>
              </NavLink>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
