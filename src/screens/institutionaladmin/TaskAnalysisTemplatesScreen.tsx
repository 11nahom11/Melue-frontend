import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';
import { getTaskAnalysisTemplates, saveTaskAnalysisTemplate, deleteTaskAnalysisTemplate } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

interface TaskTemplate {
  id: string;
  name: string;
  steps: number;
  status: string;
}

const DEMO_TEMPLATES: TaskTemplate[] = [
  { id: '1', name: 'Hand Washing', steps: 8, status: 'Active' },
  { id: '2', name: 'Tooth Brushing', steps: 6, status: 'Active' },
  { id: '3', name: 'Getting Dressed', steps: 10, status: 'Active' },
];

export default function TaskAnalysisTemplatesScreen({ navigation }: NativeStackScreenProps<InstitutionalAdminStackParamList, 'TaskAnalysisTemplates'>) {
  const [templates, setTemplates] = useState<TaskTemplate[]>(DEMO_TEMPLATES);
  const [addingTemplate, setAddingTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDesc] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);
  const [stepMastery, setStepMastery] = useState('80');
  const [overallMastery, setOverallMastery] = useState('80');

  const load = useCallback(async () => {
    try { const { data } = await getTaskAnalysisTemplates(); setTemplates(data); } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const addStep = () => setSteps((s) => [...s, '']);
  const removeStep = (i: number) => setSteps((s) => s.filter((_, idx) => idx !== i));
  const moveStepUp = (i: number) => {
    if (i === 0) return;
    setSteps((s) => { const n = [...s]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; });
  };
  const moveStepDown = (i: number) => {
    setSteps((s) => { if (i === s.length - 1) return s; const n = [...s]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; return n; });
  };

  const saveTemplate = () => {
    if (!newTemplateName.trim()) return;
    setTemplates((ts) => [...ts, { id: String(Date.now()), name: newTemplateName, steps: steps.filter(Boolean).length, status: 'Active' }]);
    setAddingTemplate(false);
    setNewTemplateName('');
    setNewTemplateDesc('');
    setSteps(['']);
  };

  const deleteTemplate = (id: string) => {
    setTemplates((ts) => ts.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav sectionTitle="Task Analysis Templates" breadcrumb="Clinical Configuration / Task Analysis Templates" scrCode="SCR-ADMIN-006" />
      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="TaskAnalysisTemplates" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="CLINICAL CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Task Analysis Templates</Text>
              <Text style={typography.caption}>SCR-ADMIN-006 · Manage step-by-step task analysis templates</Text>
            </View>

            {/* Templates Table */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={typography.h3}>Templates</Text>
                {!addingTemplate && (
                  <TouchableOpacity style={styles.addLink} onPress={() => setAddingTemplate(true)}>
                    <Feather name="plus" size={14} color={colors.skyDark} />
                    <Text style={styles.addLinkText}>Add Template</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.tableHeader}>
                <Text style={[styles.thCell, { flex: 2 }]}>Template Name</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Steps</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Actions</Text>
              </View>
              {templates.map((t) => (
                <View key={t.id} style={styles.tableRow}>
                  <Text style={[styles.tdCellText, { flex: 2, fontWeight: '600' }]}>{t.name}</Text>
                  <Text style={[styles.tdCellText, { flex: 1 }]}>{t.steps} steps</Text>
                  <View style={[styles.tdCell, { flex: 1 }]}>
                    <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{t.status}</Text></View>
                  </View>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <View style={styles.actionRow}>
                      <TouchableOpacity><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTemplate(t.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Add Template Form */}
            {addingTemplate && (
              <View style={styles.addTemplateCard}>
                <Text style={typography.h3}>New Template</Text>
                <View style={styles.addTemplateGrid}>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Template Name</Text>
                    <TextInput style={styles.inlineInput} value={newTemplateName} onChangeText={setNewTemplateName} placeholder="e.g. Shoe Tying" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Description</Text>
                    <TextInput style={[styles.inlineInput, { minHeight: 50 }]} multiline value={newTemplateDesc} onChangeText={setNewTemplateDesc} placeholder="Brief description..." placeholderTextColor={colors.mutedText} />
                  </View>
                </View>

                {/* Steps Manager */}
                <View>
                  <Text style={typography.label}>Steps</Text>
                  <View style={styles.stepsContainer}>
                    {steps.map((step, i) => (
                      <View key={i} style={styles.stepRow}>
                        <Text style={styles.stepNum}>{i + 1}.</Text>
                        <TextInput style={styles.stepInput} value={step} onChangeText={(v: string) => setSteps((s) => s.map((x, idx) => (idx === i ? v : x)))} placeholder={`Step ${i + 1}...`} placeholderTextColor={colors.mutedText} />
                        <TouchableOpacity onPress={() => moveStepUp(i)}><Feather name="arrow-up" size={14} color={colors.skyDark} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => moveStepDown(i)}><Feather name="arrow-down" size={14} color={colors.skyDark} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => removeStep(i)}><Feather name="trash-2" size={14} color={colors.danger} /></TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity style={styles.addStepLink} onPress={addStep}>
                      <Feather name="plus" size={13} color={colors.skyDark} />
                      <Text style={styles.addStepLinkText}>Add Step</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Mastery Criteria */}
                <View style={styles.masteryRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Per-Step Mastery %</Text>
                    <TextInput style={[styles.inlineInput, { width: 80 }]} keyboardType="number-pad" value={stepMastery} onChangeText={setStepMastery} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Overall Mastery %</Text>
                    <TextInput style={[styles.inlineInput, { width: 80 }]} keyboardType="number-pad" value={overallMastery} onChangeText={setOverallMastery} />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity style={styles.saveBtn} onPress={saveTemplate}>
                    <Feather name="save" size={14} color={colors.navyText} />
                    <Text style={styles.saveBtnText}>Save Template</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setAddingTemplate(false)}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
                </View>
              </View>
            )}
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
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.xs },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  activeBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: '#059669' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  addLinkText: { fontSize: 13, fontWeight: '600', color: colors.skyDark },
  addTemplateCard: { borderWidth: 1, borderColor: '#38BDF8', borderRadius: radius.lg, padding: spacing.lg, backgroundColor: '#EFF6FF', gap: spacing.md },
  addTemplateGrid: { flexDirection: 'row', gap: spacing.md },
  inlineInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs + 2, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  stepsContainer: { gap: spacing.xs, marginTop: spacing.xs },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  stepNum: { fontSize: 11, fontFamily: 'monospace', color: colors.mutedText, width: 20 },
  stepInput: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  addStepLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
  addStepLinkText: { fontSize: 12, fontWeight: '600', color: colors.skyDark },
  masteryRow: { flexDirection: 'row', gap: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  formActions: { flexDirection: 'row', gap: spacing.sm },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2 },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
  cancelBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  cancelBtnText: { fontSize: 13, fontWeight: '600', color: colors.bodyText },
});
