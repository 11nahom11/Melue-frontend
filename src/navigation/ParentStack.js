// navigation/ParentStack.js
// Parent/Guardian role stack - SCR-PAR-001 through SCR-PAR-004.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParentDashboardScreen from '../screens/parent/ParentDashboardScreen';
import ChildProgressScreen from '../screens/parent/ChildProgressScreen';
import HomeObservationLogScreen from '../screens/parent/HomeObservationLogScreen';
import ParentCommunicationScreen from '../screens/parent/ParentCommunicationScreen';

const Stack = createNativeStackNavigator();

export default function ParentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
      <Stack.Screen name="ChildProgress" component={ChildProgressScreen} />
      <Stack.Screen name="HomeObservationLog" component={HomeObservationLogScreen} />
      <Stack.Screen name="ParentCommunication" component={ParentCommunicationScreen} />
    </Stack.Navigator>
  );
}
