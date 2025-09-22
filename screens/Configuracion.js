import { StyleSheet, Text, View, Button } from 'react-native';

export default function Configuracion({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Cooming soon :v</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
