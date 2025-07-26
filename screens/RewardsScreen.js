// RewardsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import RewardCard from '../components/RewardCard';
import { rewardItems } from '../constants/mockRewards';

const RewardsScreen = () => {
  const [points, setPoints] = useState(500); // 假设当前用户有500积分

  const handleExchange = (item) => {
    if (points >= item.costPoints) {
      setPoints(points - item.costPoints);
      Alert.alert('Success', `You have redeemed: ${item.name}`);
    } else {
      Alert.alert('Not Enough Points', 'You do not have enough points to redeem this item.');
    }
  };

  return (
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
