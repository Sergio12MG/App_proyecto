import httpClient from "./base";

// ============ ENDPOINTS DE USUARIOS ============
/**
 * Registrar un usuario
 * @param {object} userData => Los datos del usuario
 */
export function registrarUsuario(userData) {
    return httpClient.post('/api/v1/usuarios/registrar', userData);
}

/**
 * Obtener un usuario por su ID
 * @param {number} id 
 */
export function obtenerUsuario(id) {
    return httpClient.get(`/api/v1/usuarios/${id}`);
}

/**
 * Actualizar un usuario
 * @param {number} id
 * @param {object} userData
 */
export function actualizarUsuario(id, userData) {
    return httpClient.put(`/api/v1/usuarios/${id}`, userData);
}

/**
 * Eliminar un usuario
 * @param {number} id
 */
export function eliminarUsuario(id) {
    return httpClient.delete(`/api/v1/usuarios/${id}`);
}
