import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import Inicio from './screens/Inicio';
import Controlador from './screens/Controlador';
import CrearDispositivo from './screens/CrearDispositivo';
import Configuracion from './screens/Configuracion';

const Tab = createBottomTabNavigator();

export default function App() {
  // Array para almacenar dispositivos
  const [dispositivos, setDispositivos] = useState([]);

  function agregarDispositivo(nombre, imagen) {
    const nuevoDispositivo = {
      id: Math.random().toString(),
      nombre: nombre,
      imagen: imagen,
    };
    setDispositivos((currentDispositivos) => [...currentDispositivos, nuevoDispositivo]);
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Controlador') {
              iconName = focused ? 'radio' : 'radio-outline';
            } else if (route.name === 'Configuracion') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Agregar dispositivo') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00C7CC',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Inicio" component={Inicio} options={{ title: 'Inicio' }} />
        <Tab.Screen name="Controlador" component={Controlador} options={{ title: 'Controlador' }} />
        <Tab.Screen name="Agregar dispositivo" component={CrearDispositivo} options={{ title: 'Agregar dispositivo' }}  />
        <Tab.Screen name="Configuracion" component={Configuracion} options={{ title: 'Configuración' }} />
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
