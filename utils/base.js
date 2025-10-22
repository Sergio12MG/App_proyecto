import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 1. URL base de la API.
// NOTA: Reemplaza 'TU_IP_LOCAL' con la dirección IP de la máquina donde corre tu API de FastAPI.
// Por ejemplo: 'http://192.168.1.10:8000/api/v1'
// Si usas el emulador de Android, puedes usar 'http://10.0.2.2:8000/api/v1' para apuntar al localhost de tu PC.
const BASE_URL = 'http://192.168.1.10:8000/api/v1';

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