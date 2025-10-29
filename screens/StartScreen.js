import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function StartScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Selecciona una opción para continuar</Text>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('LoginView')}
            >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('RegistrationUserView')}
            >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Registrarse</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 40, textAlign: 'center' },
    button: { backgroundColor: '#00C7CC', paddingVertical: 15, paddingHorizontal: 80, borderRadius: 10, marginBottom: 15, width: '100%', alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    secondaryButton: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#00C7CC' },
    secondaryButtonText: { color: '#00C7CC' },
});