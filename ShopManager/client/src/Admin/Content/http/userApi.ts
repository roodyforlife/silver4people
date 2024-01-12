import { $host } from '../../../http';
import { IUserCreateFormData } from '../components/User/UserCreate/UserCreateForm';

export const createUser = async (userData:IUserCreateFormData) => {
    const { data } = await $host.post('api/Admins', userData);
    return data;
}

export const getUsers = async () => {
    const {data} = await $host.get('api/Admins');
    return data;
}