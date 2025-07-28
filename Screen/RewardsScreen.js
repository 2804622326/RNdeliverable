// RewardsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import RewardCard from '../components/RewardCard';
import { rewardItems } from '../constants/mockRewards';

const RewardsScreen = () => {
  const [points, setPoints] = useState(500); // 可用积分（不再单独显示）

  const handleExchange = (item) => {
    if (points >= item.costPoints) {
      setPoints((p) => p - item.costPoints);
      Alert.alert('Success', `You have redeemed: ${item.name}`);
    } else {
      Alert.alert('Not Enough Points', 'You do not have enough points to redeem this item.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Lead/bg.png')}
      style={styles.bg}
      imageStyle={styles.bgImg}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Exchange List</Text>

        <FlatList
          data={rewardItems}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <RewardCard item={item} onExchange={() => handleExchange(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  bgImg: { resizeMode: 'cover' },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111',
    marginBottom: 12,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default RewardsScreen;