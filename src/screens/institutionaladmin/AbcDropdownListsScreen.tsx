import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';
import { getAbcLists, saveAbcList, resetAbcListsToDefault } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

type TabType = 'Behaviors' | 'Antecedents' | 'Consequences' | 'Locations';
const TABS: TabType[] = ['Behaviors', 'Antecedents', 'Consequences', 'Locations'];

interface AbcItem {
  id: string;
  name: string;
  definition?: string;
  type?: string;
  category?: string;
  status: string;
}

type AbcLists = Record<TabType, AbcItem[]>;

const DEMO_LISTS: AbcLists = {
  Behaviors: [
    { id: '1', name: 'Self-Injurious Behavior', definition: 'Any behavior that causes harm to self', category: 'Physical', status: 'Active' },
    { id: '2', name: 'Aggression', definition: 'Physical or verbal acts directed toward others', category: 'Physical', status: 'Active' },
    { id: '3', name: 'Elopement', definition: 'Leaving designated area without permission', category: 'Safety', status: 'Active' },
  ],
  Antecedents: [
    { id: '4', name: 'Task demand', type: 'Academic', status: 'Active' },
    { id: '5', name: 'Transition', type: 'Environmental', status: 'Active' },
    { id: '6', name: 'Denial of access', type: 'Social', status: 'Active' },
    { id: '7', name: 'Unstructured time', type: 'Environmental', status: 'Active' },
  ],
  Consequences: [
    { id: '8', name: 'Escape task', type: 'Negative Reinforcement', status: 'Active' },
    { id: '9', name: 'Attention', type: 'Positive Reinforcement', status: 'Active' },
    { id: '10', name: 'Tangible item', type: 'Positive Reinforcement', status: 'Active' },
  ],
  Locations: [
    { id: '11', name: 'Classroom A', status: 'Active' },
    { id: '12', name: 'Therapy Room 1', status: 'Active' },
    { id: '13', name: 'Outdoor Area', status: 'Active' },
    { id: '14', name: 'Sensory Room', status: 'Inactive' },
  ],
};

