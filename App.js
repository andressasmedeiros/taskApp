import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from './screens/TaskScreen'; // Certifique-se de que o caminho está correto
import LastActivityScreen from './screens/LastActivityScreen'; // Certifique-se de que o caminho está correto
import MessageScreen from './screens/MessageScreen'; // Certifique-se de que o caminho está correto
import TrashScreen from './screens/TrashScreen'; // Certifique-se de que o caminho está correto
import { FontAwesome } from '@expo/vector-icons'; // Para os ícones

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Tarefas') {
              iconName = 'list';
            } else if (route.name === 'Últimas Atividades') {
              iconName = 'history';
            } else if (route.name === 'Mensagens') {
              iconName = 'envelope';
            } else if (route.name === 'Lixeira') {
              iconName = 'trash';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e35b8f',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { display: 'flex' }, // Exemplo adicional para estilo
        })}
      >
        <Tab.Screen name="Tarefas" component={TaskScreen}/>
        <Tab.Screen name="Últimas Atividades" component={LastActivityScreen} />
        <Tab.Screen name="Mensagens" component={MessageScreen} />
        <Tab.Screen name="Lixeira" component={TrashScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
