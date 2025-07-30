// screens/HomeScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';

import { BlurView } from 'expo-blur';

// Temporarily use local mock data instead of calling the backend
import { energyStats } from '../constants/mockStats';
import { Images } from '../assets';

export default function DashboardScreen() {
  const [mode, setMode] = useState('home');    // 'home' 或 'community'
  const [stats, setStats] = useState(null);
  const animated = useRef(new Animated.Value(0)).current;
  const isWeb = Platform.OS === 'web';
  const Container = isWeb ? ScrollView : View;

// For demo purposes, switch stats based on the selected mode without API calls
useEffect(() => {
  setStats(energyStats[mode]);
}, [mode]);

  // 翻转动画插值
  const frontInterpol = animated.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpol = animated.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const FrontCard = isWeb ? View : Animated.View;
  const BackCard = isWeb ? View : Animated.View;

  const BlurWrapper = ({ children }) =>
    isWeb ? (
      <View style={[styles.pillBlur, styles.webBlur]}>{children}</View>
    ) : (
      <BlurView
        style={styles.pillBlur}
        intensity={80}
        tint="light"
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : 'none'}
        blurReductionFactor={4}
      >
        {children}
      </BlurView>
    );

  // 执行动画并切换模式
  const flipCard = () => {
    if (isWeb) {
      setMode(prev => (prev === 'home' ? 'community' : 'home'));
      return;
    }
    Animated.spring(animated, {
      toValue: mode === 'home' ? 180 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      setMode(prev => (prev === 'home' ? 'community' : 'home'));
    });
  };

  return (
    <ImageBackground
      source={require('../assets/HomeScreen/bg.png')}
      style={[styles.screenBg, isWeb && styles.screenBgWeb]}
      imageStyle={styles.screenBgImage}
    >
      <Container
        style={[styles.container, !isWeb && styles.content]}
        {...(isWeb ? { contentContainerStyle: styles.content } : {})}
      >
      {/* 头部 */}
      <View style={styles.header}>
        <Image source={Images.mapPin} style={styles.iconSmall} />
        <Text style={styles.location}>UCC Community</Text>
        <Image source={Images.bell} style={styles.iconSmall} />
      </View>

      <Text style={styles.greeting}>Good Morning James!</Text>

      {/* 翻转卡片 */}
      <View style={styles.cardWrapper}>
        {/* 我的家（正面） */}
        <FrontCard
          style={[
            styles.innerCard,
            !isWeb && { transform: [{ rotateY: frontInterpol }] },
            mode === 'community' && { opacity: 0, display: isWeb ? 'none' : 'flex' }
          ]}
        >
          <ImageBackground
            source={require('../assets/HomeScreen/my-home-bg.png')}
            style={styles.cardBg}
            imageStyle={styles.cardBgImage}
          >
            <Pressable style={styles.modeRow} onPress={flipCard} hitSlop={8}>
              <Image source={require('../assets/HomeScreen/swap.png')} style={styles.modeIcon} />
              <Text style={styles.modeText}>My Home</Text>
            </Pressable>
            <View style={styles.statRow}>
              <View style={styles.pillBox}>
                <BlurWrapper>
                  <View style={styles.pillHeaderRow}>
                    <Image source={require('../assets/HomeScreen/lightning.png')} style={styles.pillIcon} />
                  </View>
                  <View style={styles.valueRow}>
                    <Text style={styles.bigNumber}>{stats ? stats.used.toFixed(1) : '--'}</Text>
                    <Text style={styles.unitText}> kWh</Text>
                  </View>
                  <Text style={styles.pillCaption}>Used</Text>
                </BlurWrapper>
              </View>
              <View style={styles.pillBox}>
                <BlurWrapper>
                  <View style={styles.pillHeaderRow}>
                    <Image source={require('../assets/HomeScreen/star.png')} style={styles.pillIcon} />
                  </View>
                  <View style={styles.valueRow}>
                    <Text style={styles.bigNumber}>{stats ? stats.earned : '--'}</Text>
                    <Text style={styles.unitText}> pts</Text>
                  </View>
                  <Text style={styles.pillCaption}>Earned</Text>
                </BlurWrapper>
              </View>
            </View>
          </ImageBackground>
        </FrontCard>

        {/* 社区（背面） */}
        <BackCard
          style={[
            styles.innerCard,
            !isWeb && { transform: [{ rotateY: backInterpol }] },
            mode === 'home' && { opacity: 0, display: isWeb ? 'none' : 'flex' }
          ]}
        >
          <ImageBackground
            source={require('../assets/HomeScreen/community-bg.png')}
            style={styles.cardBg}
            imageStyle={styles.cardBgImage}
          >
            <Pressable style={styles.modeRow} onPress={flipCard} hitSlop={8}>
              <Image source={require('../assets/HomeScreen/swap.png')} style={styles.modeIcon} />
              <Text style={styles.modeText}>Community</Text>
            </Pressable>
            <View style={styles.statRow}>
              <View style={styles.pillBox}>
                <BlurWrapper>
                  <View style={styles.pillHeaderRow}>
                    <Image source={require('../assets/HomeScreen/lightning.png')} style={styles.pillIcon} />
                  </View>
                  <View style={styles.valueRow}>
                    <Text style={styles.bigNumber}>{stats ? stats.used.toFixed(1) : '--'}</Text>
                    <Text style={styles.unitText}> kWh</Text>
                  </View>
                  <Text style={styles.pillCaption}>Used</Text>
                </BlurWrapper>
              </View>
              <View style={styles.pillBox}>
                <BlurWrapper>
                  <View style={styles.pillHeaderRow}>
                    <Image source={require('../assets/HomeScreen/star.png')} style={styles.pillIcon} />
                  </View>
                  <View style={styles.valueRow}>
                    <Text style={styles.bigNumber}>{stats ? stats.earned : '--'}</Text>
                    <Text style={styles.unitText}> pts</Text>
                  </View>
                  <Text style={styles.pillCaption}>Earned</Text>
                </BlurWrapper>
              </View>
            </View>
          </ImageBackground>
        </BackCard>
      </View>

      {/* 挑战入口 */}
      <View style={styles.challengeWrapper}>
        <Image
          source={require('../assets/HomeScreen/Challenge.png')}
          style={styles.challengeImage}
        />
      </View>

      {/* 折线图区域 */}
      <View style={styles.chartArea}>
        <Text style={styles.chartTitle}>Energy Behavior Tracker</Text>
        <Image
          source={require('../assets/HomeScreen/graph.png')}
          style={styles.chartImage}
        />
      </View>

      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web' && { width: '100%', maxWidth: 480, alignSelf: 'center' }),
  },
  content: {
    padding: 16,
  },
  screenBg: { flex: 1 },
  screenBgWeb: { width: '100%', height: '100%' },
  screenBgImage: { resizeMode: 'cover' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  location: { fontSize: 14 },
  greeting: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  cardWrapper: {
    width: '100%',
    height: 300,
    marginVertical: 6,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardBg: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  cardBgImage: { resizeMode: 'cover' },
  innerCard: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 24,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  modeText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 6,
  },
  modeRow: {
    position: 'absolute',
    top: 18,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  statRow: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  pillBox: {
    width: '46%',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pillBlur: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  webBlur: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  pillHeaderRow: {
    height: 28,
    marginBottom: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  pillIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bigNumber: {
    fontSize: 20,
    fontWeight: '600',
  },
  unitText: {
    fontSize: 14,
    marginLeft: 4,
  },
  pillCaption: {
    marginTop: 8,
    fontSize: 13,
    color: '#666',
  },
  
  challengeWrapper: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    marginVertical: 8,
  },
  challengeImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
    borderRadius: 28,
  },
  chartArea: { flex: 1 },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  chartImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  // previously used custom tab bar styles removed
});
