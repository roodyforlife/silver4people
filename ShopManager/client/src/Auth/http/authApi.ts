import { jwtDecode } from 'jwt-decode';
import { $host } from '../../http';
import { LoginFormData } from '../pages/Login';

export type ClaimName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name" | "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
export type UserClaims = {
    [key in ClaimName]:string;
}

export const login = async (loginData:LoginFormData) => {
    const { data } = await $host.post('api/Authorization/signIn', loginData)
    localStorage.setItem('token', data)
    return jwtDecode(data) as UserClaims;
}