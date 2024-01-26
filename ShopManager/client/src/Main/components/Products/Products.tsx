import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../../components/UI/Pagination/Pagination";
import { REACT_APP_API_URL } from "../../../consts";
import { PRODUCT_ROUTE } from "../../consts";
import { IProduct } from "../../pages/MainPage/MainPage";
import cl from "./Products.module.css";
import { isMobile } from 'react-device-detect';

interface IProps {
  products: IProduct[];
}

export const Products = (({ products }: IProps) => {
  const [mouseEnterProductId, setMouseEnterProductId] = useState<string | null>(null);
  const [currentSegment, setCurrentSegment] = useState<number>(0);

  if (products.length === 0) {
    return (
      <div className={cl.notFound}>
        <span>Нічого не знайдено</span>
      </div>
    );
  }

  const handleMouseMove = (event: any) => {
    if (!isMobile) {
    const blockRect = event.currentTarget.getBoundingClientRect();
    const mouseXWithinBlock = event.clientX - blockRect.left;
    const product = products.find(({ id }) => id === mouseEnterProductId);

    if (product) {
      const imagesCount = product.images?.length || 0;
      const blockWidth = blockRect.width;

      const segmentWidth = blockWidth / imagesCount;
      const currentSegmentIndex = Math.floor(mouseXWithinBlock / segmentWidth);
      setCurrentSegment(currentSegmentIndex);
    }
  }
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <div className={cl.items}>
          {products.map((item) => (
            <article className={cl.item} key={item.id}>
              <NavLink to={PRODUCT_ROUTE + `/${item.id}`}>
                <div
                  className={cl.itemImage}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setMouseEnterProductId(item.id)}
                  onMouseLeave={() => setMouseEnterProductId(null)}
                >
                  <img
                    src={`${REACT_APP_API_URL}api/image/${
                      mouseEnterProductId === item.id && !isMobile
                        ? item.images.sort((a, b) => a.index - b.index)[
                            currentSegment
                          ]?.id
                        : item.images.find(({ index }) => index === 0)?.id
                    }`}
                    alt="Продукт"
                  />
                  {(item.images.length > 1 && mouseEnterProductId === item.id && !isMobile) && (
                    <div className={cl.dots}>
                      {item.images.map((image, index) => (
                        <div key={image.id} className={[cl.dot, currentSegment === index && cl.active].join(' ')}></div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={cl.itemInfo}>
                  <div className={cl.infoTitle}>
                    <span className={cl.article}>{item.article}. </span>
                    <span className={cl.title}>{item.name}</span>
                  </div>
                </div>
              </NavLink>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
});