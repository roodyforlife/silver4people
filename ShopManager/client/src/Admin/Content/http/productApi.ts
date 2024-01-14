import { $host } from '../../../http';
import { IProductCreateFormData } from '../components/Product/ProductCreate/ProductCreateForm';

export const createProduct = async (productData:IProductCreateFormData) => {
    console.log(productData)
    const { data } = await $host.post('api/AdminProducts', productData);
    return data;
}

export const getProducts = async () => {
    const {data} = await $host.get('api/AdminProducts');
    return data;
}