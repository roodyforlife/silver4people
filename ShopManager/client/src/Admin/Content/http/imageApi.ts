import { $host } from '../../../http';

export const createImage = async (id:string, formData:FormData) => {
    const {data} = await $host.post(`api/Image/${id}`, formData);
    return data;
}

export const editImage = async (id:string, formData:FormData) => {
    const {data} = await $host.put(`api/Image/${id}`, formData);
    return data;
}

export const getImage = async (id:string) => {
    const {data} = await $host.get(`api/Image/${id}`);
    return data;
}