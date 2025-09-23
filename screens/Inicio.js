import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import DispositivoItem from '../components/DispositivoItem';

// Recibe como props la navegación y el array de dispositivos (desde App.js)
export default function Inicio({ navigation, dispositivos }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mis dispositivos</Text>

      {/* Muestra la lista de dispositivos si existen */}
      {dispositivos.length > 0 ? (
        <FlatList
          data={dispositivos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DispositivoItem nombre={item.nombre} imagen={item.imagen}></DispositivoItem>
          )}
        >
        </FlatList>
      ) : (
        <Text>Aún no tienes dispositivos añadidos.</Text>
      )}
      
      {/* Botón para navegar al formulario */}
      <Pressable
        style={styles.boton}
        onPress={() => navigation.navigate('CrearDispositivo')}
      >
        <Text style={styles.textoBoton}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0BC9F4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textoBoton: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});