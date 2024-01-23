import { ICategory } from "../../Content/pages/AdminCategories";
import { ISite } from "../../Content/pages/AdminSites";
import { getCategoryFullName } from "../getCategoryFullName";

export interface ISelect {
    value: string,
    label: string
}

export const getSelectsCategoryItems = (categories:ICategory[]):ISelect[] => {
    const selects: ISelect[] = categories.map((category) => {return {value: category.id.toString(), label: getCategoryFullName(category)}});
    return selects;
}

export const getSelectsSiteItems = (sites:ISite[]):ISelect[] => {
    const selects: ISelect[] = sites.map((site) => {return {value: site.id.toString(), label: site.name}});
    return selects;
}