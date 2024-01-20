import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./Admin/Auth/consts";
import { Login } from "./Admin/Auth/pages/Login";
import { ADMIN_CATEGORIES_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_SITES_ROUTE, ADMIN_USERS_ROUTE } from "./Admin/Content/consts";
import { AdminCategories } from "./Admin/Content/pages/AdminCategories";
import { AdminProducts } from "./Admin/Content/pages/AdminProducts";
import { AdminSites } from "./Admin/Content/pages/AdminSites";
import { AdminUsers } from "./Admin/Content/pages/AdminUsers";
import { MAIN_ROUTE, NO_ROUTE } from "./consts";

interface RouteData {
    path: string,
    Component: ComponentType
}

export const authRoutes: RouteData[] = [
    { path: NO_ROUTE, Component: () => <Navigate to={ADMIN_PRODUCTS_ROUTE} /> },
    { path: MAIN_ROUTE, Component: AdminProducts },
    { path: ADMIN_PRODUCTS_ROUTE, Component: AdminProducts},
    { path: ADMIN_CATEGORIES_ROUTE, Component: AdminCategories},
    { path: ADMIN_USERS_ROUTE, Component: AdminUsers},
    { path: ADMIN_SITES_ROUTE, Component: AdminSites},
];

export const publicRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: Login },
    { path: LOGIN_ROUTE, Component: Login },
];