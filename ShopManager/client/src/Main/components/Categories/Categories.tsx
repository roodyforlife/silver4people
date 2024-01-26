import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE } from "../../../consts";
import { ICategory, ICategoryNormalize } from "../../pages/MainPage/MainPage";
import cl from "./Categories.module.css";

interface IProps {
  items: ICategoryNormalize[];
}

export const Categories = ({ items }: IProps) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const handleShowHideChildrens = (item: ICategoryNormalize) => {
    setExpandedCategories((prevExpandedCategories) => {
        if (prevExpandedCategories.includes(item.id)) {
          return prevExpandedCategories.filter((id) => id !== item.id);
        } else {
          return [...prevExpandedCategories, item.id];
        }
      });
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.content}>
        <div className={cl.header}>
          <h4>Категорії</h4>
        </div>
        <div className={cl.items}>
          {items.map((item) => (
            <div key={item.id}>
              <div
                className={cl.item}
                onClick={() => handleShowHideChildrens(item)}
              >
                <NavLink to={MAIN_ROUTE + `?category=${item.id}`}>
                  {item.name}
                </NavLink>
                {item.childrenCategories.length !== 0 &&
                    <div className={[cl.arrow, expandedCategories.includes(item.id) && cl.active].join(' ')}></div>}
              </div>
              {item.childrenCategories.length !== 0 && (
                  <div className={[cl.childrenItems, expandedCategories.includes(item.id) && cl.visible].join(' ')}>
                    {item.childrenCategories.map((childrenItem) => (
                      <div
                        className={[cl.item, cl.childrenItem].join(" ")}
                        key={childrenItem.id}
                      >
                        <NavLink
                          to={MAIN_ROUTE + `?category=${childrenItem.id}`}
                        >
                          {childrenItem.name}
                        </NavLink>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
