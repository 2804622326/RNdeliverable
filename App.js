/**
 * 新特性 (New Features):
 * 1. 使用 React Native 的 Alert API 实现删除确认对话框（本地原生弹窗）
 *    New Feature 1: Using React Native's Alert API to implement a delete confirmation dialog (native popup)
 * 2. 使用 Permissions API 请求设备权限（此处在应用启动时请求存储权限）
 *    New Feature 2: Using Permissions API to request device permissions (here we request storage permission on startup)
 *
 * 注: react-navigation 导航功能也在此项目中使用（课堂未涉及），源代码参考官方文档。
 * Note: The react-navigation library is also used for navigation (not covered in class). Source: React Navigation docs.
 */
import 'react-native-gesture-handler'; // Source: Required by react-navigation for gesture support
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import WordListScreen from './WordListScreen';
import WordFormScreen from './WordFormScreen';

const Stack = createStackNavigator(); // 创建一个堆栈导航器 (Create a Stack Navigator)

export default function App() {
  return (
    <NavigationContainer>
      {/* 栈导航容器，定义应用的导航结构 (Stack navigator container defining app navigation) */}
      <Stack.Navigator initialRouteName="Welcome">
        {/* 欢迎页 (Welcome Screen) 无导航栏标题 (header hidden) */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        {/* 单词列表页 (Word List Screen) */}
        <Stack.Screen name="WordList" component={WordListScreen} options={{ title: 'My Vocabulary' }} />
        {/* 添加/编辑单词页 (Add/Edit Word Screen) */}
        <Stack.Screen name="WordForm" component={WordFormScreen} options={{ title: 'Add/Edit Word' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
