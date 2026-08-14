// screens/abclog/AbcLogScreen.js
// SCR-003A: ABC Data Sheet View - matches Figma exactly: student
// selector, date/behavior/category filters, export, 4 stat cards, and a
// wide table (Date/Time/Location/Behavior/Frequency/Intensity/Category/
// Antecedent/Consequence/Teacher).

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import TopNav from '../../components/TopNav';
import { useAuth } from '../../context/AuthContext';
import { handleTeacherTabPress } from '../../navigation/teacherTabNavigation';
import { getAbcLog, exportAbcLog } from '../../api/teacherExtrasApi';

const STUDENT_OPTIONS = [
  { id: 'student-a', name: 'Student A', age: 7 },
  { id: 'student-b', name: 'Student B', age: 6 },
];
const COLUMNS = ['Date', 'Time', 'Location', 'Behavior', 'Frequency', 'Intensity', 'Category', 'Antecedent', 'Consequence', 'Teacher'];

export default function AbcLogScreen({ navigation }) {
  const { logout } = useAuth();
  const [studentId, setStudentId] = useState('student-a');
  const [from, setFrom] = useState('07/07/2026');
  const [to, setTo] = useState('08/06/2026');
  const [behaviorFilter, setBehaviorFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [data, setData] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data: res } = await getAbcLog({ studentId, from, to, behavior: behaviorFilter, category: categoryFilter });
      setData(res);
    } catch (err) {
      setData(DEMO_DATA);
    }
  }, [studentId, from, to, behaviorFilter, categoryFilter]);

  useEffect(() => { load(); }, [load]);

  const handleExport = async () => {
    try { await exportAbcLog({ studentId, from, to }); } catch (err) {}
  };

  const currentStudent = STUDENT_OPTIONS.find((s) => s.id === studentId);

  if (!data) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <TopNav activeTab="ABC Log" onTabPress={(tab) => handleTeacherTabPress(navigation, tab)} onLogout={logout} />

      <View style={styles.header}>
        <View style={styles.studentSelectorRow}>
          <View style={styles.studentAvatar}><Text style={styles.studentAvatarText}>{currentStudent?.name?.[0]}</Text></View>
          <TouchableOpacity
            style={styles.studentDropdown}
            onPress={() => setStudentId((prev) => (prev === 'student-a' ? 'student-b' : 'student-a'))}
          >
            <Text style={typography.h3}>{currentStudent?.name}</Text>
            <Feather name="chevron-down" size={16} color={colors.navyText} />
          </TouchableOpacity>
          <Text style={typography.caption}>Age {currentStudent?.age}</Text>
        </View>
        <Text style={typography.caption}>ABC Data Sheet</Text>
      </View>

      <View style={styles.filtersCard}>
        <View style={styles.filtersRow}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={typography.label}>From</Text>
            <TextInput style={styles.textInput} value={from} onChangeText={setFrom} />
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={typography.label}>To</Text>
            <TextInput style={styles.textInput} value={to} onChangeText={setTo} />
          </View>
        </View>
        <View style={styles.filtersRow}>
          <TouchableOpacity style={[styles.filterChip, styles.filterChipFlex]}>
            <Text style={typography.body}>Behavior: {behaviorFilter}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, styles.filterChipFlex]}>
            <Text style={typography.body}>Category: {categoryFilter}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportBtn} onPress={handleExport}>
            <Text style={styles.exportBtnText}>Export</Text>
            <Feather name="chevron-down" size={14} color={colors.navyText} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL INCIDENTS</Text>
            <Text style={styles.statValue}>{data.stats.totalIncidents}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>MOST COMMON BEHAVIOR</Text>
            <Text style={styles.statValueSmall}>{data.stats.mostCommonBehavior}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>MOST COMMON ANTECEDENT</Text>
            <Text style={styles.statValueSmall}>{data.stats.mostCommonAntecedent}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>THIS WEEK</Text>
            <Text style={styles.statValue}>{data.stats.thisWeek}</Text>
          </View>
        </View>

        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              {COLUMNS.map((c) => (
                <Text key={c} style={styles.tableHeaderCell}>{c}</Text>
              ))}
            </View>
            {data.incidents.length === 0 ? (
              <View style={styles.emptyRow}>
                <Text style={[typography.body, { color: colors.mutedText }]}>No incidents found for the selected filters.</Text>
              </View>
            ) : (
              data.incidents.map((inc, i) => (
                <View key={i} style={styles.tableRow}>
                  {COLUMNS.map((c) => (
                    <Text key={c} style={styles.tableCell}>{inc[c.toLowerCase()] || '—'}</Text>
                  ))}
                </View>
              ))
            )}
          </View>
        </ScrollView>
        <Text style={typography.caption}>Showing {data.incidents.length === 0 ? '0-0' : `1-${data.incidents.length}`} of {data.incidents.length} incidents</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const DEMO_DATA = {
  stats: { totalIncidents: 0, mostCommonBehavior: 'N/A', mostCommonAntecedent: 'N/A', thisWeek: 0 },
  incidents: [],
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  header: { padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.xs },
  studentSelectorRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  studentAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bgApp, alignItems: 'center', justifyContent: 'center' },
  studentAvatarText: { fontWeight: '700', color: colors.navyText },
  studentDropdown: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  filtersCard: { padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.md },
  filtersRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-end' },
  field: { gap: spacing.xs },
  textInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm },
  filterChip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  filterChipFlex: { flex: 1 },
  exportBtn: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center', backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  exportBtnText: { fontWeight: '700', color: colors.navyText, fontSize: 12 },
  content: { padding: spacing.lg, gap: spacing.lg },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: { flexGrow: 1, minWidth: '22%', backgroundColor: colors.bgCard, borderRadius: radius.md, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  statLabel: { fontSize: 10, fontWeight: '700', color: colors.mutedText, letterSpacing: 0.5 },
  statValue: { fontSize: 24, fontWeight: '700', color: colors.statusInProgressText },
  statValueSmall: { fontSize: 16, fontWeight: '700', color: colors.navyText },
  table: { minWidth: 900, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#0EA5E9' },
  tableHeaderCell: { width: 90, padding: spacing.sm, fontSize: 11, fontWeight: '700', color: colors.white },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.bgCard },
  tableCell: { width: 90, padding: spacing.sm, fontSize: 12, color: colors.navyText },
  emptyRow: { padding: spacing.xl, alignItems: 'center', backgroundColor: colors.bgCard, width: 900 },
});
