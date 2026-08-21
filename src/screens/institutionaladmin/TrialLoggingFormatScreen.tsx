import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';
import { getTrialLoggingConfig, saveTrialLoggingConfig } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

const COLOR_SWATCHES = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6'];

interface TrialLevel {
  id: string;
  name: string;
  color: string;
  order: number;
  status: string;
}

export default function TrialLoggingFormatScreen({ navigation }: NativeStackScreenProps<InstitutionalAdminStackParamList, 'TrialLoggingFormat'>) {
  const [levels, setLevels] = useState<TrialLevel[]>(DEMO_LEVELS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuf, setEditBuf] = useState({ name: '', color: '', order: 0 });
  const [addingLevel, setAddingLevel] = useState(false);
  const [newLevel, setNewLevel] = useState({ name: '', color: '#6366F1', order: 5 });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [layout, setLayout] = useState('Horizontal');
  const [streamCount, setStreamCount] = useState('5');
  const [consecutive, setConsecutive] = useState('5');
  const [independence, setIndependence] = useState('80');
  const [autoSuggest, setAutoSuggest] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await getTrialLoggingConfig();
      setLevels(data.levels);
      setLayout(data.layout);
      setStreamCount(String(data.streamCount));
      setConsecutive(String(data.masteryConsecutive));
      setIndependence(String(data.masteryPercent));
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const startEdit = (lv: TrialLevel) => {
    setEditingId(lv.id);
    setEditBuf({ name: lv.name, color: lv.color, order: lv.order });
  };
  const saveEdit = (id: string) => {
    setLevels((ls) => ls.map((l) => (l.id === id ? { ...l, ...editBuf } : l)));
    setEditingId(null);
  };
  const deleteLevel = (id: string) => {
    setLevels((ls) => ls.filter((l) => l.id !== id));
    setDeleteConfirmId(null);
  };
  const addLevel = () => {
    if (!newLevel.name.trim()) return;
    setLevels((ls) => [...ls, { id: String(Date.now()), ...newLevel, status: 'Active' }]);
    setNewLevel({ name: '', color: '#6366F1', order: levels.length + 2 });
    setAddingLevel(false);
  };
  const handleSave = async () => {
    try {
      await saveTrialLoggingConfig({ levels, layout, streamCount: Number(streamCount), masteryConsecutive: Number(consecutive), masteryPercent: Number(independence) });
    } catch {}
    Alert.alert('Configuration saved');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav sectionTitle="Trial Logging Format" breadcrumb="Clinical Configuration / Trial Logging Format" scrCode="SCR-ADMIN-002" />
      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="TrialLoggingFormat" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="CLINICAL CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Trial Logging Format</Text>
              <Text style={typography.caption}>SCR-ADMIN-002 · Configure prompt levels, trial layout, and mastery criteria</Text>
            </View>

            {/* Prompt Levels Table */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={typography.h3}>Prompt Levels</Text>
                {!addingLevel && (
                  <TouchableOpacity style={styles.addLink} onPress={() => setAddingLevel(true)}>
                    <Feather name="plus" size={14} color="#0284C7" />
                    <Text style={styles.addLinkText}>Add Prompt Level</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.tableHeader}>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Name</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Color</Text>
                <Text style={[styles.thCell, { flex: 0.8 }]}>Order</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Actions</Text>
              </View>
              {levels.map((lv) => (
                <View key={lv.id} style={styles.tableRow}>
                  {editingId === lv.id ? (
                    <>
                      <View style={[styles.tdCell, { flex: 1.5 }]}>
                        <TextInput style={styles.inlineInput} value={editBuf.name} onChangeText={(v: string) => setEditBuf((b) => ({ ...b, name: v }))} />
                      </View>
                      <View style={[styles.tdCell, { flex: 1.5 }]}>
                        <View style={styles.swatchRow}>
                          {COLOR_SWATCHES.map((c) => (
                            <TouchableOpacity key={c} style={[styles.swatch, { backgroundColor: c }, editBuf.color === c && styles.swatchSelected]} onPress={() => setEditBuf((b) => ({ ...b, color: c }))} />
                          ))}
                        </View>
                      </View>
                      <View style={[styles.tdCell, { flex: 0.8 }]}>
                        <TextInput style={[styles.inlineInput, { width: 50 }]} keyboardType="number-pad" value={String(editBuf.order)} onChangeText={(v: string) => setEditBuf((b) => ({ ...b, order: Number(v) }))} />
                      </View>
                      <View style={[styles.tdCell, { flex: 1 }]}>
                        <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Active</Text></View>
                      </View>
                      <View style={[styles.tdCell, { flex: 1.5 }]}>
                        <View style={styles.actionRow}>
                          <TouchableOpacity onPress={() => saveEdit(lv.id)}><Feather name="check" size={16} color={colors.success} /></TouchableOpacity>
                          <TouchableOpacity onPress={() => setEditingId(null)}><Feather name="x" size={16} color={colors.mutedText} /></TouchableOpacity>
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={[styles.tdCellText, { flex: 1.5, fontWeight: '700' }]}>{lv.name}</Text>
                      <View style={[styles.tdCell, { flex: 1.5 }]}>
                        <View style={[styles.colorDot, { backgroundColor: lv.color }]} />
                      </View>
                      <Text style={[styles.tdCellText, { flex: 0.8 }]}>{lv.order}</Text>
                      <View style={[styles.tdCell, { flex: 1 }]}>
                        <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{lv.status}</Text></View>
                      </View>
                      <View style={[styles.tdCell, { flex: 1.5 }]}>
                        <View style={styles.actionRow}>
                          <TouchableOpacity onPress={() => startEdit(lv)}><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                          {deleteConfirmId === lv.id ? (
                            <View style={styles.deleteConfirm}>
                              <Text style={styles.deleteText}>Delete?</Text>
                              <TouchableOpacity onPress={() => deleteLevel(lv.id)}><Feather name="check" size={14} color={colors.danger} /></TouchableOpacity>
                              <TouchableOpacity onPress={() => setDeleteConfirmId(null)}><Feather name="x" size={14} color={colors.mutedText} /></TouchableOpacity>
                            </View>
                          ) : (
                            <TouchableOpacity onPress={() => setDeleteConfirmId(lv.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ))}
              {addingLevel && (
                <View style={[styles.tableRow, { backgroundColor: '#EFF6FF' }]}>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <TextInput style={styles.inlineInput} placeholder="Name" placeholderTextColor={colors.mutedText} value={newLevel.name} onChangeText={(v: string) => setNewLevel((n) => ({ ...n, name: v }))} />
                  </View>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <View style={styles.swatchRow}>
                      {COLOR_SWATCHES.map((c) => (
                        <TouchableOpacity key={c} style={[styles.swatch, { backgroundColor: c }, newLevel.color === c && styles.swatchSelected]} onPress={() => setNewLevel((n) => ({ ...n, color: c }))} />
                      ))}
                    </View>
                  </View>
                  <View style={[styles.tdCell, { flex: 0.8 }]}>
                    <TextInput style={[styles.inlineInput, { width: 50 }]} keyboardType="number-pad" value={String(newLevel.order)} onChangeText={(v: string) => setNewLevel((n) => ({ ...n, order: Number(v) }))} />
                  </View>
                  <View style={[styles.tdCell, { flex: 1 }]}>
                    <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Active</Text></View>
                  </View>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <View style={styles.actionRow}>
                      <TouchableOpacity onPress={addLevel}><Feather name="check" size={16} color={colors.success} /></TouchableOpacity>
                      <TouchableOpacity onPress={() => setAddingLevel(false)}><Feather name="x" size={16} color={colors.mutedText} /></TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Live Preview */}
            <View style={styles.card}>
              <Text style={styles.previewTitle}>Live Preview</Text>
              <View style={styles.previewRow}>
                {levels.map((lv) => (
                  <View key={lv.id} style={[styles.previewButton, { backgroundColor: lv.color }]}>
                    <Text style={styles.previewButtonText}>{lv.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Trial Stream Layout + Mastery Criteria */}
            <View style={styles.twoCol}>
              <View style={styles.card}>
                <Text style={typography.h3}>Trial Stream Layout</Text>
                <View style={styles.radioGroup}>
                  {['Horizontal', 'Vertical', 'Card Grid'].map((opt) => (
                    <TouchableOpacity key={opt} style={styles.radioRow} onPress={() => setLayout(opt)}>
                      <View style={[styles.radioCircle, layout === opt && styles.radioCircleOn]}>
                        {layout === opt && <View style={styles.radioDot} />}
                      </View>
                      <Text style={typography.body}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.field}>
                  <Text style={typography.label}>Trial Stream Count (3–20)</Text>
                  <TextInput style={styles.textInput} keyboardType="number-pad" value={streamCount} onChangeText={setStreamCount} />
                </View>
              </View>

              <View style={styles.card}>
                <Text style={typography.h3}>Mastery Criteria</Text>
                <View style={styles.field}>
                  <Text style={typography.label}>Consecutive Trials</Text>
                  <TextInput style={styles.textInput} keyboardType="number-pad" value={consecutive} onChangeText={setConsecutive} />
                </View>
                <View style={styles.field}>
                  <Text style={typography.label}>Independence % Threshold</Text>
                  <TextInput style={styles.textInput} keyboardType="number-pad" value={independence} onChangeText={setIndependence} />
                </View>
                <View style={styles.toggleRow}>
                  <Text style={typography.body}>Auto-Suggestion</Text>
                  <TouchableOpacity style={[styles.toggleTrack, autoSuggest && styles.toggleTrackOn]} onPress={() => setAutoSuggest((v) => !v)}>
                    <View style={[styles.toggleThumb, autoSuggest && styles.toggleThumbOn]} />
                  </TouchableOpacity>
                  <Text style={typography.caption}>{autoSuggest ? 'On' : 'Off'}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Feather name="save" size={14} color={colors.navyText} />
              <Text style={styles.saveBtnText}>Save Configuration</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2026 Melu'e Foundation. All rights reserved.</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const DEMO_LEVELS: TrialLevel[] = [
  { id: '1', name: 'FP', color: '#EF4444', order: 1, status: 'Active' },
  { id: '2', name: 'PP', color: '#F97316', order: 2, status: 'Active' },
  { id: '3', name: 'G', color: '#3B82F6', order: 3, status: 'Active' },
  { id: '4', name: '+', color: '#22C55E', order: 4, status: 'Active' },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  body: { flex: 1, flexDirection: 'row' },
  contentArea: { flex: 1 },
  scrollContent: { padding: spacing.xl, gap: spacing.lg, maxWidth: 1024, alignSelf: 'center', width: '100%' },
  headerLeft: { gap: 2 },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.sm },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  addLinkText: { fontSize: 13, fontWeight: '600', color: '#0284C7' },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm, marginBottom: spacing.xs },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  inlineInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  swatchRow: { flexDirection: 'row', gap: 4 },
  swatch: { width: 20, height: 20, borderRadius: 10 },
  swatchSelected: { borderWidth: 2, borderColor: colors.navyText },
  colorDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  activeBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: '#059669' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  deleteConfirm: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  deleteText: { fontSize: 11, color: colors.danger, fontWeight: '600' },
  previewTitle: { fontSize: 10, fontWeight: '600', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  previewRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  previewButton: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.md },
  previewButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  twoCol: { flexDirection: 'row', gap: spacing.lg },
  radioGroup: { gap: spacing.sm, marginTop: spacing.sm },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  radioCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioCircleOn: { borderColor: colors.skyAccent },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.skyAccent },
  field: { gap: spacing.xs, marginTop: spacing.sm },
  textInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, fontSize: 13, color: colors.navyText, width: 80 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  toggleTrack: { width: 40, height: 22, borderRadius: 11, backgroundColor: colors.border, padding: 2, justifyContent: 'center' },
  toggleTrackOn: { backgroundColor: colors.skyAccent },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.white },
  toggleThumbOn: { alignSelf: 'flex-end' },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, alignSelf: 'flex-start' },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
  footer: { alignItems: 'center', paddingVertical: spacing.xl },
  footerText: { fontSize: 12, color: colors.mutedText },
});
