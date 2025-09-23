import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function CrearDispositivo({ navigation, onAgregar }) {
    const [nombre, setNombre] = useState('');
    const [imagenUri, setImagenUri] = useState(null);

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Se necesita permiso para acceder a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.mediaTypes.Image,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImagenUri(result.assets[0].uri);
        }
    };

    const handleGuardar = () => {
        if (nombre.trim().length > 0 && imagenUri) {
            onAgregar(nombre, imagenUri);
            navigation.goBack(); // Volver a la pantalla de inicio
        } else {
            alert('Por favor, ingresa un nombre y selecciona una imagen.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre del dispositivo</Text>

            <TextInput
                style={StyleSheet.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="Ej. Llave Inteligente"
            ></TextInput>

            <Button title="Seleccionar Imagen" onPress={handlePickImage} />
            {imagenUri && <Image source={{ uri: imagenUri }} style={styles.imagenPreview} />}
            
            <Button title="Guardar Dispositivo" onPress={handleGuardar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4b4b4bff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    imagenPreview: {
        width: 200,
        height: 200,
        marginTop: 15,
        marginBottom: 15,
        alignSelf: 'center',
        borderRadius: 10,
    },
});