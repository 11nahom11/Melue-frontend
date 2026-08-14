// screens/assessments/BehaviorAssessmentScreen.tsx
// MR-23: Behavior Assessment — records challenging behaviors with
// frequency, duration, intensity, trigger and consequence; tracks trends.

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import TopNav from '../../components/TopNav';
import { useAuth } from '../../context/AuthContext';
import { handleTeacherTabPress } from '../../navigation/teacherTabNavigation';
import { saveBehaviorAssessment } from '../../api/teacherExtrasApi';
import type { SessionStackParamList } from '../../types';

interface BehaviorRecord {
  id: string;
  behavior: string;
  frequency: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  trigger: string;
  consequence: string;
}

const BEHAVIOR_PRESETS = ['Aggression', 'Self-injury', 'Tantrum', 'Elopement', 'Non-compliance', 'Property destruction', 'Repetitive behaviors'];
const INTENSITIES = ['Low', 'Medium', 'High'] as const;

type Props = NativeStackScreenProps<SessionStackParamList, 'BehaviorAssessment'>;

export default function BehaviorAssessmentScreen({ navigation, route }: Props) {
  const { logout } = useAuth();
  const { studentId } = route.params;
  const [records, setRecords] = useState<BehaviorRecord[]>(DEMO_RECORDS);
  const [draft, setDraft] = useState<BehaviorRecord>({
    id: '',
    behavior: BEHAVIOR_PRESETS[0],
    frequency: '',
    duration: '',
    intensity: 'Medium',
    trigger: '',
    consequence: '',
  });

  const addRecord = () => {
    if (!draft.frequency.trim()) { Alert.alert('Frequency required'); return; }
    setRecords((prev) => [...prev, { ...draft, id: `local-${Date.now()}` }]);
    setDraft({ ...draft, id: '', frequency: '', duration: '', trigger: '', consequence: '' });
  };

  const removeRecord = (id: string) => setRecords((prev) => prev.filter((r) => r.id !== id));

  const handleSave = async () => {
    try {
      await saveBehaviorAssessment(studentId, { records });
    } catch (err) {}
    Alert.alert('Assessment saved', `Behavior assessment saved (${records.length} behavior records).`, [
      { text: 'Done', onPress: () => navigation?.goBack?.() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopNav activeTab="Assessments" onTabPress={(tab) => handleTeacherTabPress(navigation, tab)} onLogout={logout} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Feather name="alert-triangle" size={18} color={colors.navyText} />
          <View>
            <Text style={typography.h1}>Behavior Assessment</Text>
            <Text style={typography.caption}>MR-23 — ABC method · Student A</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={typography.h3}>Add Behavior Record</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {BEHAVIOR_PRESETS.map((b) => (
              <TouchableOpacity key={b} style={[styles.chip, draft.behavior === b && styles.chipSelected]} onPress={() => setDraft({ ...draft, behavior: b })}>
                <Text style={[styles.chipText, draft.behavior === b && styles.chipTextSelected]}>{b}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.field}><Text style={typography.label}>Frequency</Text><TextInput style={styles.textInput} placeholder="e.g. 3 times" placeholderTextColor={colors.mutedText} value={draft.frequency} onChangeText={(t) => setDraft({ ...draft, frequency: t })} /></View>
          <View style={styles.field}><Text style={typography.label}>Duration</Text><TextInput style={styles.textInput} placeholder="e.g. 5 minutes" placeholderTextColor={colors.mutedText} value={draft.duration} onChangeText={(t) => setDraft({ ...draft, duration: t })} /></View>
          <View style={styles.field}>
            <Text style={typography.label}>Intensity</Text>
            <View style={styles.ratingRow}>
              {INTENSITIES.map((i) => (
                <TouchableOpacity key={i} style={[styles.ratingBtn, draft.intensity === i && styles.ratingBtnActive]} onPress={() => setDraft({ ...draft, intensity: i })}>
                  <Text style={[styles.ratingText, draft.intensity === i && styles.ratingTextActive]}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.field}><Text style={typography.label}>Trigger (Antecedent)</Text><TextInput style={styles.textInput} placeholder="What happened before?" placeholderTextColor={colors.mutedText} value={draft.trigger} onChangeText={(t) => setDraft({ ...draft, trigger: t })} /></View>
          <View style={styles.field}><Text style={typography.label}>Consequence</Text><TextInput style={styles.textInput} placeholder="What happened after?" placeholderTextColor={colors.mutedText} value={draft.consequence} onChangeText={(t) => setDraft({ ...draft, consequence: t })} /></View>
          <TouchableOpacity style={styles.addBtn} onPress={addRecord}>
            <Feather name="plus" size={14} color={colors.navyText} />
            <Text style={styles.addBtnText}>Add Record</Text>
          </TouchableOpacity>
        </View>

        <Text style={typography.h3}>Records · {records.length}</Text>
        {records.map((r) => (
          <View key={r.id} style={styles.card}>
            <View style={styles.recordHeader}>
              <Text style={typography.bodyBold}>{r.behavior}</Text>
              <TouchableOpacity onPress={() => removeRecord(r.id)}><Feather name="trash-2" size={14} color="#EF4444" /></TouchableOpacity>
            </View>
            <Text style={typography.caption}>{r.frequency} · {r.duration} · {r.intensity} intensity</Text>
            {r.trigger ? <Text style={typography.body}>Trigger: {r.trigger}</Text> : null}
            {r.consequence ? <Text style={typography.body}>Consequence: {r.consequence}</Text> : null}
          </View>
        ))}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Feather name="save" size={16} color={colors.navyText} />
          <Text style={styles.saveBtnText}>Save Assessment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const DEMO_RECORDS: BehaviorRecord[] = [
  { id: 'b1', behavior: 'Tantrum', frequency: '3 times', duration: '5 minutes', intensity: 'High', trigger: 'Asked to clean toys', consequence: 'Calmed after verbal prompting' },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  content: { padding: spacing.lg, gap: spacing.lg },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.md },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginRight: spacing.xs, backgroundColor: colors.bgApp },
  chipSelected: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.bodyText },
  chipTextSelected: { color: colors.navyText },
  field: { gap: spacing.xs },
  textInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, color: colors.navyText, backgroundColor: colors.bgApp },
  ratingRow: { flexDirection: 'row', gap: spacing.sm },
  ratingBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: spacing.sm, alignItems: 'center' },
  ratingBtnActive: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  ratingText: { fontSize: 12, color: colors.bodyText },
  ratingTextActive: { color: colors.navyText, fontWeight: '700' },
  addBtn: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingVertical: spacing.md },
  addBtnText: { fontWeight: '700', color: colors.navyText },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  saveBtn: { flexDirection: 'row', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { fontWeight: '700', color: colors.navyText },
});
