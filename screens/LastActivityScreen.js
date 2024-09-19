// LastActivityScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LastActivity from '../components/LastActivity'; // Importe o componente LastActivity
import { useFocusEffect } from '@react-navigation/native';

export default function LastActivityScreen({ navigation }) {
  const [lastActivities, setLastActivities] = useState([]);

  const loadLastActivities = useCallback(async () => {
    const storedLastActivities = await AsyncStorage.getItem('LAST_ACTIVITIES');
    if (storedLastActivities) {
      setLastActivities(JSON.parse(storedLastActivities));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();
    }, [loadLastActivities])
  );

  const removeTask = async (index) => {
    const taskToRemove = lastActivities[index];
    let storedTasks = await AsyncStorage.getItem('tasks');
    storedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = [...storedTasks, taskToRemove];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    const updatedLastActivities = lastActivities.filter((_, i) => i !== index);
    setLastActivities(updatedLastActivities);
    await AsyncStorage.setItem('LAST_ACTIVITIES', JSON.stringify(updatedLastActivities));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vetores-gratis/flores-da-margarida-com-padrao-de-fundo-de-vetor-bonito-estilo-desenhado-a-mao_53876-118540.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {lastActivities.length > 0 ? (
            <FlatList
              data={lastActivities}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <LastActivity
                  item={item}
                  index={index}
                  onRemove={removeTask}
                />
              )}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyMessage}>Não há atividades recentes na aplicação.</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
