import React, { ReactNode } from 'react'
import cl from './Navbar.module.css';

interface IProps {
    children: ReactNode,
}

export const Navbar = ({children}:IProps) => {
  return (
    <div className={cl.wrapper}>
        <header className={cl.header}>
            <div className={cl.headerContent}>
                <nav>
                    <div className={cl.headerItem}>
                        <div className={cl.logotype}>
                            <h1>SilverForPeople</h1>
                        </div>
                    </div>
                    <div className={cl.headerItem}>
                        <div className={cl.information}>
                            <h4>Telegram: unknown</h4>
                            <h4>Telegram: unknown</h4>
                            <h4>Telegram: unknown</h4>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <main>
            {children}
        </main>
    </div>
  )
}
