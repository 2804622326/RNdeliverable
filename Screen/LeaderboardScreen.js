// LeaderboardScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { currentUser, leaderboardUsers } from '../constants/mockUsers';

// 阶段 0、1 用同一张图片；阶段 2 用满分图片
const CARD_IMAGES = [
  require('../assets/Lead/card1.png'),
  require('../assets/Lead/card1.png'),
  require('../assets/Lead/card2.png'),
];

// 头像占位图
const DEFAULT_AVATAR = require('../assets/Lead/Head.png');

// ✅ 社区图标：把路径换成你的图片即可
const COMMUNITY_ICON = require('../assets/Lead/map-pin.png');

export default function LeaderboardScreen() {
  // 任务进度 0 -> 1 -> 2（满）
  const [taskProgress, setTaskProgress] = useState(0);
  const [points, setPoints] = useState(currentUser.dailyPoints);
  const [cardH, setCardH] = useState(0); // 记录卡片实际高度以定位按钮

  // 排行榜顶部选项卡
  const [selectedTab, setSelectedTab] = useState('Day'); // 'Day' | 'Week' | 'All'

  const isFull = taskProgress >= 2;

  const onPressComplete = () => {
    if (isFull) return; // 已满，不再加分
    setTaskProgress((p) => {
      const next = Math.min(p + 1, 2);
      setPoints((v) => v + 50);
      return next;
    });
  };

  // 这里暂时不根据 tab 过滤数据，只做点击高亮。
  const listData = [currentUser, ...leaderboardUsers];

  return (
    <ImageBackground
      source={require('../assets/Lead/bg.png')}
      style={styles.screenBg}
      imageStyle={styles.screenBgImage}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* 顶部统计 */}
        <View style={styles.header}>
          {/* 图片 + 文本：社区行 */}
          <View style={styles.communityRow}>
            <Image source={COMMUNITY_ICON} style={styles.communityIcon} />
            <Text style={styles.communityText}>{currentUser.community}</Text>
          </View>

          <View style={styles.pointRow}>
            {/* ✅ 左侧：先显示 My point 小字，再显示大号分值 */}
            <View style={styles.pointLeft}>
              <Text style={styles.pointsLabel}>My point</Text>
              <Text style={styles.myPoints}>{points}</Text>
            </View>

            <View style={styles.badgeRow}>
              {/* 已移除左侧 Day 徽章，仅保留 Exchange */}
              <View style={[styles.badge, styles.exchangeBadge]}>
                <Text style={[styles.badgeText, styles.exchangeBadgeText]}>
                  Exchange &gt;
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ===== 唯一的任务卡片：图片 + 绝对定位按钮 ===== */}
        <ImageBackground
          source={CARD_IMAGES[taskProgress]}
          style={styles.taskCardBg}
          imageStyle={styles.taskCardBgImage}
          onLayout={(e) => setCardH(e.nativeEvent.layout.height)}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPressComplete}
            style={[
              styles.cardButton,
              { top: cardH * 0.42 }, // 垂直位置按比例微调
              isFull && styles.cardButtonFull,
            ]}
          >
            <Text style={styles.cardButtonText}>
              {isFull ? 'More Points' : 'Complete Task'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        {/* ===== 任务卡片结束 ===== */}

        {/* Leaderboard Tabs（保留 Day / Week / All） */}
        <View style={styles.tabRow}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          <View style={styles.tabButtons}>
            {['Day', 'Week', 'All'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
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

        {/* 排行列表（左侧头像 + 名字 + 分数） */}
        <View style={styles.listContainer}>
          {listData.map((user, index) => {
            const avatarSource = user.avatarUrl
              ? { uri: user.avatarUrl }
              : DEFAULT_AVATAR; // 没有 url 就用占位图

            return (
              <View
                key={index}
                style={[
                  styles.userCard,
                  user.username?.includes?.('(Myself)') && styles.highlightCard,
                ]}
              >
                <Image source={avatarSource} style={styles.avatar} />

                <Text style={styles.username} numberOfLines={1}>
                  {user.username || 'User'}
                </Text>

                <Text style={styles.points}>{user.points}</Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.moreBtn}>
          <Text style={styles.moreText}>More Residents &gt;</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

/* ---------------- styles ---------------- */

const CARD_HEIGHT = 100; // 你的设计卡片高度；需要更高就调这里

const styles = StyleSheet.create({
  screenBg: { flex: 1 },
  screenBgImage: { resizeMode: 'cover' },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: { marginBottom: 20 },

  /* 社区行样式 */
  communityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  communityIcon: {
    width: 40,     // 你提供的放大尺寸
    height: 40,
    resizeMode: 'contain',
  },
  communityText: { fontSize: 16, color: '#666' },

  pointRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* ✅ 新增：左侧“我的积分”容器与小标题样式 */
  pointLeft: {
    flexDirection: 'column',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#6b7280', // 灰度（近似 Tailwind gray-500）
    fontWeight: '600',
    marginBottom: 2,
  },
  myPoints: { fontSize: 36, fontWeight: 'bold', color: '#222' },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  badgeText: { color: '#111', fontWeight: '600', fontSize: 12 },
  exchangeBadge: {
    backgroundColor: '#fde047',
  },
  exchangeBadgeText: {
    color: '#000',
  },

  /* 任务卡片 */
  taskCardBg: {
    width: '100%',
    height: CARD_HEIGHT,
    overflow: 'hidden',
    marginBottom: 20,
    borderRadius: 24, // 如果你的图片已经带圆角，也可以去掉
  },
  taskCardBgImage: {
    resizeMode: 'cover',
  },

  cardButton: {
    position: 'absolute',
    right: 2,               // 更靠右
    paddingHorizontal: 10,  // 缩小
    paddingVertical: 8,     // 缩小
    borderRadius: 24,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardButtonFull: {
    backgroundColor: '#22c55e',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 11,
  },

  /* Tabs & list */
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 10,
  },
  leaderboardTitle: { fontSize: 22, fontWeight: '800', color: '#111' },
  tabButtons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  tabText: { fontSize: 16, color: '#9ca3af' },
  tabTextSelected: {
    color: '#111',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  listContainer: { marginTop: 10 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
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
    backgroundColor: '#e5e7eb', // 占位底色
  },
  username: { flex: 1, fontSize: 16, color: '#111' },
  points: { fontSize: 16, fontWeight: '600', color: 'green' },

  moreBtn: { marginTop: 16, alignItems: 'center' },
  moreText: { color: '#888', fontSize: 14 },
});