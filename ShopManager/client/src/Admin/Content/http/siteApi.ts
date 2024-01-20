import { $host } from '../../../http';
import { ISiteCreateFormData } from '../components/Site/SiteCreateForm/SiteCreateForm';
import { ISiteEditFormData } from '../components/Site/SiteEditForm/SiteEditForm';

export const getSites = async () => {
    const {data} = await $host.get(`api/Sites`);
    return data;
}

export const createSite = async (formData:ISiteCreateFormData) => {
    const {data} = await $host.post(`api/Sites`, formData);
    return data;
}

export const editSite = async (formData:ISiteEditFormData) => {
    const { data } = await $host.put('api/Sites', formData);
    return data;
}

export const deleteSite = async (id:number) => {
    const { data } = await $host.delete('api/Sites/' + id);
    return data;
}