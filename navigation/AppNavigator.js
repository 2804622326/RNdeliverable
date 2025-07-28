
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import TasksScreen from '../screens/TasksScreen';
import RewardsScreen from '../screens/RewardsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 嵌套 Stack，用于排行榜内部导航
const LeaderboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Leaderboard"
      component={LeaderboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Tasks"
      component={TasksScreen}
      options={{ title: 'Tasks' }}
    />
    <Stack.Screen
      name="Rewards"
      component={RewardsScreen}
      options={{ title: 'Rewards' }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Me') iconName = 'person-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Me" component={LeaderboardStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;