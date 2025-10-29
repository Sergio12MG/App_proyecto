import httpClient from "./base";

// ============ ENDPOINTS DE USUARIOS ============
/**
 * Registrar un dispositivo
 * @param {object} deviceData => Datos del dispositivo
 * @param {string} deviceData.nombre => Nombre del dispositivo
 * @param {string} deviceData.imagen => URI local de la imagen
 */
export function registrarDispositivo(deviceData) {
    const formData = new FormData();

    // Extraer nombre del archivo y tipo de la URI
    const uriParts = deviceData.imagen.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const fileName = `dispositivo_${Date.now()}.${fileType}`;

    // Agregar el nombre e imagen al formData (tipo de formulario que admite el envío de archivos)
    formData.append('nombre', deviceData.nombre);
    formData.append('imagen', {
        uri: deviceData.imagen,
        name: fileName,
        type: `image/${fileType}`,
    });

    return httpClient.post('/api/v1/dispositivos/registrar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

/**
 * Obtener und dispositivo por su ID
 * @param {number} id
 */
export function obtenerDispositivo(id) {
    return httpClient.get(`/api/v1/dispositivos/${id}`);
}

/**
 * Obtener dispositivos
 */
export function obtenerDispositivos() {
    return httpClient.get('/api/v1/dispositivos/');
}

/**
 * Actualizar un dispositivo
 * @param {number} id
 * @param {object} deviceData
 */
export function actualizarDispositivo(id, deviceData) {
    return httpClient.put(`/api/v1/dispositivos/${id}`, deviceData);
}

/**
 * Eliminar un dispositivo
 * @param {number} id
 */
export function eliminarDispositivo(id) {
    return httpClient(`/api/v1/dispositivos/${id}`);
}
