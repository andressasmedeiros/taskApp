// Task.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

const Task = ({ item, index, onDelete, onMarkAsCompleted }) => {
  return (
    <View style={styles.taskCard}>
      <View>
        <Text style={styles.taskTitle}>{item.nome}</Text>
        <Text style={styles.taskDescription}>{item.descricao}</Text>
        <Text style={styles.taskDate}>{item.data}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => onDelete(index)}>
          <Entypo name="trash" size={24} color="#568db8" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onMarkAsCompleted(index)} style={styles.completeButton}>
          <FontAwesome5 name="calendar-check" size={24} color="#e35b8f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeButton: {
    marginLeft: 10,
  },
});

export default Task;
