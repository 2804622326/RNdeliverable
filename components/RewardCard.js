// components/RewardCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RewardCard = ({ item, onExchange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>🎁</Text>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.cost}>{item.costPoints} pts</Text>
      <TouchableOpacity style={styles.button} onPress={onExchange}>
        <Text style={styles.buttonText}>Exchange</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 24,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  cost: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#fde047',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default RewardCard;