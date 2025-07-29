// RewardsScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
import RewardCard from '../components/RewardCard';
import { rewardItems } from '../constants/mockRewards';
import { PointsContext } from '../context/PointsContext';

const RewardsScreen = () => {
  const { points, deductPoints } = useContext(PointsContext);

  const handleExchange = (item) => {
    if (points >= item.costPoints) {
      deductPoints(item.costPoints);
      const msg = `You have redeemed: ${item.name}`;
      if (Platform.OS === 'web') {
        window.alert(`Success\n${msg}`);
      } else {
        Alert.alert('Success', msg);
      }
    } else {
      const err = 'You do not have enough points to redeem this item.';
      if (Platform.OS === 'web') {
        window.alert(`Not Enough Points\n${err}`);
      } else {
        Alert.alert('Not Enough Points', err);
      }
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
