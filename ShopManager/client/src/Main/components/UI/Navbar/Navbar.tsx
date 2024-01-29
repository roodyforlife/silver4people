import React, { ReactNode, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, REACT_APP_API_URL } from "../../../../consts";
import cl from "./Navbar.module.css";
import records from "../../../../records.json";
import { SearchInput } from "../SearchInput/SearchInput";
import { Controller, useForm } from "react-hook-form";

interface IProps {
  children: ReactNode;
}

interface IForm {
  searchString: string,
}

export const Navbar = ({ children }: IProps) => {
  const {control, getValues, setValue} = useForm<IForm>();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const searchItems = () => {
    if (getValues().searchString) {
      params.set('search', getValues().searchString);
    } else {
      params.delete("search")
    }

    params.delete("page");
    navigate(MAIN_ROUTE + `?${params.toString()}`);
  }

  useEffect(() => {
    setValue("searchString", params.get("search") ?? "")
  }, [location.search])

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <header className={cl.header}>
          <div className={cl.headerContent}>
            <nav>
              <div className={cl.headerItem}>
                <NavLink to={MAIN_ROUTE}>
                  <div className={[cl.logotype, cl.logotypeMain].join(" ")}>
                    <img src={`/${records?.logotype}`} alt="logotype" />
                  </div>
                  <div className={[cl.logotype, cl.logotypeLite].join(" ")}>
                    <img src={`/${records?.logotypeLite}`} alt="logotype" />
                  </div>
                </NavLink>
              </div>
              <div className={cl.headerItem}>
                <div className={cl.searching}>
                <Controller
                control={control}
                name={"searchString"}
                defaultValue={""}
                render={({ field }) => (
                  <SearchInput placeholder={"Пошук"} field={field} callback={searchItems}></SearchInput>
                )}
              ></Controller>
                </div>
              </div>
              <div className={cl.headerItem}></div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <footer>
        <div className={[cl.logotype, cl.logotypeMain].join(" ")}>
          <img src={`/${records?.logotype}`} alt="logotype" />
        </div>
        <div className={[cl.logotype, cl.logotypeLite].join(" ")}>
          <img src={`/${records?.logotypeLite}`} alt="logotype" />
        </div>
        <ul className={cl.information}>
          {records?.contacts?.map(({ text, link, icon }) => (
            <li key={link}>
              <a href={link}>
                <div className={cl.informationItem}>
                  <div className={cl.infoItemIcon}>
                    <img src={`/${icon}`} alt="Icon" />
                  </div>
                  <div className={cl.infoItemlink}>{text}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
};
