import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TaskSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const points = route.params?.points ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Completed!</Text>
      {points ? <Text style={styles.points}>+{points} pts</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Leaderboard')}
      >
        <Text style={styles.buttonText}>Back to Leaderboard</Text>
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
  points: {
    fontSize: 20,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 20,
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
