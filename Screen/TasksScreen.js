// TasksScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { taskList } from '../constants/mockTasks';
import TaskCard from '../components/TaskCard';

export default function TasksScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(taskList);

  // 按“索引”完成，避免重复 id 影响到多条
  const handleCompleteAt = (index) => {
    setTasks((prev) =>
      prev.map((t, i) => {
        if (i === index && !t.completed) {
          return { ...t, completed: true };
        }
        return t;
      })
    );
  };

  const handlePressTask = (task, index) => {
    navigation.navigate('TaskDetail', {
      task,
      onComplete: () => handleCompleteAt(index),
    });
  };

  // 过滤掉 undefined / null / 非对象
  const safeTasks = Array.isArray(tasks)
    ? tasks.filter((t) => t && typeof t === 'object')
    : [];

  return (
    <ImageBackground
      source={require('../assets/Lead/bg.png')}
      style={[styles.screenBg, Platform.OS === 'web' && styles.screenBgWeb]}
      imageStyle={styles.screenBgImage}
    >
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Task List</Text>

          <View style={styles.rightPlaceHolder} />
        </View>

        {/* List */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {safeTasks.map((task, index) => (
            <TaskCard
              key={task.id ?? `idx-${index}`}
              task={task}
              onComplete={() => handlePressTask(task, index)}
              containerStyle={styles.cardSpacing}
              glass={true}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screenBg: { flex: 1 },
  screenBgWeb: { width: '100%', height: '100%' },
  screenBgImage: { resizeMode: 'cover' },

  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web' && { width: '100%', maxWidth: 480, alignSelf: 'center' }),
  },

  /* header */
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    lineHeight: 28,
    color: '#111',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
  },
  rightPlaceHolder: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    ...(Platform.OS === 'web' && { width: '100%', maxWidth: 480, alignSelf: 'center' }),
  },

  cardSpacing: {
    marginVertical: 10,
  },
});
