// navigation/CoordinatorStack.js
// Therapy Coordinator role stack - SCR-TC-001 through SCR-TC-006.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoordinatorDashboardScreen from '../screens/coordinator/CoordinatorDashboardScreen';
import LiveSessionMonitoringScreen from '../screens/coordinator/LiveSessionMonitoringScreen';
import SessionSummaryReviewScreen from '../screens/coordinator/SessionSummaryReviewScreen';
import CoordinatorStudentProgressScreen from '../screens/coordinator/CoordinatorStudentProgressScreen';
import CoordinatorScheduleScreen from '../screens/coordinator/CoordinatorScheduleScreen';
import CoordinatorParentCommunicationScreen from '../screens/coordinator/CoordinatorParentCommunicationScreen';

const Stack = createNativeStackNavigator();

export default function CoordinatorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CoordinatorDashboard" component={CoordinatorDashboardScreen} />
      <Stack.Screen name="LiveSessionMonitoring" component={LiveSessionMonitoringScreen} />
      <Stack.Screen name="SessionSummaryReview" component={SessionSummaryReviewScreen} />
      <Stack.Screen name="CoordinatorStudentProgress" component={CoordinatorStudentProgressScreen} />
      <Stack.Screen name="CoordinatorSchedule" component={CoordinatorScheduleScreen} />
      <Stack.Screen name="CoordinatorParentCommunication" component={CoordinatorParentCommunicationScreen} />
    </Stack.Navigator>
  );
}
