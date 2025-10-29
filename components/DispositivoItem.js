import { StyleSheet, Text, View, Pressable, Image } from "react-native";

// NOTA: Asegúrate de que esta URL coincida con la de tu archivo base.js
const BASE_URL = 'http://192.168.101.8:8000';

export default function DispositivoItem({ nombre, imagen }) {
    return (
        <View style={styles.cont}>
            <Text>{ nombre }</Text>
            {/* La imagen viene del servidor, por lo que se construye la URL completa */}
            <Image
                source={{ uri: `${BASE_URL}/${imagen}` }}
                style={[styles.image, { resizeMode: 'cover' }]}
            ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        borderColor: '#0BC9F4',
        borderWidth: 5,
        borderRadius: 15,
        padding: 15,
        margin: 10,
        flex: 1, // Permite que el elemento ocupe el espacio disponible
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 15,
        marginTop: 10,
    }
});
