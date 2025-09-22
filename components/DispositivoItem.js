import { StyleSheet, Text, View, Pressable, Image } from "react-native";

export default function DispositivoItem({ nombre, imagen }) {
    return (
        <View style={styles.cont}>
            <Text>{ nombre }</Text>
            <Image
                source={{ uri: imagen }}
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
        padding: 20,
        margin: 15
    },
    image: {
        width: 100,
        height: 150,
    }
});
