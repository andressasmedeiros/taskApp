// Trash.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const Trash = ({ item, index, onRestore }) => {
  return (
    <View style={styles.taskCard}>
      <View>
        <Text style={styles.taskTitle}>{item.nome}</Text>
        <Text style={styles.taskDescription}>{item.descricao}</Text>
        <Text style={styles.taskDate}>{item.data}</Text>
      </View>
      <TouchableOpacity onPress={() => onRestore(index)}>
        <Entypo name="back" size={24} color="#568db8" />
      </TouchableOpacity>
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
    width: '100%',
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
});

export default Trash;
