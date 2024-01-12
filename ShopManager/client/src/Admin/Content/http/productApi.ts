import { $host } from '../../../http';
import { IProductCreateFormData } from '../components/Product/ProductCreate/ProductCreateForm';

export const createProduct = async (productData:IProductCreateFormData) => {
    const { data } = await $host.post('api/Products', productData);
    return data;
}

export const getProducts = async () => {
    const {data} = await $host.get('api/Products');
    return data;
}