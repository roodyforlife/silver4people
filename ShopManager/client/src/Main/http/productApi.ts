import { $host } from "../../http";
import { createLinkWithParameters } from "../../utils/createLinkWithParameters";
import { IProductsRequest } from "../pages/MainPage/MainPage";

export const getProducts = async (request:IProductsRequest) => {
    const {data} = await $host.get(createLinkWithParameters('api/UserProducts', request));
    return data;
}