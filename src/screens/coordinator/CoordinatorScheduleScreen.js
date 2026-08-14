// screens/coordinator/CoordinatorScheduleScreen.js
// SCR-TC-005: Operational Management
//
// This is the real spec home for MR-38 (Staff Scheduling Calendar) - see
// the role-mismatch note in PROJECT_NOTES.md. Reuses AppointmentFormModal
// from the scheduling module (MR-39) rather than duplicating it.

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import CoordinatorNav from './components/CoordinatorNav';
import AppointmentFormModal from '../scheduling/components/AppointmentFormModal';
import {
  getOperationalSchedule,
  getTeacherPerformanceMetrics,
  reassignStudents,
} from '../../api/coordinatorApi';
import { createAppointment, updateAppointment, cancelAppointment, markAppointmentStatus, markTeacherUnavailable } from '../../api/sessionApi';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const THERAPIST_OPTIONS = [
  { id: 't-a', name: 'Teacher A' },
  { id: 't-b', name: 'Teacher B' },
  { id: 't-c', name: 'Teacher C' },
];
const STUDENT_OPTIONS = [
  { id: 'student-a', name: 'Student A' },
  { id: 'student-b', name: 'Student B' },
  { id: 'student-c', name: 'Student C' },
];
const ROOM_OPTIONS = [
  { id: 'room-1', name: 'Room 1' },
  { id: 'room-2', name: 'Room 2' },
  { id: 'room-3', name: 'Room 3' },
];

