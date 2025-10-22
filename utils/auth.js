import * as SecureStore from 'expo-secure-store';
import httpClient from '../utils/base';

export const login = async (correo, contrasena) => {
    const formData = new URLSearchParams();
    formData.append('username', correo);
    formData.append('password', contrasena);

    const response = await httpClient.post('/auth/token', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (response.data.access_token) {
        await SecureStore.setItemAsync('userToken', response.data.access_token);
    }

    return response.data;
};

export const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
};