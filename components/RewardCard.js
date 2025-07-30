// components/RewardCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RewardCard = ({ item, onExchange }) => {
  return (
    <View style={styles.card}>
      {/* 图片插槽 */}
      <View style={styles.imageSlot}>
        {item.image
          ? <Image source={item.image} style={styles.image} resizeMode="contain" />
          : <Text style={styles.iconText}>{item.icon}</Text>
        }
      </View>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <Text style={styles.cost}>{item.costPoints} point</Text>
      <TouchableOpacity style={styles.button} onPress={onExchange}>
        <Text style={styles.buttonText}>Exchange</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(93, 186, 116, 0.05)' ,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  imageSlot: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18, // 增大图片和文字的间隔
  },
  image: {
    width: 75,
    height: 75,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  iconText: {
    fontSize: 36,
  },
  name: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
    width: '100%',
  },
  cost: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#ffe066',
    paddingVertical: 7,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#ffe066',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignSelf: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: '#222',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RewardCard;
