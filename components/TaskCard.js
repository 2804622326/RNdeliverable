import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskCard = ({ task, onComplete }) => {
  return (
    <View style={styles.card}>
      {/* 图标占位符 */}
      <View style={styles.iconPlaceholder} />

      {/* 内容区域 */}
      <View style={styles.contentArea}>
        <Text style={styles.title}>{task.title} +{task.points} pts</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      {/* 按钮区域 */}
      <View style={styles.actionArea}>
        <TouchableOpacity
          style={[styles.button, task.completed && styles.buttonDone]}
          onPress={onComplete}
          disabled={task.completed}
        >
          <Text style={task.completed ? styles.buttonDoneText : styles.buttonText}>
            {task.completed ? 'Done' : 'GO'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#a5f3fc',
    marginRight: 12,
  },
  contentArea: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  actionArea: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fde047',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
  buttonDone: {
    backgroundColor: '#d1d5db',
  },
  buttonDoneText: {
    color: '#666',
  },
});

export default TaskCard;