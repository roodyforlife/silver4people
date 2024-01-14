import { $host } from '../../../http';

export const createImage = async (id:string, formData:FormData) => {
    const {data} = await $host.post(`api/Image/${id}`, formData);
    return data;
}