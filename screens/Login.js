import * as React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
    const [correo, setCorreo] = React.useState('');
    const [contrasena, setContrasena] = React.useState('');
    const [cargando, setCargando] = React.useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        // Validar que se proporcionaron correo y contraseña
        if (!correo || !contrasena) {
            Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
            return;
        }

        setCargando(true);
        try {
            // Llama a la función de login del servicio de autenticación
            await login(correo, contrasena);
            // El estado de autenticación se actualizará automáticamente en el contexto
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            Alert.alert("Error de inicio de sesión", "El correo o la contraseña son incorrectos.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
            />
            <Button title={cargando ? "Iniciando..." : "Iniciar Sesión"} onPress={handleLogin} disabled={cargando} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 5 },
});