import React, { ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE, REACT_APP_API_URL } from "../../../../consts";
import cl from "./Navbar.module.css";
import records from '../../../../records.json';

interface IProps {
  children: ReactNode;
}

export const Navbar = ({ children }: IProps) => {
  return (
    <div className={cl.wrapper}>
      <header className={cl.header}>
        <div className={cl.headerContent}>
          <nav>
            <div className={cl.headerItem}>
              <NavLink to={MAIN_ROUTE}>
                <div className={cl.logotype}>
                  <img src={`/${records?.logotype}`} alt="logotype" />
                </div>
              </NavLink>
            </div>
            <div className={cl.headerItem}>
              <ul className={cl.information}>
                {records?.contacts?.map(({ text, link, icon}) => (
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
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
