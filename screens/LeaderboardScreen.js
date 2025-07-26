// LeaderboardScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { currentUser, leaderboardUsers } from '../constants/mockUsers';

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Day');

  return (
    <ScrollView style={styles.container}>
      {/* Top Stats */}
      <View style={styles.header}>
        <Text style={styles.communityText}>📍 {currentUser.community}</Text>
        <View style={styles.pointRow}>
          <Text style={styles.myPoints}>{currentUser.dailyPoints}</Text>
          <TouchableOpacity
            style={styles.exchangeBtn}
            onPress={() => navigation.navigate('Rewards')}
          >
            <Text style={styles.exchangeText}>Exchange &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Task Completion Card */}
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>You have completed</Text>
        <View style={styles.taskRow}>
          <Text>+50</Text>
          <Text>+50</Text>
          <Text>+100</Text>
        </View>
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.taskButtonText}>Complete Task</Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard Tabs */}
      <View style={styles.tabRow}>
        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
        <View style={styles.tabButtons}>
          {['Day', 'Week', 'All'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextSelected,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Leaderboard List */}
      <View style={styles.listContainer}>
        {[currentUser, ...leaderboardUsers].map((user, index) => (
          <View
            key={index}
            style={[
              styles.userCard,
              user.username.includes('(Myself)') && styles.highlightCard,
            ]}
          >
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.points}>{user.points}</Text>
          </View>
        ))}
      </View>

      {/* More Residents */}
      <TouchableOpacity style={styles.moreBtn}>
        <Text style={styles.moreText}>More Residents &gt;</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  communityText: {
    fontSize: 16,
    color: '#666',
  },
  pointRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  myPoints: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
  },
  exchangeBtn: {
    backgroundColor: '#fcd34d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  exchangeText: {
    color: '#000',
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#e6f4d9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  taskButton: {
    backgroundColor: '#34d399',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  taskButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 10,
  },
  tabTextSelected: {
    color: '#111',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listContainer: {
    marginTop: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  highlightCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    flex: 1,
    fontSize: 16,
  },
  points: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
  },
  moreBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  moreText: {
    color: '#888',
    fontSize: 14,
  },
});

export default LeaderboardScreen;
