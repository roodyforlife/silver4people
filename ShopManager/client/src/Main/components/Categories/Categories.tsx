import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MAIN_ROUTE } from "../../../consts";
import { ICategory, ICategoryNormalize } from "../../pages/MainPage/MainPage";
import cl from "./Categories.module.css";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import languages from "../../../trans/languages.json";
import { Context } from "../../..";

interface IProps {
  items: ICategoryNormalize[];
}

export const Categories = ({ items }: IProps) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const location = useLocation();
  const { t } = useTranslation();
  const contextValue = useContext(Context);
  const [language] = contextValue!.language;

  const params = new URLSearchParams(location.search);

  const handleShowHideChildrens = (item: ICategoryNormalize) => {
    setExpandedCategories((prevExpandedCategories) => {
      if (prevExpandedCategories.includes(item.id)) {
        return prevExpandedCategories.filter((id) => id !== item.id);
      } else {
        return [...prevExpandedCategories, item.id];
      }
    });
  };

  const updateCategoryParam = (categoryId: number) => {
    params.set("category", categoryId.toString());
    params.delete("page");
    return `${MAIN_ROUTE}?${params.toString()}`;
  };

  return (
    <div className={cl.wrapper}>
      <nav className={cl.content}>
        <header className={cl.header}>
          <h2>{t("Categories")}</h2>
        </header>
        <ul className={cl.items}>
          {items.map((item) => (
            <li key={item.id}>
              <div
                className={cl.item}
                onClick={() => handleShowHideChildrens(item)}
              >
                <NavLink to={updateCategoryParam(item.id)}>
                  {JSON.parse(item.name)[language]}
                </NavLink>
                {item.childrenCategories.length !== 0 && (
                  <div
                    className={[
                      cl.arrow,
                      expandedCategories.includes(item.id) && cl.active,
                    ].join(" ")}
                  ></div>
                )}
              </div>
              {item.childrenCategories.length !== 0 && (
                <ul
                  className={[
                    cl.childrenItems,
                    expandedCategories.includes(item.id) && cl.visible,
                  ].join(" ")}
                >
                  {item.childrenCategories.map((childrenItem) => (
                    <li
                      className={[cl.item, cl.childrenItem].join(" ")}
                      key={childrenItem.id}
                    >
                      <NavLink to={updateCategoryParam(childrenItem.id)}>
                        {JSON.parse(childrenItem.name)[language]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
