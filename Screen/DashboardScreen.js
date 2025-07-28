// DashboardScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { currentUser } from '../constants/mockUsers';

const DashboardScreen = () => {
  const [viewMode, setViewMode] = useState('home'); // 'home' or 'community'

  return (
    <ScrollView style={styles.container}>
      {/* Top Greeting Section */}
      <View style={styles.header}>
        <Text style={styles.communityText}>📍 {currentUser.community}</Text>
        <Text style={styles.greetingText}>Good Morning, {currentUser.username}!</Text>
      </View>

      {/* Data Card Section */}
      <View style={styles.cardWrapper}>
        <Image
          source={require('../assets/images/chart.png')} // 替换为你的背景图片
          style={styles.backgroundImage}
        />
        <View style={styles.overlayCard}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser.dailyEnergy} kWh</Text>
            <Text style={styles.statLabel}>Used</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser.dailyPoints} pts</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === 'home' ? 'community' : 'home')}
          style={styles.switchBtn}
        >
          <Text style={styles.switchText}>{viewMode === 'home' ? 'My Home' : 'Community'}</Text>
        </TouchableOpacity>
      </View>

      {/* Static Banner Placeholder */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/images/join-challenge-banner.png')} // 用作静态装饰图
          style={styles.bannerImage}
        />
      </View>

      {/* Static Chart Section */}
      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Energy Behavior Tracker</Text>
        <Image
          source={require('../assets/images/chart.png')} // 折线图静态图
          style={styles.chartImage}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    flex: 1,
  },
  header: {
    padding: 20,
  },
  communityText: {
    fontSize: 16,
    color: '#666',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardWrapper: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: 180,
  },
  overlayCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 16,
    borderRadius: 16,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  switchBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  switchText: {
    fontSize: 12,
    color: '#333',
  },
  bannerContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  bannerImage: {
    width: '90%',
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  chartImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 12,
  },
});

export default DashboardScreen;
