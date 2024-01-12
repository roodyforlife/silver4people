import { $host } from '../../../http';
import { ICategoryCreateFormData } from '../components/Category/CategoryCreateForm/CategoryCreateForm';
import { ICategoryEditFormData } from '../components/Category/CategoryEditForm/CategoryEditForm';

export const createCategory = async (categoryData:ICategoryCreateFormData) => {
    const { data } = await $host.post('api/Categories', categoryData);
    return data;
}

export const editCategory = async (categoryData:ICategoryEditFormData) => {
    const { data } = await $host.put('api/Categories', categoryData);
    return data;
}

export const getCategories = async () => {
    const {data} = await $host.get('api/Categories');
    return data;
}

export const deleteCategory = async (id:string) => {
    const { data } = await $host.delete('api/Categories/' + id);
    return data;
}