// TaskScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../components/Task'; // Importe o componente Task

export default function TaskScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        setFilteredTasks(JSON.parse(storedTasks));
      }
    };
    fetchTasks();

    const getCurrentDate = () => {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(date.toLocaleDateString('pt-BR', options));
    };
    getCurrentDate();
  }, []);

  const updateTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setFilteredTasks(JSON.parse(storedTasks));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const addTask = async () => {
    if (!newTaskName) {
      Alert.alert('Erro', 'O nome da tarefa não pode ser vazio');
      return;
    }
    const newTask = {
      nome: newTaskName,
      descricao: newTaskDescription,
      status: false,
      data: new Date().toLocaleDateString('pt-BR')
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsModalVisible(false);
    setNewTaskName('');
    setNewTaskDescription('');
  };

  const filterTasks = (text) => {
    const filtered = tasks.filter(task => task.nome.toLowerCase().includes(text.toLowerCase()));
    setFilteredTasks(filtered);
  };

  const deleteTask = async (index) => {
    const taskToDelete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    let storedTrash = await AsyncStorage.getItem('TRASH');
    storedTrash = storedTrash ? JSON.parse(storedTrash) : [];
    const updatedTrash = [...storedTrash, taskToDelete];
    await AsyncStorage.setItem('TRASH', JSON.stringify(updatedTrash));
  };

  const markAsCompleted = async (index) => {
    const taskToComplete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    let storedLastActivities = await AsyncStorage.getItem('LAST_ACTIVITIES');
    storedLastActivities = storedLastActivities ? JSON.parse(storedLastActivities) : [];
    const updatedLastActivities = [...storedLastActivities, taskToComplete];
    await AsyncStorage.setItem('LAST_ACTIVITIES', JSON.stringify(updatedLastActivities));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vetores-gratis/flores-da-margarida-com-padrao-de-fundo-de-vetor-bonito-estilo-desenhado-a-mao_53876-118540.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.headerText}>{currentDate}</Text>
        <TextInput
          placeholder="Filtrar tarefas"
          onChangeText={text => filterTasks(text)}
          style={styles.input}
        />
        <FlatList
          data={filteredTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Task
              item={item}
              index={index}
              onDelete={deleteTask}
              onMarkAsCompleted={markAsCompleted}
            />
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Nome da tarefa"
                value={newTaskName}
                onChangeText={setNewTaskName}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Descrição"
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                style={styles.modalInput}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addTask} style={[styles.modalButton, styles.saveButton]}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Cor rosa
    textAlign: 'center', // Centraliza o texto
    textShadowColor: '#000', // Cor da sombra
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#e35b8f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#e35b8f',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#568db8',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
