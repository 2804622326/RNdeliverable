// components/TaskCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

// 占位图（可换成你的）
// 放到 assets 下合适位置：../assets/task-default.png
const DEFAULT_ICON = require('../assets/Lead/card1.png');

export default function TaskCard({
  task = {},              // 防止 undefined
  onComplete,
  containerStyle,
  glass = true,           // 是否启用毛玻璃
}) {
  const isWeb = Platform.OS === 'web';
  // 字段
  const title = task.title ?? task.name ?? task.heading ?? 'Task';
  const description = task.description ?? task.desc ?? task.subtitle ?? '';
  const points = task.points ?? task.pts ?? task.score ?? 0;
  const completed = !!task.completed;

  // 图标：支持本地 require 或远程 url
  const iconSource =
    typeof task.icon === 'string'
      ? { uri: task.icon }
      : task.icon || DEFAULT_ICON;

  const CardShell = ({ children }) =>
    glass && !isWeb ? (
      <BlurView intensity={35} tint="light" style={styles.blur}>
        <View style={styles.glassOverlay}>{children}</View>
      </BlurView>
    ) : (
      <View style={[styles.plain, glass && styles.glassOverlay]}>{children}</View>
    );

  return (
    <View style={[styles.cardWrapper, containerStyle]}>
      <CardShell>
        <View style={styles.row}>
          {/* 左侧图标 */}
          <View style={styles.iconWrapper}>
            <Image source={iconSource} style={styles.iconImg} />
          </View>

          {/* 内容区域 */}
          <View style={styles.contentArea}>
            <Text style={styles.title} numberOfLines={2}>
              {title}{' '}
              {!!points && <Text style={styles.points}>+{points} pts</Text>}
            </Text>
            {!!description && (
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
            )}
          </View>

          {/* 按钮区域 */}
          <View style={styles.actionArea}>
            <TouchableOpacity
              style={[styles.button, completed && styles.buttonDone]}
              onPress={!completed ? onComplete : undefined}
              disabled={completed}
              activeOpacity={0.9}
            >
              <Text style={completed ? styles.buttonDoneText : styles.buttonText}>
                {completed ? 'Done' : 'Go'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardShell>
    </View>
  );
}

const RADIUS = 24;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  // —— 毛玻璃版本外壳 —— //
  blur: { width: '100%' },
  glassOverlay: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    borderRadius: RADIUS,
    padding: 12,
  },

  // —— 普通（非毛玻璃）外壳 —— //
  plain: {
    backgroundColor: '#fff',
    borderRadius: RADIUS,
    padding: 12,
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  /* 左侧图标样式 */
  iconWrapper: {
    width: 48,            // ← 需要更大就调这里
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(59,130,246,0.18)', // 透明底色，避免透明 PNG 难看
    marginRight: 12,
    marginTop: 10,
  },
  iconImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',  // 想完整展示改为 'contain'
  },

  contentArea: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111',
  },
  points: {
    fontSize: 15,
    fontWeight: '800',
    color: '#10b981',
  },
  description: {
    fontSize: 13,
    color: '#374151',
  },
  actionArea: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fde047',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
  },
  buttonDone: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderColor: 'rgba(255,255,255,0.55)',
  },
  buttonDoneText: {
    color: '#111',
    fontWeight: '700',
  },
});
