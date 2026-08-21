import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SystemAdminStackParamList } from '../types';
import StaffAccountManagementScreen from '../screens/systemadmin/StaffAccountManagementScreen';
import RoleManagementScreen from '../screens/systemadmin/RoleManagementScreen';
import PermissionConfigurationScreen from '../screens/systemadmin/PermissionConfigurationScreen';
import FormBuilderScreen from '../screens/institutionaladmin/FormBuilderScreen';
import TrialLoggingFormatScreen from '../screens/institutionaladmin/TrialLoggingFormatScreen';
import AbcDropdownListsScreen from '../screens/institutionaladmin/AbcDropdownListsScreen';
import ScheduleCapacityConfigScreen from '../screens/institutionaladmin/ScheduleCapacityConfigScreen';
import GoalDomainDefinitionsScreen from '../screens/institutionaladmin/GoalDomainDefinitionsScreen';
import TaskAnalysisTemplatesScreen from '../screens/institutionaladmin/TaskAnalysisTemplatesScreen';

const Stack = createNativeStackNavigator<SystemAdminStackParamList>();

export default function SystemAdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StaffAccountManagement" component={StaffAccountManagementScreen} />
      <Stack.Screen name="RoleManagement" component={RoleManagementScreen} />
      <Stack.Screen name="PermissionConfiguration" component={PermissionConfigurationScreen} />
      <Stack.Screen name="FormBuilder" component={FormBuilderScreen} />
      <Stack.Screen name="TrialLoggingFormat" component={TrialLoggingFormatScreen} />
      <Stack.Screen name="AbcDropdownLists" component={AbcDropdownListsScreen} />
      <Stack.Screen name="ScheduleCapacityConfig" component={ScheduleCapacityConfigScreen} />
      <Stack.Screen name="GoalDomainDefinitions" component={GoalDomainDefinitionsScreen} />
      <Stack.Screen name="TaskAnalysisTemplates" component={TaskAnalysisTemplatesScreen} />
    </Stack.Navigator>
  );
}
