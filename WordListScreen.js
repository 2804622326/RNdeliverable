import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  // 从上一个页面获取运算结果
  const { finalResult } = route.params || { finalResult: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result Screen</Text>
      <Text style={styles.result}>Final Result: {finalResult}</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 15 },
  result: { fontSize: 18, marginBottom: 20 },
});