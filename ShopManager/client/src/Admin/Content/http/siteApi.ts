import { $host } from '../../../http';

export const getSites = async () => {
    const {data} = await $host.get(`api/Sites`);
    return data;
}