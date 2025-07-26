// TasksScreen.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { taskList } from '../constants/mockTasks';
import TaskCard from '../components/TaskCard';

const TasksScreen = () => {
  const [tasks, setTasks] = useState(taskList);

  const handleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={() => handleComplete(task.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    flex: 1,
    padding: 16,
  },
});

export default TasksScreen;
