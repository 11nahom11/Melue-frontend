// navigation/SystemAdminStack.js
// System Administrator role stack - SCR-SYS-001 through SCR-SYS-003.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffAccountManagementScreen from '../screens/systemadmin/StaffAccountManagementScreen';
import RoleManagementScreen from '../screens/systemadmin/RoleManagementScreen';
import PermissionConfigurationScreen from '../screens/systemadmin/PermissionConfigurationScreen';

const Stack = createNativeStackNavigator();

export default function SystemAdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffAccountManagement" component={StaffAccountManagementScreen} />
      <Stack.Screen name="RoleManagement" component={RoleManagementScreen} />
      <Stack.Screen name="PermissionConfiguration" component={PermissionConfigurationScreen} />
    </Stack.Navigator>
  );
}
