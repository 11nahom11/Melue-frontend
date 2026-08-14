// navigation/SessionStack.js
//
// Stack containing the Daily Operations module screens (MR-33, 35, 36, 38,
// 39, 40).
// TODO: merge these routes into the app's real root navigator once
// it exists (whoever owns MR-6 Admin Panel Shell / overall app shell).
// Requires @react-navigation/native-stack.
//
// NOTE: This does NOT wrap itself in a NavigationContainer. If you're using
// Expo Router, the router already provides one at the app root - render
// this component directly from app/index.js (see that file). If you're
// using plain React Navigation (no Expo Router), wrap THIS component in a
// <NavigationContainer> yourself, one level up, e.g. in your own App.js.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeacherDashboardScreen from '../screens/teacherdashboard/TeacherDashboardScreen';
import AssessmentDashboardScreen from '../screens/assessments/AssessmentDashboardScreen';
import AbcLogScreen from '../screens/abclog/AbcLogScreen';
import SessionDataCollectionScreen from '../screens/session/SessionDataCollectionScreen';
import DailyNotesScreen from '../screens/dailynotes/DailyNotesScreen';
import SessionNoteEditorScreen from '../screens/dailynotes/SessionNoteEditorScreen';
import GoalProgressScreen from '../screens/goalprogress/GoalProgressScreen';
import SchedulingCalendarScreen from '../screens/scheduling/SchedulingCalendarScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import GoalMasteryCheckScreen from '../screens/goalmastery/GoalMasteryCheckScreen';
import SessionSummaryScreen from '../screens/sessionsummary/SessionSummaryScreen';
// MR-39 Appointment & Session Management is now built as
// AppointmentFormModal, reached from the Scheduling Calendar (MR-38) -
// it doesn't need its own stack route since it's a modal, not a screen.
// "Parents" tab still has no built screen - see teacherTabNavigation.js.

const Stack = createNativeStackNavigator();

export default function SessionStack() {
  return (
    <Stack.Navigator initialRouteName="TeacherDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
      <Stack.Screen name="AssessmentDashboard" component={AssessmentDashboardScreen} />
      <Stack.Screen name="AbcLog" component={AbcLogScreen} />
      <Stack.Screen name="SessionDataCollection" component={SessionDataCollectionScreen} />
      <Stack.Screen name="DailyNotes" component={DailyNotesScreen} />
      <Stack.Screen name="SessionNoteEditor" component={SessionNoteEditorScreen} />
      <Stack.Screen name="GoalProgress" component={GoalProgressScreen} />
      <Stack.Screen name="SchedulingCalendar" component={SchedulingCalendarScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="GoalMasteryCheck" component={GoalMasteryCheckScreen} />
      <Stack.Screen name="SessionSummary" component={SessionSummaryScreen} />
    </Stack.Navigator>
  );
}
