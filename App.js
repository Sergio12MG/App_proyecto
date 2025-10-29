import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';

import Inicio from './screens/Inicio';
import Controlador from './screens/Controlador';
import CrearDispositivo from './screens/CrearDispositivo';
import Configuracion from './screens/Configuracion';
import LoginScreen from './screens/Login';
import RegistrationScreen from './screens/Registration';
import StartScreen from './screens/StartScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { registrarDispositivo, obtenerDispositivos } from './utils/dispositivos';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegación entre:
// Pantalla de inicio <===> Pantalla con formulario de registro de un dispositivo
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

// Navegación desde la pantalla de presentación entre:
// Pantalla de login <===> Pantalla de registro de usuario
function StartStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" options={{ headerShown: false }}>
        {(props) => <StartScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="LoginView" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="RegistrationUserView" options={{ headerShown: false }}>
        {(props) => <RegistrationScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppContent() {
  const { isLoading, isAuthenticated, logout } = useAuth(); // Valores del contexto de autenticación
  const [dispositivos, setDispositivos] = useState([]); // Array para dispositivos

  // Cargar los dispositivos cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      obtenerDispositivos()
        .then(response => {
          // La API devuelve un objeto con un campo 'datos' que es la lista
          setDispositivos(response.data.datos || []);
        })
        .catch(error => {
          console.error('Error al obtener los dispositivos:', error);
          // Si el error es 404 (no hay dispositivos) o es 401 (el token ya no es válido/expiró), simplemente se deja la lista vacía.
          if (error.response && error.response.status === 404 || error.response && error.response.status === 401) {
            setDispositivos([]);
          } else {
            Alert.alert('Error', 'No se pudieron cargar los dispositivos.');
          }
        });
    }
  }, [isAuthenticated]); // Se ejecuta cada vez que 'isAuthenticated' cambia

  // Agregar un dispositivo con nombre e imagen
  function agregarDispositivo(nombre, imagen) {
    // La lógica para crear el FormData está en `registrarDispositivo`.
    registrarDispositivo({ nombre, imagen })
      .then(response => {
        // Se añade el nuevo dispositivo (que viene en response.data.datos) a la lista existente
        setDispositivos(prevDispositivos => [...prevDispositivos, response.data.datos]);
      })
      .catch(error => {
        console.error('Error al registrar el dispositivo:', error);
        Alert.alert('Error al registrar el dispositivo');
      });
  }

  // Muestra el indicador de carga mientras se verifica el token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ============================================================================
  // ============================ CARGA DE PANTALLAS ============================
  // ============================================================================
  // Si el usuario no está autenticado, muestra la pantalla de Login
  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <StartStackScreen />
      </NavigationContainer>
    );
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
          {(props) => <Configuracion {...props} onLogout={logout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
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
