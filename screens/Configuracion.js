import { StyleSheet, Text, View, Button } from 'react-native';

import { AuthProvider, useAuth } from '../context/AuthContext';

export default function Configuracion({ navigation }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert("Error al intentar cerrar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Cooming soon :v</Text>

      <Button
        title="Cerrar sesión"
        onPress={handleLogout}
      />
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
