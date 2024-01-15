import { ISelect } from "../../../components/UI/Selects/Select/Select";
import { ICategory } from "../../Content/pages/AdminCategories";
import { ISite } from "../../Content/pages/AdminSites";
import { getCategoryFullName } from "../getCategoryFullName";

export const getSelectsCategoryItems = (categories:ICategory[]):ISelect[] => {
    const selects: ISelect[] = categories.map((category) => {return {value: category.id, text: getCategoryFullName(category)}});
    return [{ value: "0", text: "None" }, ...selects];
}

export const getSelectsSiteItems = (sites:ISite[]):ISelect[] => {
    const selects: ISelect[] = sites.map((site) => {return {value: site.id.toString(), text: site.name}});
    return [{ value: "0", text: "None" }, ...selects];
}