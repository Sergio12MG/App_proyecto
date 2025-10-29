import * as SecureStore from 'expo-secure-store';
import httpClient from '../utils/base';

export const login = async (correo, contrasena) => {
    // La autenticación de FastAPI depende del formulario OAuth2PasswordRequestForm
    const formData = new URLSearchParams();
    formData.append('username', correo);
    formData.append('password', contrasena);

    // Enviar la solicitud
    const response = await httpClient.post('/api/v1/auth/token', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    // Si la API generó el token, guardarlo en SecureStore
    if (response.data.access_token) {
        await SecureStore.setItemAsync('userToken', response.data.access_token);
    }

    return response.data;
};

export const logout = async () => {
    // Elimina el token de SecureStore
    await SecureStore.deleteItemAsync('userToken');
};