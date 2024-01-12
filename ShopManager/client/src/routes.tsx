import { ComponentType } from "react";
import { LOGIN_ROUTE } from "./Admin/Auth/consts";
import { Login } from "./Admin/Auth/pages/Login";
import { ADMIN_CATEGORIES_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_USERS_ROUTE } from "./Admin/Content/consts";
import { AdminCategories } from "./Admin/Content/pages/AdminCategories";
import { AdminProducts } from "./Admin/Content/pages/AdminProducts";
import { AdminUsers } from "./Admin/Content/pages/AdminUsers";

interface RouteData {
    path: string,
    Component: ComponentType
}

export const authRoutes: RouteData[] = [
    { path: ADMIN_PRODUCTS_ROUTE, Component: AdminProducts},
    { path: ADMIN_CATEGORIES_ROUTE, Component: AdminCategories},
    { path: ADMIN_USERS_ROUTE, Component: AdminUsers},
];

export const publicRoutes: RouteData[] = [
    { path: LOGIN_ROUTE, Component: Login },
];