import { $host } from '../../../http';
import { ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';

export const createCategory = async (categoryData:ICategoryCreateFormData) => {
    const { data } = await $host.post('api/Categories', categoryData);
    return data;
}

export const getCategories = async () => {
    const {data} = await $host.get('api/Categories');
    return data;
}