export default function AbcDropdownListsScreen({ navigation }: NativeStackScreenProps<InstitutionalAdminStackParamList, 'AbcDropdownLists'>) {
  const [activeTab, setActiveTab] = useState<TabType>('Behaviors');
  const [lists, setLists] = useState<AbcLists>(DEMO_LISTS);
  const [addingBehavior, setAddingBehavior] = useState(false);
  const [newBehavior, setNewBehavior] = useState({ name: '', definition: '', category: 'Physical' });

  const load = useCallback(async () => {
    try {
      const { data } = await getAbcLists();
      setLists(data);
    } catch {}
  }, []);

  useEffect(() => { load(); }, [load]);

  const addBehavior = () => {
    if (!newBehavior.name.trim()) return;
    setLists((prev) => ({
      ...prev,
      Behaviors: [...prev.Behaviors, { id: String(Date.now()), ...newBehavior, status: 'Active' }],
    }));
    setNewBehavior({ name: '', definition: '', category: 'Physical' });
    setAddingBehavior(false);
  };

  const deleteItem = (tab: TabType, id: string) => {
    setLists((prev) => ({
      ...prev,
      [tab]: prev[tab].filter((i) => i.id !== id),
    }));
  };

  const handleSave = () => Alert.alert('Configuration saved');
  const handleReset = () => {
    Alert.alert('Reset all lists to default?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: async () => { try { await resetAbcListsToDefault(); } catch {} setLists(DEMO_LISTS); } },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav sectionTitle="ABC Dropdown Lists" breadcrumb="Clinical Configuration / ABC Dropdown Lists" scrCode="SCR-ADMIN-003" />
      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="AbcDropdownLists" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="CLINICAL CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>ABC Dropdown Lists</Text>
              <Text style={typography.caption}>SCR-ADMIN-003 · Manage behavior, antecedent, consequence, and location options</Text>
            </View>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
              {TABS.map((tab) => (
                <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
                  <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                  {activeTab === tab && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Behaviors Tab */}
            {activeTab === 'Behaviors' && (
              <View style={styles.card}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.thCell, { flex: 1.5 }]}>Behavior Name</Text>
                  <Text style={[styles.thCell, { flex: 2 }]}>Definition</Text>
                  <Text style={[styles.thCell, { flex: 1.2 }]}>Category</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Actions</Text>
                </View>
                {lists.Behaviors.map((b) => (
                  <View key={b.id} style={styles.tableRow}>
                    <Text style={[styles.tdCellText, { flex: 1.5, fontWeight: '600' }]}>{b.name}</Text>
                    <Text style={[styles.tdCellText, { flex: 2 }]} numberOfLines={1}>{b.definition}</Text>
                    <View style={[styles.tdCell, { flex: 1.2 }]}><View style={styles.badge}><Text style={styles.badgeText}>{b.category}</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}><View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{b.status}</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={styles.actionRow}>
                        <TouchableOpacity><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem('Behaviors', b.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
                {addingBehavior ? (
                  <View style={[styles.tableRow, { backgroundColor: '#EFF6FF' }]}>
                    <View style={[styles.tdCell, { flex: 1.5 }]}>
                      <TextInput style={styles.inlineInput} placeholder="Behavior name" placeholderTextColor={colors.mutedText} value={newBehavior.name} onChangeText={(v: string) => setNewBehavior((n) => ({ ...n, name: v }))} />
                    </View>
                    <View style={[styles.tdCell, { flex: 2 }]}>
                      <TextInput style={styles.inlineInput} placeholder="Definition" placeholderTextColor={colors.mutedText} value={newBehavior.definition} onChangeText={(v: string) => setNewBehavior((n) => ({ ...n, definition: v }))} />
                    </View>
                    <View style={[styles.tdCell, { flex: 1.2 }]}>
                      <View style={styles.badge}><Text style={styles.badgeText}>{newBehavior.category}</Text></View>
                    </View>
                    <View style={[styles.tdCell, { flex: 1 }]}><View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Active</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={styles.actionRow}>
                        <TouchableOpacity onPress={addBehavior}><Feather name="check" size={16} color={colors.success} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => setAddingBehavior(false)}><Feather name="x" size={16} color={colors.mutedText} /></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addLink} onPress={() => setAddingBehavior(true)}>
                    <Feather name="plus" size={14} color="#0284C7" />
                    <Text style={styles.addLinkText}>Add Behavior</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Antecedents Tab */}
            {activeTab === 'Antecedents' && (
              <View style={styles.card}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.thCell, { flex: 2 }]}>Name</Text>
                  <Text style={[styles.thCell, { flex: 1.5 }]}>Type</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Actions</Text>
                </View>
                {lists.Antecedents.map((a) => (
                  <View key={a.id} style={styles.tableRow}>
                    <Text style={[styles.tdCellText, { flex: 2, fontWeight: '600' }]}>{a.name}</Text>
                    <View style={[styles.tdCell, { flex: 1.5 }]}><View style={styles.badge}><Text style={styles.badgeText}>{a.type}</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}><View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{a.status}</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={styles.actionRow}>
                        <TouchableOpacity><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem('Antecedents', a.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Consequences Tab */}
            {activeTab === 'Consequences' && (
              <View style={styles.card}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.thCell, { flex: 2 }]}>Name</Text>
                  <Text style={[styles.thCell, { flex: 1.5 }]}>Type</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Actions</Text>
                </View>
                {lists.Consequences.map((c) => (
                  <View key={c.id} style={styles.tableRow}>
                    <Text style={[styles.tdCellText, { flex: 2, fontWeight: '600' }]}>{c.name}</Text>
                    <View style={[styles.tdCell, { flex: 1.5 }]}><View style={styles.badge}><Text style={styles.badgeText}>{c.type}</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}><View style={styles.activeBadge}><Text style={styles.activeBadgeText}>{c.status}</Text></View></View>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={styles.actionRow}>
                        <TouchableOpacity><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem('Consequences', c.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Locations Tab */}
            {activeTab === 'Locations' && (
              <View style={styles.card}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.thCell, { flex: 3 }]}>Location Name</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Actions</Text>
                </View>
                {lists.Locations.map((l) => (
                  <View key={l.id} style={styles.tableRow}>
                    <Text style={[styles.tdCellText, { flex: 3, fontWeight: '600' }]}>{l.name}</Text>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={l.status === 'Active' ? styles.activeBadge : styles.inactiveBadge}>
                        <Text style={l.status === 'Active' ? styles.activeBadgeText : styles.inactiveBadgeText}>{l.status}</Text>
                      </View>
                    </View>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={styles.actionRow}>
                        <TouchableOpacity><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem('Locations', l.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
              <TouchableOpacity style={styles.ghostDangerBtn} onPress={handleReset}>
                <Feather name="refresh-cw" size={14} color={colors.danger} />
                <Text style={styles.ghostDangerBtnText}>Reset to Default</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Feather name="save" size={14} color={colors.navyText} />
                <Text style={styles.saveBtnText}>Save Configuration</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2026 Melu'e Foundation. All rights reserved.</Text>
            </View>
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
  scrollContent: { padding: spacing.xl, gap: spacing.lg, maxWidth: 1024, alignSelf: 'center', width: '100%' },
  headerLeft: { gap: 2 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.skyAccent },
  tabText: { fontSize: 13, fontWeight: '600', color: colors.mutedText },
  tabTextActive: { color: '#0284C7' },
  tabIndicator: { position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, backgroundColor: colors.skyAccent },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.xs },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  badge: { backgroundColor: '#F3F4F6', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, fontWeight: '600', color: colors.bodyText },
  activeBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: '#059669' },
  inactiveBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  inactiveBadgeText: { fontSize: 10, fontWeight: '700', color: '#6B7280' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  addLinkText: { fontSize: 13, fontWeight: '600', color: '#0284C7' },
  inlineInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  bottomActions: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'flex-end' },
  ghostDangerBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderRadius: radius.md, borderWidth: 1, borderColor: '#FCA5A5', backgroundColor: colors.bgCard },
  ghostDangerBtnText: { fontSize: 13, fontWeight: '600', color: colors.danger },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2 },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
  footer: { alignItems: 'center', paddingVertical: spacing.xl },
  footerText: { fontSize: 12, color: colors.mutedText },
});
