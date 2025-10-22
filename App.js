import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, {useState} from 'react';

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import Inicio from './screens/Inicio';
import Controlador from './screens/Controlador';
import CrearDispositivo from './screens/CrearDispositivo';
import Configuracion from './screens/Configuracion';
import LoginScreen from './screens/Login';
import { logout } from './utils/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegación para el formulario de registro de un dispositivo
function InicioStackScreen({ agregarDispositivo, dispositivos }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InicioPrincipal" options={{ headerShown: false }}>
        {(props) => <Inicio {...props} dispositivos={dispositivos} />}
      </Stack.Screen>
      <Stack.Screen name="CrearDispositivo" options={{ title: 'Agregar Dispositivo' }}>
        {(props) => <CrearDispositivo {...props} onAgregar={agregarDispositivo} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  // Estados para manejar el flujo de autenticación
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Array para almacenar dispositivos (estado compartido entre los componentes Inicio.js y CrearDispositivo.js)
  const [dispositivos, setDispositivos] = useState([]);

  // Agregar un dispositivo con nombre e imagen
  function agregarDispositivo(nombre, imagen) {
    const nuevoDispositivo = {
      id: Math.random().toString(),
      nombre: nombre,
      imagen: imagen,
    };
    setDispositivos((currentDispositivos) => [...currentDispositivos, nuevoDispositivo]);
  }

  // Al cargar la app, verificar si existe un token
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          setIsAuthenticated(true); // Si hay token, el usuario está autenticado
        }
      } catch (e) {
        console.error("Error al leer el token", e);
      } finally {
        setIsLoading(false); // Termina la carga
      }
    };

    checkAuthStatus();
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  // Muestra un indicador de carga mientras se verifica el token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si el usuario no está autenticado, muestra la pantalla de Login
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Si el usuario está autenticado, muestra la navegación principal
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Controlador') iconName = focused ? 'radio' : 'radio-outline';
            else if (route.name === 'Configuracion') iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00C7CC',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Inicio">
          {(props) => <InicioStackScreen {...props} dispositivos={dispositivos} agregarDispositivo={agregarDispositivo} />}
        </Tab.Screen>
        <Tab.Screen name="Controlador" component={Controlador} />
        <Tab.Screen name="Configuracion">
          {(props) => <Configuracion {...props} onLogout={handleLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
