import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 1. URL base de la API.
// NOTA: Para usar el emulador de Android, 'http://10.0.2.2:8000' para apuntar al localhost de la PC.
const BASE_URL = 'http://192.168.101.8:8000';

// 2. Crear una instancia de Axios con la configuración base
const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // Tiempo de espera de 5 segundos para la petición
    headers: {
        'Accept': 'application/json',
    }
});

// 3. Interceptor para incluir el token JWT en las solicitudes
httpClient.interceptors.request.use(
    async (config) => {
        // Obtener el token de forma asíncrona desde SecureStore
        const token = await SecureStore.getItemAsync('userToken');

        if (token) {
            // Si el token existe, añadirlo a la cabecera como autorización
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 4. Exportar la instancia para usarla en otros módulos
export default httpClient;