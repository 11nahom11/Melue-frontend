// screens/coordinator/CoordinatorDashboardScreen.js
// SCR-TC-001: Therapy Coordinator Dashboard

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import CoordinatorNav from './components/CoordinatorNav';
import { getCoordinatorDashboard } from '../../api/coordinatorApi';

const STATUS_DOT_COLOR = { green: '#22C55E', yellow: '#EAB308', red: '#EF4444' };

function StatCard({ label, value, onPress }) {
  return (
    <TouchableOpacity style={styles.statCard} onPress={onPress}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={typography.caption}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function CoordinatorDashboardScreen({ navigation }) {
  const [data, setData] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data: res } = await getCoordinatorDashboard();
      setData(res);
    } catch (err) {
      setData(DEMO_DATA);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleTabPress = (tab) => {
    const routeByTab = {
      Dashboard: 'CoordinatorDashboard',
      'Live Sessions': 'LiveSessionMonitoring',
      Review: 'SessionSummaryReview',
      Progress: 'CoordinatorStudentProgress',
      Schedule: 'CoordinatorSchedule',
      Parents: 'CoordinatorParentCommunication',
    };
    navigation?.navigate?.(routeByTab[tab]);
  };

  if (!data) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <CoordinatorNav activeTab="Dashboard" onTabPress={handleTabPress} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={typography.h1}>Therapy Coordinator Dashboard</Text>
          <View style={styles.notifBell}>
            <Feather name="bell" size={18} color={colors.navyText} />
            {data.unreadCount > 0 && (
              <View style={styles.notifBadge}><Text style={styles.notifBadgeText}>{data.unreadCount}</Text></View>
            )}
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Active Sessions Now" value={data.activeSessionsCount} onPress={() => handleTabPress('Live Sessions')} />
          <StatCard label="Sessions Pending Review" value={data.pendingReviewCount} onPress={() => handleTabPress('Review')} />
          <StatCard label="Students in Therapy" value={data.studentsInTherapyCount} onPress={() => handleTabPress('Progress')} />
          <StatCard label="Teachers On Duty" value={data.teachersOnDutyCount} onPress={() => handleTabPress('Schedule')} />
        </View>

        <View style={styles.card}>
          <Text style={typography.h3}>Live Session Status</Text>
          {data.liveSessions.map((s) => (
            <View key={s.id} style={styles.liveSessionRow}>
              <View style={[styles.statusDot, { backgroundColor: STATUS_DOT_COLOR[s.status] }]} />
              <Text style={[typography.body, { flex: 1 }]}>{s.teacherName} · {s.stationName}</Text>
              <Text style={typography.caption}>{s.studentCount} students</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={typography.h3}>Pending Review Alerts</Text>
          {data.pendingReviews.map((r) => (
            <View key={r.id} style={styles.reviewRow}>
              <Text style={typography.body}>{r.teacherName} — {r.studentNames.join(', ')}</Text>
              <TouchableOpacity onPress={() => handleTabPress('Review')}>
                <Text style={styles.linkText}>Review →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={typography.h3}>Daily Operational Summary</Text>
          <View style={styles.summaryGrid}>
            <Text style={typography.body}>Sessions Completed: {data.summary.sessionsCompleted}</Text>
            <Text style={typography.body}>Trials Logged: {data.summary.trialsLogged}</Text>
            <Text style={typography.body}>Incidents: {data.summary.incidents}</Text>
            <Text style={typography.body}>Goals Mastered: {data.summary.goalsMastered}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DEMO_DATA = {
  unreadCount: 3,
  activeSessionsCount: 4,
  pendingReviewCount: 2,
  studentsInTherapyCount: 12,
  teachersOnDutyCount: 5,
  liveSessions: [
    { id: '1', teacherName: 'Teacher A', stationName: 'Station 1', status: 'green', studentCount: 2 },
    { id: '2', teacherName: 'Teacher B', stationName: 'Station 2', status: 'yellow', studentCount: 1 },
  ],
  pendingReviews: [
    { id: '1', teacherName: 'Teacher A', studentNames: ['Student A', 'Student B'] },
  ],
  summary: { sessionsCompleted: 6, trialsLogged: 124, incidents: 1, goalsMastered: 2 },
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  content: { padding: spacing.lg, gap: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notifBell: { position: 'relative' },
  notifBadge: { position: 'absolute', top: -4, right: -6, backgroundColor: '#EF4444', borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { color: colors.white, fontSize: 9, fontWeight: '700' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: { flexGrow: 1, minWidth: '45%', backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: 24, fontWeight: '700', color: colors.navyText },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  liveSessionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xs },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.xs },
  linkText: { color: colors.statusInProgressText, fontWeight: '600', fontSize: 12 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
});
