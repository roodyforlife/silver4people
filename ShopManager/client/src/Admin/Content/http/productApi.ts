import { $host } from '../../../http';
import { createLinkWithParameters } from '../../utils/createLinkWithParameters';
import { IProductCreateFormData } from '../components/Product/ProductCreate/ProductCreateForm';
import { IProductsRequest } from '../pages/AdminProducts';

export const createProduct = async (productData:IProductCreateFormData) => {
    const { data } = await $host.post('api/AdminProducts', productData);
    return data;
}

export const getProducts = async (request:IProductsRequest) => {
    const {data} = await $host.get(createLinkWithParameters('api/AdminProducts', request));
    console.log(data)
    return data;
}