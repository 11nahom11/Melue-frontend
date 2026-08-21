import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';
import { getScheduleCapacityConfig, saveScheduleCapacityConfig } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

interface ScheduleBlock {
  id: string;
  name: string;
  start: string;
  end: string;
}

const DEMO_BLOCKS: ScheduleBlock[] = [
  { id: '1', name: 'Morning Block', start: '08:07', end: '10:30' },
  { id: '2', name: 'Afternoon Block', start: '13:10', end: '15:30' },
];

export default function ScheduleCapacityConfigScreen({ navigation }: NativeStackScreenProps<InstitutionalAdminStackParamList, 'ScheduleCapacityConfig'>) {
  const [scheduleOpen, setScheduleOpen] = useState(true);
  const [morningStart, setMorningStart] = useState('08:07');
  const [morningEnd, setMorningEnd] = useState('10:30');
  const [afternoonStart, setAfternoonStart] = useState('13:10');
  const [afternoonEnd, setAfternoonEnd] = useState('15:30');
  const [preTherapy, setPreTherapy] = useState('30');
  const [capacity, setCapacity] = useState('2');
  const [draftExpiry, setDraftExpiry] = useState('7');
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(DEMO_BLOCKS);

  const load = useCallback(async () => {
    try {
      const { data } = await getScheduleCapacityConfig();
      setMorningStart(data.morningStart); setMorningEnd(data.morningEnd);
      setAfternoonStart(data.afternoonStart); setAfternoonEnd(data.afternoonEnd);
      setPreTherapy(String(data.preTherapyDuration));
      setCapacity(String(data.capacity)); setDraftExpiry(String(data.draftExpiry));
      setBlocks(data.blocks);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateBlock = (id: string, field: 'start' | 'end', value: string) => {
    setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const handleSave = async () => {
    try {
      await saveScheduleCapacityConfig({ morningStart, morningEnd, afternoonStart, afternoonEnd, preTherapyDuration: Number(preTherapy), capacity: Number(capacity), draftExpiry: Number(draftExpiry), blocks });
    } catch {}
    Alert.alert('Configuration saved');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav sectionTitle="Session Schedule & Capacity" breadcrumb="Clinical Configuration / Session Schedule & Capacity" scrCode="SCR-ADMIN-004" />
      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="ScheduleCapacityConfig" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="CLINICAL CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Session Schedule & Capacity</Text>
              <Text style={typography.caption}>SCR-ADMIN-004 · Define therapy session rounds, capacity, and block definitions</Text>
            </View>

            {/* Session Schedule Collapsible */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.collapsibleHeader} onPress={() => setScheduleOpen((v) => !v)}>
                <Text style={typography.h3}>Session Schedule</Text>
                <Feather name={scheduleOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.bodyText} />
              </TouchableOpacity>
              {scheduleOpen && (
                <View style={styles.grid2}>
                  <View style={styles.field}>
                    <Text style={typography.label}>Morning Round Start</Text>
                    <TextInput style={styles.timeInput} value={morningStart} onChangeText={setMorningStart} placeholder="HH:MM" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={styles.field}>
                    <Text style={typography.label}>Morning Round End</Text>
                    <TextInput style={styles.timeInput} value={morningEnd} onChangeText={setMorningEnd} placeholder="HH:MM" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={styles.field}>
                    <Text style={typography.label}>Afternoon Round Start</Text>
                    <TextInput style={styles.timeInput} value={afternoonStart} onChangeText={setAfternoonStart} placeholder="HH:MM" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={styles.field}>
                    <Text style={typography.label}>Afternoon Round End</Text>
                    <TextInput style={styles.timeInput} value={afternoonEnd} onChangeText={setAfternoonEnd} placeholder="HH:MM" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={styles.field}>
                    <Text style={typography.label}>Pre-Therapy Duration (minutes)</Text>
                    <TextInput style={[styles.timeInput, { width: 80 }]} keyboardType="number-pad" value={preTherapy} onChangeText={setPreTherapy} />
                  </View>
                </View>
              )}
            </View>

            {/* Capacity & Expiry */}
            <View style={styles.twoCol}>
              <View style={styles.card}>
                <Text style={typography.h3}>Staff-to-Student Capacity</Text>
                <View style={styles.field}>
                  <Text style={typography.label}>Students per Staff Member</Text>
                  <TextInput style={[styles.timeInput, { width: 80 }]} keyboardType="number-pad" value={capacity} onChangeText={setCapacity} />
                </View>
              </View>
              <View style={styles.card}>
                <Text style={typography.h3}>Draft Expiry Period</Text>
                <View style={styles.field}>
                  <Text style={typography.label}>Days until draft expires (1–30)</Text>
                  <TextInput style={[styles.timeInput, { width: 80 }]} keyboardType="number-pad" value={draftExpiry} onChangeText={setDraftExpiry} />
                </View>
              </View>
            </View>

            {/* Session Block Definitions */}
            <View style={styles.card}>
              <View style={styles.tableHeaderBg}>
                <Text style={typography.h3}>Session Block Definitions</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text style={[styles.thCell, { flex: 2 }]}>Block Name</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Start Time</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>End Time</Text>
              </View>
              {blocks.map((block) => (
                <View key={block.id} style={styles.tableRow}>
                  <Text style={[styles.tdCellText, { flex: 2, fontWeight: '600' }]}>{block.name}</Text>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <TextInput style={styles.timeInput} value={block.start} onChangeText={(v: string) => updateBlock(block.id, 'start', v)} placeholder="HH:MM" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <TextInput style={styles.timeInput} value={block.end} onChangeText={(v: string) => updateBlock(block.id, 'end', v)} placeholder="HH:MM" placeholderTextColor={colors.mutedText} />
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Feather name="save" size={14} color={colors.navyText} />
              <Text style={styles.saveBtnText}>Save Configuration</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  body: { flex: 1, flexDirection: 'row' },
  contentArea: { flex: 1 },
  scrollContent: { padding: spacing.xl, gap: spacing.lg, maxWidth: 900, alignSelf: 'center', width: '100%' },
  headerLeft: { gap: 2 },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  collapsibleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.xs },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.sm },
  twoCol: { flexDirection: 'row', gap: spacing.lg },
  field: { gap: spacing.xs, marginTop: spacing.sm },
  timeInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, fontSize: 13, color: colors.navyText, backgroundColor: colors.bgCard },
  tableHeaderBg: { paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm, marginTop: spacing.sm },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, alignSelf: 'flex-start' },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
});
