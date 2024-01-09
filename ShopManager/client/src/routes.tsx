import { ComponentType } from "react";
import { LOGIN_ROUTE } from "./Auth/consts";
import { Login } from "./Auth/pages/Login";

interface RouteData {
    path: string,
    Component: ComponentType
}

export const authRoutes = [
];

export const publicRoutes: RouteData[] = [
    { path: LOGIN_ROUTE, Component: Login },
];