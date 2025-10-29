import * as React from 'react';
import { Pressable, Button, Text, View, StyleSheet, Alert, TextInput } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { registrarUsuario } from '../utils/usuarios';

export default function RegistrationScreen({ navigation }) {
    const [nombre, setNombre] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [contrasena, setContrasena] = React.useState('');
    const [cargando, setCargando] = React.useState(false);
    const { login } = useAuth();

    const handleRegistration = async () => {
        // Validar que se proporcionaron los datos
        if (!nombre || !correo || !contrasena) {
            Alert.alert("Error", "Por favor, ingresa todos los campos.");
            return;
        }

        setCargando(true);

        const userData = {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        };

        try {
            // Llama a la función para registrar un usuario
            await registrarUsuario(userData);
        } catch (error) {
            Alert.alert("Error", "Este correo ya está en uso.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                keyboardType="ascii-capable"
            />

            <TextInput
                style={styles.input}
                placeholder="Correo"
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
                autoCapitalize="none"
                secureTextEntry
            />

            <Button 
                title={cargando ? "Iniciando..." : "Entrar"}
                onPress={handleRegistration} disabled={cargando}
                style={styles.button}
            />

            <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate('LoginView')}>
                <Text style={styles.link_text}>Iniciar sesión</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, borderRadius: 5 },
    text: { fontSize: 17, textAlign: 'center', margin: 10, marginTop: 30 },
    link_text: { fontSize: 17, textAlign: 'center', margin: 10, color: '#00C7CC' },
    button: { color: '#00C7CC' },
});