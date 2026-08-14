// navigation/teacherTabNavigation.js
//
// Shared handler for TopNav's onTabPress within the Teacher role
// (SessionStack). Every tab now has a real screen except Parents, which
// is genuinely a different module (Fyori's Parent Dashboard / the Parent
// Portal role) - not duplicated here since a real Parent role already
// exists with its own login (see ParentStack.js).

import { Alert } from 'react-native';

const ROUTE_BY_TAB = {
  Dashboard: 'TeacherDashboard',
  Session: 'SessionDataCollection',
  Assessments: 'AssessmentDashboard',
  'Daily Notes': 'DailyNotes',
  'ABC Log': 'AbcLog',
  Scheduling: 'SchedulingCalendar',
  Attendance: 'Attendance',
};

const NOT_BUILT_TABS = new Set(['Parents']);

export function handleTeacherTabPress(navigation, tab) {
  const route = ROUTE_BY_TAB[tab];
  if (route) {
    navigation?.navigate?.(route);
    return;
  }
  if (NOT_BUILT_TABS.has(tab)) {
    Alert.alert(
      `${tab} not built here`,
      'This is the Teacher-side messaging screen (SCR-TEA-005). A separate Parent role with its own login already exists in this app (see the Parent demo account) - that side is built, this Teacher-facing counterpart is not.'
    );
  }
}
