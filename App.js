// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from './Screen/DashboardScreen';
import LeaderboardScreen from './Screen/LeaderboardScreen';
import TasksScreen from './Screen/TasksScreen';
import RewardsScreen from './Screen/RewardsScreen';

// 想看哪个就把这个值改成 'Dashboard' | 'Leaderboard' | 'Tasks' | 'Rewards'
const WHICH = 'Rewards';

const SCREENS = {
  Dashboard: DashboardScreen,
  Leaderboard: LeaderboardScreen,
  Tasks: TasksScreen,
  Rewards: RewardsScreen,
};

export default function App() {
  const Current = SCREENS[WHICH] || DashboardScreen;
  // 不需要导航也能看页面；如果你页面里用到了 navigation，就包个容器：
  return (
    <NavigationContainer>
      <Current />
    </NavigationContainer>
  );
}