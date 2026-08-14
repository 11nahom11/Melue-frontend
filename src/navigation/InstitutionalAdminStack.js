// navigation/InstitutionalAdminStack.js
// Institutional Administrator role stack - SCR-ADMIN-001 through SCR-ADMIN-006.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormBuilderScreen from '../screens/institutionaladmin/FormBuilderScreen';
import TrialLoggingFormatScreen from '../screens/institutionaladmin/TrialLoggingFormatScreen';
import AbcDropdownListsScreen from '../screens/institutionaladmin/AbcDropdownListsScreen';
import ScheduleCapacityConfigScreen from '../screens/institutionaladmin/ScheduleCapacityConfigScreen';
import GoalDomainDefinitionsScreen from '../screens/institutionaladmin/GoalDomainDefinitionsScreen';
import TaskAnalysisTemplatesScreen from '../screens/institutionaladmin/TaskAnalysisTemplatesScreen';

const Stack = createNativeStackNavigator();

export default function InstitutionalAdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FormBuilder" component={FormBuilderScreen} />
      <Stack.Screen name="TrialLoggingFormat" component={TrialLoggingFormatScreen} />
      <Stack.Screen name="AbcDropdownLists" component={AbcDropdownListsScreen} />
      <Stack.Screen name="ScheduleCapacityConfig" component={ScheduleCapacityConfigScreen} />
      <Stack.Screen name="GoalDomainDefinitions" component={GoalDomainDefinitionsScreen} />
      <Stack.Screen name="TaskAnalysisTemplates" component={TaskAnalysisTemplatesScreen} />
    </Stack.Navigator>
  );
}