export default function CoordinatorScheduleScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [weekData, setWeekData] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [teacherFilter, setTeacherFilter] = useState('all');
  const [formVisible, setFormVisible] = useState(false);
  const [editingAppt, setEditingAppt] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data } = await getOperationalSchedule({});
      setWeekData(data);
    } catch (err) {
      setWeekData(DEMO_WEEK);
    }
    try {
      const { data } = await getTeacherPerformanceMetrics({});
      setMetrics(data);
    } catch (err) {
      setMetrics(DEMO_METRICS);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const dayAppointments = (weekData?.[selectedDay] || []).filter(
    (a) => teacherFilter === 'all' || a.therapistId === teacherFilter
  );
  const unassignedStudents = STUDENT_OPTIONS.filter(
    (s) => !dayAppointments.some((a) => a.studentIds?.includes(s.id))
  );

  const openCreate = () => { setEditingAppt(null); setFormVisible(true); };
  const openEdit = (appt) => { setEditingAppt(appt); setFormVisible(true); };

  const handleSave = async (payload) => {
    try {
      if (editingAppt) await updateAppointment(editingAppt.id, payload);
      else await createAppointment(payload);
      setFormVisible(false);
      load();
    } catch (err) {
      setWeekData((prev) => {
        const next = { ...prev };
        const list = [...(next[selectedDay] || [])];
        if (editingAppt) {
          const idx = list.findIndex((a) => a.id === editingAppt.id);
          if (idx >= 0) list[idx] = { ...list[idx], ...payload };
        } else {
          list.push({ id: `local-${Date.now()}`, status: 'scheduled', therapistName: 'New Therapist', roomName: 'TBD', studentNames: ['New Student'], ...payload });
        }
        next[selectedDay] = list;
        return next;
      });
      setFormVisible(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    try { await cancelAppointment(id, {}); } catch (err) {}
    setWeekData((prev) => ({ ...prev, [selectedDay]: (prev[selectedDay] || []).map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)) }));
    setFormVisible(false);
  };

  const handleMarkStatus = async (id, status) => {
    try { await markAppointmentStatus(id, status); } catch (err) {}
    setWeekData((prev) => ({ ...prev, [selectedDay]: (prev[selectedDay] || []).map((a) => (a.id === id ? { ...a, status } : a)) }));
    setFormVisible(false);
  };

  const handleReassign = () => {
    Alert.alert('Reassign Students', 'Capacity-validated reassignment form not built out yet (stub).');
  };

  const handleMarkUnavailable = () => {
    Alert.alert('Mark Teacher Unavailable', 'Reason + date form not built out yet (stub).');
  };

  const handleExport = () => {
    Alert.alert('Export Schedule', 'PDF/CSV export not wired up yet (stub).');
  };

  if (!weekData) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <CoordinatorNav activeTab="Schedule" onTabPress={(t) => t !== 'Schedule' && navigation?.navigate?.(navRouteForTab(t))} />

      <View style={styles.header}>
        <Text style={typography.h1}>Operational Management</Text>
        <TouchableOpacity style={styles.newApptBtn} onPress={openCreate}>
          <Feather name="plus" size={16} color={colors.navyText} />
          <Text style={styles.newApptBtnText}>New Appointment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dayTabs}>
        {DAYS.map((d, i) => (
          <TouchableOpacity key={d} style={[styles.dayTab, i === selectedDay && styles.dayTabActive]} onPress={() => setSelectedDay(i)}>
            <Text style={[typography.bodyBold, i === selectedDay && { color: colors.navyText }]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.filterChip, teacherFilter === 'all' && styles.filterChipActive]} onPress={() => setTeacherFilter('all')}>
            <Text style={typography.body}>All Teachers</Text>
          </TouchableOpacity>
          {THERAPIST_OPTIONS.map((t) => (
            <TouchableOpacity key={t.id} style={[styles.filterChip, teacherFilter === t.id && styles.filterChipActive]} onPress={() => setTeacherFilter(t.id)}>
              <Text style={typography.body}>{t.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {unassignedStudents.length > 0 && (
        <View style={styles.unassignedBanner}>
          <Feather name="alert-triangle" size={14} color="#B45309" />
          <Text style={styles.unassignedText}>{unassignedStudents.length} student(s) unassigned today: {unassignedStudents.map((s) => s.name).join(', ')}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={typography.h3}>Teacher Schedule</Text>
          {dayAppointments.map((appt) => (
            <TouchableOpacity key={appt.id} style={styles.apptRow} onPress={() => openEdit(appt)}>
              <Text style={typography.bodyBold}>{appt.startTime} – {appt.endTime}</Text>
              <Text style={typography.caption}>{appt.therapistName} · {appt.roomName} · {appt.studentNames.join(', ')}</Text>
            </TouchableOpacity>
          ))}
          {dayAppointments.length === 0 && (
            <Text style={[typography.body, { color: colors.mutedText }]}>No appointments this day.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={typography.h3}>Performance Metrics</Text>
          {metrics.map((m) => (
            <View key={m.teacherId} style={styles.metricsRow}>
              <Text style={typography.bodyBold}>{m.teacherName}</Text>
              <Text style={typography.caption}>{m.sessions} sessions · {m.trials} trials · {m.independencePercent}% independence · {m.incidents} incidents</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleMarkUnavailable}>
            <Text style={styles.secondaryBtnText}>Mark Unavailable</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleReassign}>
            <Text style={styles.secondaryBtnText}>Reassign Students</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleExport}>
            <Text style={styles.secondaryBtnText}>Export Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppointmentFormModal
        visible={formVisible}
        appointment={editingAppt}
        defaultDate={`2026-08-${11 + selectedDay}`}
        therapistOptions={THERAPIST_OPTIONS}
        studentOptions={STUDENT_OPTIONS}
        roomOptions={ROOM_OPTIONS}
        onClose={() => setFormVisible(false)}
        onSave={handleSave}
        onCancelAppointment={handleCancelAppointment}
        onMarkStatus={handleMarkStatus}
      />
    </SafeAreaView>
  );
}

function navRouteForTab(tab) {
  return {
    Dashboard: 'CoordinatorDashboard',
    'Live Sessions': 'LiveSessionMonitoring',
    Review: 'SessionSummaryReview',
    Progress: 'CoordinatorStudentProgress',
    Parents: 'CoordinatorParentCommunication',
  }[tab];
}

const DEMO_WEEK = {
  0: [
    { id: '1', status: 'confirmed', therapistId: 't-a', therapistName: 'Teacher A', roomId: 'room-2', roomName: 'Room 2', studentIds: ['student-a', 'student-b'], studentNames: ['Student A', 'Student B'], startTime: '9:00 AM', endTime: '10:30 AM' },
  ],
  1: [], 2: [], 3: [], 4: [],
};
const DEMO_METRICS = [
  { teacherId: 't-a', teacherName: 'Teacher A', sessions: 6, trials: 124, independencePercent: 68, incidents: 1 },
  { teacherId: 't-b', teacherName: 'Teacher B', sessions: 4, trials: 80, independencePercent: 55, incidents: 0 },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  newApptBtn: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center', backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  newApptBtnText: { fontWeight: '700', color: colors.navyText, fontSize: 12 },
  dayTabs: { flexDirection: 'row', padding: spacing.md, gap: spacing.sm, backgroundColor: colors.bgCard },
  dayTab: { flex: 1, paddingVertical: spacing.sm, borderRadius: radius.md, alignItems: 'center', backgroundColor: colors.bgApp },
  dayTabActive: { backgroundColor: colors.primaryYellow },
  filterRow: { padding: spacing.md, backgroundColor: colors.bgCard },
  filterChip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.bgApp, borderColor: colors.navyText },
  unassignedBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.statusPendingBg, marginHorizontal: spacing.lg, marginTop: spacing.sm, padding: spacing.sm, borderRadius: radius.md },
  unassignedText: { fontSize: 12, fontWeight: '600', color: '#B45309', flex: 1 },
  content: { padding: spacing.lg, gap: spacing.lg },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  apptRow: { paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  metricsRow: { paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  actionsRow: { flexDirection: 'row', gap: spacing.sm },
  secondaryBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  secondaryBtnText: { fontWeight: '600', fontSize: 11, color: colors.navyText, textAlign: 'center' },
});
