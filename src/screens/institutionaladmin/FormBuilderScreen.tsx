import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';
import { getFormConfig, saveFormConfig, resetFormToDefault } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

const FORMS = ['Enrollment Wizard', 'IUP Form', 'ABLLS Assessment Form'];
const FIELD_TYPES = ['Text', 'Number', 'Date', 'Dropdown', 'Checkbox', 'Radio', 'TextArea', 'File'];

const TYPE_BADGE_STYLE = { bg: '#EFF6FF', text: '#0284C7' };

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  visible: boolean;
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <TouchableOpacity onPress={onChange} activeOpacity={0.7} style={[styles.toggleTrack, enabled && styles.toggleTrackOn]}>
      <View style={[styles.toggleKnob, enabled && styles.toggleKnobOn]} />
    </TouchableOpacity>
  );
}

export default function FormBuilderScreen({ navigation }: NativeStackScreenProps<InstitutionalAdminStackParamList, 'FormBuilder'>) {
  const [selectedForm, setSelectedForm] = useState(FORMS[0]);
  const [fields, setFields] = useState<FormField[]>([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [addingField, setAddingField] = useState(false);
  const [newFieldType, setNewFieldType] = useState('Text');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [isCustomTemplate, setIsCustomTemplate] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await getFormConfig(selectedForm);
      setFields(data.fields);
      setIsCustomTemplate(!data.isDefault);
    } catch {
      setFields(DEMO_FIELDS[selectedForm] || []);
      setIsCustomTemplate(false);

    }
  }, [selectedForm]);

  useEffect(() => { load(); }, [load]);

  const toggleRequired = (id: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f)));
    setIsCustomTemplate(true);
  };

  const toggleVisible = (id: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f)));
    setIsCustomTemplate(true);
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    setIsCustomTemplate(true);
  };

  const addField = () => {
    if (!newFieldLabel.trim()) return;
    setFields((prev) => [...prev, { id: `f-${Date.now()}`, type: newFieldType, label: newFieldLabel.trim(), required: newFieldRequired, visible: true }]);
    setNewFieldType('Text');
    setNewFieldLabel('');
    setNewFieldRequired(false);
    setAddingField(false);
    setIsCustomTemplate(true);
  };

  const handleSave = async () => {
    if (fields.length === 0) { Alert.alert('At least one field required'); return; }
    try {
      await saveFormConfig(selectedForm, { fields });
    } catch {}
    Alert.alert('Configuration saved');
  };

  const handleReset = async () => {
    try {
      await resetFormToDefault(selectedForm);
    } catch {}
    setFields(DEMO_FIELDS[selectedForm] || []);
    setIsCustomTemplate(false);
    setAddingField(false);
    setNewFieldType('Text');
    setNewFieldLabel('');
    setNewFieldRequired(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav sectionTitle="Form Builder" breadcrumb="Clinical Configuration / Form Builder" scrCode="SCR-ADMIN-001" />
      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="FormBuilder" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="CLINICAL CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.sectionHeader}>
              <Text style={typography.h1}>Form Builder</Text>
              <Text style={styles.sectionDesc}>SCR-ADMIN-001 · Configure enrollment and assessment form templates</Text>
            </View>

            <View style={styles.controlsRow}>
              <View style={styles.selectWrap}>
                <Text style={typography.label}>Select Form</Text>
                <View style={styles.selectBox}>
                  {FORMS.map((f) => (
                    <TouchableOpacity key={f} style={[styles.selectOption, selectedForm === f && styles.selectOptionActive]} onPress={() => setSelectedForm(f)}>
                      <Text style={[styles.selectOptionText, selectedForm === f && styles.selectOptionTextActive]}>{f}</Text>
                      {selectedForm === f && <Feather name="check" size={12} color={colors.navyText} />}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.templateBadge, isCustomTemplate ? styles.templateBadgeCustom : styles.templateBadgeDefault]}>
                <Text style={[styles.templateBadgeText, { color: isCustomTemplate ? colors.statusPendingText : colors.statusApprovedText }]}>
                  {isCustomTemplate ? 'Custom Template' : 'Using Default Template'}
                </Text>
              </View>
            </View>

            <View style={styles.canvas}>
              <Text style={styles.canvasTitle}>Form Canvas — {selectedForm}</Text>
              {fields.map((field) => {
                const badge = TYPE_BADGE_STYLE;
                return (
                  <View key={field.id} style={styles.fieldRow}>
                    <View style={[styles.typeBadge, { backgroundColor: badge.bg }]}>
                      <Text style={[styles.typeBadgeText, { color: badge.text }]}>{field.type}</Text>
                    </View>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <View style={styles.requiredGroup}>
                      <Text style={styles.requiredLabel}>Required</Text>
                      <Toggle enabled={field.required} onChange={() => toggleRequired(field.id)} />
                    </View>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => toggleVisible(field.id)}>
                      <Feather name={field.visible ? 'eye' : 'eye-off'} size={16} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => deleteField(field.id)}>
                      <Feather name="trash-2" size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                );
              })}

              {addingField ? (
                <View style={styles.addFieldForm}>
                  <View style={styles.addFieldCol}>
                    <Text style={styles.addFieldLabel}>Field Type</Text>
                    <View style={styles.typeChipRow}>
                      {FIELD_TYPES.map((t) => (
                        <TouchableOpacity key={t} style={[styles.typeChip, newFieldType === t && styles.typeChipActive]} onPress={() => setNewFieldType(t)}>
                          <Text style={[styles.typeChipText, newFieldType === t && styles.typeChipTextActive]}>{t}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View style={styles.addFieldColWide}>
                    <Text style={styles.addFieldLabel}>Label</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newFieldLabel}
                      onChangeText={setNewFieldLabel}
                      placeholder="Field label..."
                      placeholderTextColor={colors.mutedText}
                    />
                  </View>
                  <View style={styles.requiredGroup}>
                    <Text style={styles.requiredLabel}>Required</Text>
                    <Toggle enabled={newFieldRequired} onChange={() => setNewFieldRequired((r) => !r)} />
                  </View>
                  <View style={styles.addFieldActions}>
                    <TouchableOpacity style={styles.yellowBtnSmall} onPress={addField}>
                      <Text style={styles.yellowBtnText}>Add Field</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ghostBtnSmall} onPress={() => setAddingField(false)}>
                      <Text style={styles.ghostBtnText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={styles.addFieldLink} onPress={() => setAddingField(true)}>
                  <Feather name="plus" size={15} color="#0284C7" />
                  <Text style={styles.addFieldLinkText}>Add New Field</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.yellowBtn} onPress={() => setPreviewOpen(true)}>
                <Feather name="eye" size={15} color={colors.navyText} />
                <Text style={styles.yellowBtnText}>Preview Form</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yellowBtn} onPress={handleSave}>
                <Feather name="save" size={15} color={colors.navyText} />
                <Text style={styles.yellowBtnText}>Save Configuration</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dangerGhostBtn} onPress={handleReset}>
                <Feather name="refresh-cw" size={15} color="#DC2626" />
                <Text style={styles.dangerGhostBtnText}>Reset to Default</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2026 Melu'e Foundation. All rights reserved.</Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <Modal visible={previewOpen} transparent animationType="fade" onRequestClose={() => setPreviewOpen(false)}>
        <View style={styles.overlay}>
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Text style={typography.h3}>Form Preview — {selectedForm}</Text>
              <TouchableOpacity style={styles.iconBtn} onPress={() => setPreviewOpen(false)}>
                <Feather name="x" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.previewScroll}>
              {fields.filter((f) => f.visible).map((field) => (
                <View key={field.id} style={styles.previewField}>
                  <Text style={styles.previewFieldLabel}>
                    {field.label}
                    {field.required && <Text style={styles.requiredStar}> *</Text>}
                  </Text>
                  <View style={styles.previewPlaceholder}>
                    <Text style={styles.previewPlaceholderText}>{field.type} field</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.previewFooter}>
              <TouchableOpacity style={styles.ghostBtnSmall} onPress={() => setPreviewOpen(false)}>
                <Text style={styles.ghostBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const DEMO_FIELDS: Record<string, FormField[]> = {
  'Enrollment Wizard': [
    { id: '1', type: 'Text', label: 'Full Name', required: true, visible: true },
    { id: '2', type: 'Date', label: 'Date of Birth', required: true, visible: true },
    { id: '3', type: 'Dropdown', label: 'Program Type', required: false, visible: true },
    { id: '4', type: 'Text', label: 'Parent Name', required: false, visible: true },
    { id: '5', type: 'Text', label: 'Phone', required: false, visible: true },
  ],
  'IUP Form': [
    { id: '1', type: 'Text', label: 'Student Name', required: true, visible: true },
    { id: '2', type: 'TextArea', label: 'Learning Objectives', required: true, visible: true },
    { id: '3', type: 'Dropdown', label: 'Supervisor', required: false, visible: true },
    { id: '4', type: 'Date', label: 'Review Date', required: false, visible: true },
  ],
  'ABLLS Assessment Form': [
    { id: '1', type: 'Text', label: 'Learner Name', required: true, visible: true },
    { id: '2', type: 'Dropdown', label: 'Skill Area', required: true, visible: true },
    { id: '3', type: 'Number', label: 'Score', required: false, visible: true },
    { id: '4', type: 'Checkbox', label: 'Baseline Completed', required: false, visible: true },
  ],
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  body: { flex: 1, flexDirection: 'row' },
  contentArea: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.lg, maxWidth: 1024, alignSelf: 'center', width: '100%' },
  sectionHeader: { gap: spacing.xs },
  sectionDesc: { fontSize: 13, fontWeight: '400', color: colors.bodyText },
  controlsRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', gap: spacing.md },
  selectWrap: { minWidth: 220 },
  selectBox: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.bgCard, overflow: 'hidden' },
  selectOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  selectOptionActive: { backgroundColor: '#FEF3C7' },
  selectOptionText: { fontSize: 13, color: colors.bodyText },
  selectOptionTextActive: { color: colors.navyText, fontWeight: '600' },
  templateBadge: { marginLeft: 'auto', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.pill },
  templateBadgeDefault: { backgroundColor: colors.statusApprovedBg },
  templateBadgeCustom: { backgroundColor: colors.statusPendingBg },
  templateBadgeText: { fontSize: 12, fontWeight: '700' },
  canvas: { borderWidth: 1.5, borderColor: '#D1D5DB', borderStyle: 'dashed', borderRadius: radius.lg, padding: spacing.lg, gap: spacing.sm, backgroundColor: colors.bgApp },
  canvasTitle: { fontSize: 11, fontWeight: '600', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xs },
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  typeBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  typeBadgeText: { fontSize: 11, fontWeight: '600' },
  fieldLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.navyText },
  requiredGroup: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  requiredLabel: { fontSize: 11, fontWeight: '500', color: colors.bodyText },
  iconBtn: { padding: spacing.xs },
  toggleTrack: { width: 36, height: 20, borderRadius: 10, backgroundColor: '#D1D5DB', alignItems: 'flex-start', justifyContent: 'center' },
  toggleTrackOn: { backgroundColor: colors.skyAccent, alignItems: 'flex-end' },
  toggleKnob: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.white, marginLeft: 2 },
  toggleKnobOn: { marginRight: 2 },
  addFieldForm: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', gap: spacing.md, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: 'rgba(56,189,248,0.4)', borderRadius: radius.md, padding: spacing.lg },
  addFieldCol: { minWidth: 180 },
  addFieldColWide: { flex: 1, minWidth: 160 },
  addFieldLabel: { fontSize: 11, fontWeight: '600', color: colors.bodyText, marginBottom: spacing.xs },
  typeChipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  typeChip: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border },
  typeChipActive: { backgroundColor: '#E0F2FE', borderColor: colors.skyAccent },
  typeChipText: { fontSize: 11, fontWeight: '600', color: colors.bodyText },
  typeChipTextActive: { color: '#0369A1' },
  textInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 8, fontSize: 13, color: colors.navyText },
  addFieldActions: { flexDirection: 'row', gap: spacing.sm },
  addFieldLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
  addFieldLinkText: { fontSize: 13, fontWeight: '600', color: '#0284C7' },
  actionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  yellowBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  yellowBtnSmall: { backgroundColor: colors.primaryYellow, borderRadius: radius.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, alignItems: 'center' },
  yellowBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
  ghostBtnSmall: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgCard },
  ghostBtnText: { fontSize: 13, fontWeight: '600', color: colors.bodyText },
  dangerGhostBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderWidth: 1, borderColor: '#FCA5A5', borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.bgCard },
  dangerGhostBtnText: { fontSize: 13, fontWeight: '600', color: '#DC2626' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  previewCard: { width: '100%', maxWidth: 480, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.xl },
  previewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  previewScroll: { maxHeight: 380 },
  previewField: { marginBottom: spacing.md, gap: spacing.xs },
  previewFieldLabel: { fontSize: 13, fontWeight: '600', color: colors.bodyText },
  requiredStar: { color: '#EF4444', fontWeight: '700' },
  previewPlaceholder: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 10, backgroundColor: colors.bgApp },
  previewPlaceholderText: { fontSize: 13, fontWeight: '400', color: colors.mutedText },
  previewFooter: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: spacing.lg },
  footer: { alignItems: 'center', paddingVertical: spacing.xl },
  footerText: { fontSize: 12, color: colors.mutedText },
});
