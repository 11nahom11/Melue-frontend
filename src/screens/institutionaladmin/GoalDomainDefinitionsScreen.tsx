import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';
import { getGoalDomains, saveGoalDomains } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

interface GoalDomain {
  id: string;
  name: string;
  description: string;
  order: number;
  status: string;
}

const DEMO_DOMAINS: GoalDomain[] = [
  { id: '1', name: 'Cognitive', description: 'Problem solving, memory, attention', order: 1, status: 'Active' },
  { id: '2', name: 'Receptive Language', description: 'Understanding verbal/non-verbal communication', order: 2, status: 'Active' },
  { id: '3', name: 'Expressive Language', description: 'Verbal and non-verbal expression', order: 3, status: 'Active' },
  { id: '4', name: 'Social Skills', description: 'Interaction, turn-taking, peer engagement', order: 4, status: 'Active' },
  { id: '5', name: 'Motor Skills', description: 'Fine and gross motor development', order: 5, status: 'Active' },
  { id: '6', name: 'Adaptive', description: 'Daily living and self-care skills', order: 6, status: 'Active' },
];

export default function GoalDomainDefinitionsScreen({ navigation }: NativeStackScreenProps<InstitutionalAdminStackParamList, 'GoalDomainDefinitions'>) {
  const [domains, setDomains] = useState<GoalDomain[]>(DEMO_DOMAINS);
  const [addingDomain, setAddingDomain] = useState(false);
  const [newDomain, setNewDomain] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuf, setEditBuf] = useState({ name: '', description: '' });

  const load = useCallback(async () => {
    try { const { data } = await getGoalDomains(); setDomains(data); } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const moveUp = (id: string) => {
    setDomains((ds) => {
      const idx = ds.findIndex((d) => d.id === id);
      if (idx === 0) return ds;
      const next = [...ds];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next.map((d, i) => ({ ...d, order: i + 1 }));
    });
  };
  const moveDown = (id: string) => {
    setDomains((ds) => {
      const idx = ds.findIndex((d) => d.id === id);
      if (idx === ds.length - 1) return ds;
      const next = [...ds];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next.map((d, i) => ({ ...d, order: i + 1 }));
    });
  };
  const toggleStatus = (id: string) => {
    setDomains((ds) => ds.map((d) => (d.id === id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d)));
  };
  const deleteDomain = (id: string) => setDomains((ds) => ds.filter((d) => d.id !== id));
  const addDomain = () => {
    if (!newDomain.name.trim()) return;
    setDomains((ds) => [...ds, { id: String(Date.now()), ...newDomain, order: ds.length + 1, status: 'Active' }]);
    setNewDomain({ name: '', description: '' });
    setAddingDomain(false);
  };
  const handleSave = async () => {
    try { await saveGoalDomains(domains as any); } catch {}
    Alert.alert('Configuration saved');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav sectionTitle="Goal Domain Definitions" breadcrumb="Clinical Configuration / Goal Domain Definitions" scrCode="SCR-ADMIN-005" />
      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="GoalDomainDefinitions" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="CLINICAL CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Goal Domain Definitions</Text>
              <Text style={typography.caption}>SCR-ADMIN-005 · Define and order therapy goal domains</Text>
            </View>

            {/* Domains Table */}
            <View style={styles.card}>
              <View style={styles.tableHeader}>
                <Text style={[styles.thCell, { flex: 0.8 }]}>Order</Text>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Name</Text>
                <Text style={[styles.thCell, { flex: 2.5 }]}>Description</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                <Text style={[styles.thCell, { flex: 1.2 }]}>Actions</Text>
              </View>
              {domains.map((d) => (
                <View key={d.id} style={styles.tableRow}>
                  {editingId === d.id ? (
                    <>
                      <View style={[styles.tdCell, { flex: 0.8 }]}>
                        <View style={styles.orderCol}>
                          <TouchableOpacity onPress={() => moveUp(d.id)}><Feather name="arrow-up" size={14} color={colors.skyDark} /></TouchableOpacity>
                          <Text style={styles.orderNum}>{d.order}</Text>
                          <TouchableOpacity onPress={() => moveDown(d.id)}><Feather name="arrow-down" size={14} color={colors.skyDark} /></TouchableOpacity>
                        </View>
                      </View>
                      <View style={[styles.tdCell, { flex: 1.5 }]}>
                        <TextInput style={styles.inlineInput} value={editBuf.name} onChangeText={(v: string) => setEditBuf((b) => ({ ...b, name: v }))} />
                      </View>
                      <View style={[styles.tdCell, { flex: 2.5 }]}>
                        <TextInput style={styles.inlineInput} value={editBuf.description} onChangeText={(v: string) => setEditBuf((b) => ({ ...b, description: v }))} />
                      </View>
                      <View style={[styles.tdCell, { flex: 1 }]}>
                        <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{d.status}</Text></View>
                      </View>
                      <View style={[styles.tdCell, { flex: 1.2 }]}>
                        <View style={styles.actionRow}>
                          <TouchableOpacity onPress={() => { setDomains((ds) => ds.map((x) => (x.id === d.id ? { ...x, ...editBuf } : x))); setEditingId(null); }}><Feather name="check" size={16} color={colors.success} /></TouchableOpacity>
                          <TouchableOpacity onPress={() => setEditingId(null)}><Feather name="x" size={16} color={colors.mutedText} /></TouchableOpacity>
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={[styles.tdCell, { flex: 0.8 }]}>
                        <View style={styles.orderCol}>
                          <TouchableOpacity onPress={() => moveUp(d.id)}><Feather name="arrow-up" size={14} color={colors.skyDark} /></TouchableOpacity>
                          <Text style={styles.orderNum}>{d.order}</Text>
                          <TouchableOpacity onPress={() => moveDown(d.id)}><Feather name="arrow-down" size={14} color={colors.skyDark} /></TouchableOpacity>
                        </View>
                      </View>
                      <Text style={[styles.tdCellText, { flex: 1.5, fontWeight: '600' }]}>{d.name}</Text>
                      <Text style={[styles.tdCellText, { flex: 2.5 }]} numberOfLines={1}>{d.description}</Text>
                      <View style={[styles.tdCell, { flex: 1 }]}>
                        <TouchableOpacity onPress={() => toggleStatus(d.id)}>
                          <View style={d.status === 'Active' ? styles.activeBadge : styles.inactiveBadge}>
                            <Text style={d.status === 'Active' ? styles.activeBadgeText : styles.inactiveBadgeText}>{d.status}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.tdCell, { flex: 1.2 }]}>
                        <View style={styles.actionRow}>
                          <TouchableOpacity onPress={() => { setEditingId(d.id); setEditBuf({ name: d.name, description: d.description }); }}><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                          <TouchableOpacity onPress={() => deleteDomain(d.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ))}
            </View>

            {/* Add Domain */}
            {addingDomain ? (
              <View style={styles.addDomainCard}>
                <View style={styles.addDomainRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Domain Name</Text>
                    <TextInput style={styles.inlineInput} value={newDomain.name} onChangeText={(v: string) => setNewDomain((n) => ({ ...n, name: v }))} placeholder="e.g. Self-Help Skills" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={typography.label}>Description</Text>
                    <TextInput style={styles.inlineInput} value={newDomain.description} onChangeText={(v: string) => setNewDomain((n) => ({ ...n, description: v }))} placeholder="Brief description..." placeholderTextColor={colors.mutedText} />
                  </View>
                </View>
                <View style={styles.addDomainActions}>
                  <TouchableOpacity style={styles.addBtnSmall} onPress={addDomain}><Text style={styles.addBtnSmallText}>Add Domain</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setAddingDomain(false)}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.addLink} onPress={() => setAddingDomain(true)}>
                <Feather name="plus" size={14} color={colors.skyDark} />
                <Text style={styles.addLinkText}>Add Domain</Text>
              </TouchableOpacity>
            )}

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
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.xs },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  orderCol: { alignItems: 'center', gap: 2 },
  orderNum: { fontSize: 12, fontWeight: '600', color: colors.navyText, fontFamily: 'monospace' },
  activeBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: '#059669' },
  inactiveBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  inactiveBadgeText: { fontSize: 10, fontWeight: '700', color: '#6B7280' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  inlineInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  addDomainCard: { borderWidth: 1, borderColor: '#38BDF8', borderRadius: radius.lg, padding: spacing.lg, backgroundColor: '#EFF6FF', gap: spacing.sm },
  addDomainRow: { flexDirection: 'row', gap: spacing.md },
  addDomainActions: { flexDirection: 'row', gap: spacing.sm },
  addBtnSmall: { backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2 },
  addBtnSmallText: { fontSize: 12, fontWeight: '700', color: colors.navyText },
  cancelBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  cancelBtnText: { fontSize: 12, fontWeight: '600', color: colors.bodyText },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  addLinkText: { fontSize: 13, fontWeight: '600', color: colors.skyDark },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, alignSelf: 'flex-start' },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
});
