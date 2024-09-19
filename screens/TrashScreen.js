import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Trash from '../components/Trash';

export default function TrashScreen() {
  const [trashTasks, setTrashTasks] = useState([]);

  const loadTrashTasks = useCallback(async () => {
    const storedTrash = await AsyncStorage.getItem('TRASH');
    if (storedTrash) {
      setTrashTasks(JSON.parse(storedTrash));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTrashTasks();
    }, [loadTrashTasks])
  );

  const restoreTask = async (index) => {
    const restoredTask = trashTasks[index];
    let storedTasks = await AsyncStorage.getItem('tasks');
    storedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = [...storedTasks, restoredTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    const updatedTrash = trashTasks.filter((_, i) => i !== index);
    setTrashTasks(updatedTrash);
    await AsyncStorage.setItem('TRASH', JSON.stringify(updatedTrash));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vetores-gratis/flores-da-margarida-com-padrao-de-fundo-de-vetor-bonito-estilo-desenhado-a-mao_53876-118540.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {trashTasks.length > 0 ? (
          <FlatList
            data={trashTasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Trash item={item} index={index} onRestore={restoreTask} />
            )}
          />
        ) : (
          <Text style={styles.messageText}>Não há tarefas na lixeira.</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Efeito esbranquiçado
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#333', 
    textAlign: 'center',
  },
});
