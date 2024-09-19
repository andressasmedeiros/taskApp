// LastActivity.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const LastActivity = ({ item, index, onRemove }) => {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.nome}</Text>
        <Text style={styles.taskDescription}>{item.descricao}</Text>
        <Text style={styles.taskDate}>{item.data}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(index)}>
        <Ionicons name="arrow-undo" size={24} color="#e35b8f" />
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
  taskDetails: {
    flex: 1,
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

export default LastActivity;
