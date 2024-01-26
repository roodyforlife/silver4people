import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { InstagramSVG } from "../../../../components/UI/SVGs/InstagramSVG/InstagramSVG";
import { LogotypeSVG } from "../../../../components/UI/SVGs/LogotypeSVG/LogotypeSVG";
import { TelegramSVG } from "../../../../components/UI/SVGs/TelegramSVG/TelegramSVG";
import { MAIN_ROUTE } from "../../../../consts";
import cl from "./Navbar.module.css";

interface IProps {
  children: ReactNode;
}

interface IContact {
  link: string;
  icon: ReactNode;
  text: string;
}

const contacts: IContact[] = [
  {
    text: "silver4woman",
    icon: <InstagramSVG />,
    link: "https://www.instagram.com/silver4woman/",
  },
  {
    text: "kirksfolly_ua",
    icon: <InstagramSVG />,
    link: "https://www.instagram.com/kirksfolly_ua/",
  },
  {
    text: "silverforpeople",
    icon: <InstagramSVG />,
    link: "https://www.instagram.com/silverforpeople/",
  },
  { text: "m9tvey", icon: <TelegramSVG />, link: "https://t.me/m9tvey" },
];

export const Navbar = ({ children }: IProps) => {
  return (
    <div className={cl.wrapper}>
      <header className={cl.header}>
        <div className={cl.headerContent}>
          <nav>
            <div className={cl.headerItem}>
              <NavLink to={MAIN_ROUTE}>
                <div className={cl.logotype}>
                    <LogotypeSVG />
                </div>
              </NavLink>
            </div>
            <div className={cl.headerItem}>
              <ul className={cl.information}>
                {contacts.map(({ text, link, icon }) => (
                  <li>
                    <a href={link}>
                      <div className={cl.informationItem}>
                        <div className={cl.infoItemIcon}>{icon}</div>
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
