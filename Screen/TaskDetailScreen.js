import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PointsContext } from '../context/PointsContext';

export default function TaskDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addPoints, incrementProgress } = useContext(PointsContext);

  const task = route.params?.task || {};
  const markComplete = route.params?.onComplete;
  const title = task.title || 'Task Detail';
  const description = task.description || '';
  const points = task.points || 0;

  const onComplete = () => {
    markComplete?.();
    addPoints(points);
    incrementProgress();
    navigation.replace('TaskSuccess', { points });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
      <TouchableOpacity style={styles.button} onPress={onComplete}>
        <Text style={styles.buttonText}>Complete Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#374151',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
