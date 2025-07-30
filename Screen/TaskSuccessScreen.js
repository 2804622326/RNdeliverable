import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import checkmark from '../assets/Task/checkmark.png';

export default function TaskSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const points = route.params?.points ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={checkmark} style={styles.checkIcon} />
        <Text style={styles.points}>+{points} points</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.buttonText}>Go to leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(180deg, #E8F9E3 0%, #FFEFB7 100%)',
    padding: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#f1fcd8',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  checkIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  points: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: '#006400',
    fontWeight: '600',
    fontSize: 16,
  },
});
