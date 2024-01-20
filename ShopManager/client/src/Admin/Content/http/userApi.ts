import { $authhost, $host } from '../../../http';
import { IUserCreateFormData } from '../components/User/UserCreate/UserCreateForm';

export const createUser = async (userData:IUserCreateFormData) => {
    const { data } = await $authhost.post('api/Auth/registerAdmin', userData);
    return data;
}

export const getUsers = async () => {
    const {data} = await $authhost.get('api/Auth');
    return data;
}

export const deleteUser = async (login: string) => {
    const {data} = await $authhost.delete('api/Auth/' + login);
    return data;
}

export const editUser = async (login: string) => {
    const {data} = await $authhost.delete('api/Auth/' + login);
    return data;
}