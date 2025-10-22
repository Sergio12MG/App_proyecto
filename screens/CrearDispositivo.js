import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function CrearDispositivo({ navigation, onAgregar }) {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);

    // Para seleccionar una imagen desde la galería
    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    // Para crear un nuevo elemento del componente DispositivoItem
    const handleGuardar = () => {
        // Se confirma que sí se haya ingresado un nombre y seleccionado una imagen
        if (nombre.trim().length > 0 && imagen) {
            onAgregar(nombre, imagen); // Se guarda
            navigation.goBack(); // Vuelve a la pantalla de inicio
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
            {imagen && <Image source={{ uri: imagen }} style={styles.imagenPreview} />}
            
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