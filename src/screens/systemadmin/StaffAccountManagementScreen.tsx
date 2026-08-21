import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import SystemAdminNav from './components/SystemAdminNav';
import SystemAdminSidebar from './components/SystemAdminSidebar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SystemAdminStackParamList } from '../../types';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  selected: boolean;
}

const DEMO_STAFF: StaffMember[] = [
  { id: '1', name: 'Teacher A', email: 'teachera@melue.org', role: 'teacher', phone: '555-0101', status: 'Active', selected: false },
  { id: '2', name: 'Teacher B', email: 'teacherb@melue.org', role: 'teacher', phone: '555-0102', status: 'Active', selected: false },
  { id: '3', name: 'Coordinator A', email: 'coordinator@melue.org', role: 'coordinator', phone: '555-0103', status: 'Active', selected: false },
  { id: '4', name: 'Director A', email: 'director@melue.org', role: 'director', phone: '555-0104', status: 'Active', selected: false },
  { id: '5', name: 'Teacher C', email: 'teacherc@melue.org', role: 'teacher', phone: '555-0105', status: 'Inactive', selected: false },
];

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  teacher: { bg: '#DBEAFE', text: '#1D4ED8' },
  coordinator: { bg: '#EDE9FE', text: '#7C3AED' },
  director: { bg: '#E0E7FF', text: '#4338CA' },
  institutional_admin: { bg: '#FEF3C7', text: '#B45309' },
  sysadmin: { bg: '#FEE2E2', text: '#DC2626' },
};

export default function StaffAccountManagementScreen({ navigation }: NativeStackScreenProps<SystemAdminStackParamList, 'StaffAccountManagement'>) {
  const [staff, setStaff] = useState<StaffMember[]>(DEMO_STAFF);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [addingStaff, setAddingStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'teacher', phone: '' });
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [bulkAction, setBulkAction] = useState('');

  const filtered = staff.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || s.role === roleFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleSelect = (id: string) => {
    setStaff((ss) => ss.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)));
  };
  const toggleAll = () => {
    const allSelected = filtered.every((s) => s.selected);
    const ids = new Set(filtered.map((s) => s.id));
    setStaff((ss) => ss.map((s) => (ids.has(s.id) ? { ...s, selected: !allSelected } : s)));
  };
  const toggleStatus = (id: string) => {
    setStaff((ss) => ss.map((s) => (s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s)));
  };
  const addStaffMember = () => {
    if (!newStaff.name.trim() || !newStaff.email.trim()) return;
    setStaff((ss) => [...ss, { id: String(Date.now()), ...newStaff, status: 'Active', selected: false }]);
    setNewStaff({ name: '', email: '', role: 'teacher', phone: '' });
    setAddingStaff(false);
  };

  const selectedCount = filtered.filter((s) => s.selected).length;

  return (
    <SafeAreaView style={styles.safe}>
      <SystemAdminNav sectionTitle="Staff Account Management" breadcrumb="System Configuration / Staff Account Management" scrCode="SCR-SYS-001" />
      <View style={styles.body}>
        <SystemAdminSidebar activeRoute="StaffAccountManagement" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="SYSTEM CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Staff Account Management</Text>
              <Text style={typography.caption}>SCR-SYS-001 · Manage staff accounts, roles, and access status</Text>
            </View>

            {/* Controls */}
            <View style={styles.controlsRow}>
              <View style={styles.searchContainer}>
                <Feather name="search" size={15} color={colors.mutedText} style={{ marginRight: spacing.sm }} />
                <TextInput style={styles.searchInput} placeholder="Search staff..." placeholderTextColor={colors.mutedText} value={search} onChangeText={setSearch} />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['All', 'teacher', 'coordinator', 'director', 'institutional_admin', 'sysadmin'].map((r) => (
                  <TouchableOpacity key={r} style={[styles.filterChip, roleFilter === r && styles.filterChipActive]} onPress={() => setRoleFilter(r)}>
                    <Text style={[styles.filterChipText, roleFilter === r && styles.filterChipTextActive]}>{r === 'All' ? 'All' : r.replace(/_/g, ' ')}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['All', 'Active', 'Inactive'].map((s) => (
                  <TouchableOpacity key={s} style={[styles.filterChip, statusFilter === s && styles.filterChipActive]} onPress={() => setStatusFilter(s)}>
                    <Text style={[styles.filterChipText, statusFilter === s && styles.filterChipTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.addBtn} onPress={() => setAddingStaff(true)}>
                <Feather name="plus" size={14} color={colors.navyText} />
                <Text style={styles.addBtnText}>Add Staff</Text>
              </TouchableOpacity>
            </View>

            {/* Add Staff Inline Form */}
            {addingStaff && (
              <View style={styles.addFormCard}>
                <Text style={typography.h3}>New Staff Member</Text>
                <View style={styles.addFormGrid}>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Full Name</Text>
                    <TextInput style={styles.inlineInput} value={newStaff.name} onChangeText={(v: string) => setNewStaff((n) => ({ ...n, name: v }))} placeholder="Jane Smith" placeholderTextColor={colors.mutedText} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Email</Text>
                    <TextInput style={styles.inlineInput} value={newStaff.email} onChangeText={(v: string) => setNewStaff((n) => ({ ...n, email: v }))} placeholder="jane@melue.org" placeholderTextColor={colors.mutedText} autoCapitalize="none" keyboardType="email-address" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Role</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {['teacher', 'coordinator', 'director', 'institutional_admin', 'sysadmin'].map((r) => (
                        <TouchableOpacity key={r} style={[styles.typeChip, newStaff.role === r && styles.typeChipActive]} onPress={() => setNewStaff((n) => ({ ...n, role: r }))}>
                          <Text style={[styles.typeChipText, newStaff.role === r && styles.typeChipTextActive]}>{r.replace(/_/g, ' ')}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={typography.label}>Phone</Text>
                    <TextInput style={styles.inlineInput} value={newStaff.phone} onChangeText={(v: string) => setNewStaff((n) => ({ ...n, phone: v }))} placeholder="555-0100" placeholderTextColor={colors.mutedText} keyboardType="phone-pad" />
                  </View>
                </View>
                <View style={styles.addFormActions}>
                  <TouchableOpacity style={styles.addBtnSmall} onPress={addStaffMember}><Text style={styles.addBtnSmallText}>Add Staff Member</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setAddingStaff(false)}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
                </View>
              </View>
            )}

            {/* Bulk Actions */}
            {selectedCount > 0 && (
              <View style={styles.bulkBar}>
                <Text style={styles.bulkText}>{selectedCount} selected</Text>
                <TouchableOpacity style={styles.filterChip} onPress={() => setBulkAction(bulkAction === '' ? 'Deactivate' : '')}>
                  <Text style={styles.filterChipText}>Bulk Action...</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBtnSmall}><Text style={styles.addBtnSmallText}>Apply</Text></TouchableOpacity>
              </View>
            )}

            {/* Staff Table + Details Side Panel */}
            <View style={styles.tableAndDetail}>
              <View style={[styles.card, { flex: 1 }]}>
                <View style={styles.tableHeader}>
                  <TouchableOpacity style={[styles.thCell, { width: 30 }]} onPress={toggleAll}>
                    <View style={[styles.checkbox, filtered.every((s) => s.selected) && styles.checkboxOn]} />
                  </TouchableOpacity>
                  <Text style={[styles.thCell, { flex: 1.5 }]}>Name</Text>
                  <Text style={[styles.thCell, { flex: 2 }]}>Email</Text>
                  <Text style={[styles.thCell, { flex: 1.2 }]}>Role</Text>
                  <Text style={[styles.thCell, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.thCell, { flex: 1.5 }]}>Actions</Text>
                </View>
                {filtered.map((s) => (
                  <TouchableOpacity key={s.id} style={[styles.tableRow, selectedStaff?.id === s.id && { backgroundColor: '#EFF6FF' }]} onPress={() => setSelectedStaff(s)}>
                    <TouchableOpacity style={[styles.tdCell, { width: 30 }]} onPress={() => toggleSelect(s.id)}>
                      <View style={[styles.checkbox, s.selected && styles.checkboxOn]} />
                    </TouchableOpacity>
                    <Text style={[styles.tdCellText, { flex: 1.5, fontWeight: '600' }]}>{s.name}</Text>
                    <Text style={[styles.tdCellText, { flex: 2 }]}>{s.email}</Text>
                    <View style={[styles.tdCell, { flex: 1.2 }]}>
                      <View style={[styles.roleBadge, { backgroundColor: ROLE_COLORS[s.role]?.bg || '#F3F4F6' }]}>
                        <Text style={[styles.roleBadgeText, { color: ROLE_COLORS[s.role]?.text || '#6B7280' }]}>{s.role}</Text>
                      </View>
                    </View>
                    <View style={[styles.tdCell, { flex: 1 }]}>
                      <View style={s.status === 'Active' ? styles.activeBadge : styles.inactiveBadge}>
                        <Text style={s.status === 'Active' ? styles.activeBadgeText : styles.inactiveBadgeText}>{s.status}</Text>
                      </View>
                    </View>
                    <View style={[styles.tdCell, { flex: 1.5 }]}>
                      <View style={styles.actionRow}>
                        <TouchableOpacity><Feather name="edit-2" size={15} color={colors.mutedText} /></TouchableOpacity>
                        <TouchableOpacity><Feather name="shield" size={15} color={colors.mutedText} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleStatus(s.id)}>
                          {s.status === 'Active' ? <Feather name="toggle-left" size={16} color={colors.danger} /> : <Feather name="toggle-right" size={16} color={colors.success} />}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Details Panel */}
              {selectedStaff && (
                <View style={styles.detailPanel}>
                  <View style={styles.detailHeader}>
                    <Text style={typography.h3}>Staff Details</Text>
                    <TouchableOpacity onPress={() => setSelectedStaff(null)}><Feather name="x" size={16} color={colors.mutedText} /></TouchableOpacity>
                  </View>
                  <View style={styles.detailField}>
                    <Text style={styles.detailLabel}>Name</Text>
                    <Text style={styles.detailValue}>{selectedStaff.name}</Text>
                  </View>
                  <View style={styles.detailField}>
                    <Text style={styles.detailLabel}>Email</Text>
                    <Text style={styles.detailValue}>{selectedStaff.email}</Text>
                  </View>
                  <View style={styles.detailField}>
                    <Text style={styles.detailLabel}>Phone</Text>
                    <Text style={styles.detailValue}>{selectedStaff.phone}</Text>
                  </View>
                  <View style={styles.detailField}>
                    <Text style={styles.detailLabel}>Role</Text>
                    <View style={[styles.roleBadge, { backgroundColor: ROLE_COLORS[selectedStaff.role]?.bg || '#F3F4F6' }]}>
                      <Text style={[styles.roleBadgeText, { color: ROLE_COLORS[selectedStaff.role]?.text || '#6B7280' }]}>{selectedStaff.role}</Text>
                    </View>
                  </View>
                  <View style={styles.detailField}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <View style={selectedStaff.status === 'Active' ? styles.activeBadge : styles.inactiveBadge}>
                      <Text style={selectedStaff.status === 'Active' ? styles.activeBadgeText : styles.inactiveBadgeText}>{selectedStaff.status}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.addBtnSmall}><Text style={styles.addBtnSmallText}>Edit Profile</Text></TouchableOpacity>
                </View>
              )}
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
  scrollContent: { padding: spacing.xl, gap: spacing.lg, maxWidth: 1100, alignSelf: 'center', width: '100%' },
  headerLeft: { gap: 2 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.bgCard, paddingHorizontal: spacing.md, minWidth: 200, flex: 1 },
  searchInput: { flex: 1, paddingVertical: spacing.sm + 2, fontSize: 13, color: colors.navyText },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  filterChipText: { fontSize: 11, fontWeight: '600', color: colors.bodyText },
  filterChipTextActive: { color: colors.navyText },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  addBtnText: { fontSize: 12, fontWeight: '700', color: colors.navyText },
  addFormCard: { borderWidth: 1, borderColor: '#38BDF8', borderRadius: radius.lg, padding: spacing.lg, backgroundColor: '#EFF6FF', gap: spacing.sm },
  addFormGrid: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  addFormActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  addBtnSmall: { backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2 },
  addBtnSmallText: { fontSize: 12, fontWeight: '700', color: colors.navyText },
  typeChip: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, marginRight: spacing.xs },
  typeChipActive: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  typeChipText: { fontSize: 10, fontWeight: '600', color: colors.bodyText },
  typeChipTextActive: { color: colors.navyText },
  bulkBar: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, backgroundColor: '#EFF6FF', borderRadius: radius.lg, borderWidth: 1, borderColor: '#BFDBFE' },
  bulkText: { fontSize: 12, fontWeight: '600', color: '#0284C7' },
  tableAndDetail: { flexDirection: 'row', gap: spacing.lg },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 3 },
  checkboxOn: { backgroundColor: colors.skyAccent, borderColor: colors.skyAccent },
  roleBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  roleBadgeText: { fontSize: 10, fontWeight: '700' },
  activeBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  activeBadgeText: { fontSize: 10, fontWeight: '700', color: '#059669' },
  inactiveBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  inactiveBadgeText: { fontSize: 10, fontWeight: '700', color: '#6B7280' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  inlineInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs + 2, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  cancelBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  cancelBtnText: { fontSize: 12, fontWeight: '600', color: colors.bodyText },
  detailPanel: { width: 250, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.bgCard, gap: spacing.sm, alignSelf: 'flex-start' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailField: { gap: 2 },
  detailLabel: { fontSize: 11, color: colors.mutedText },
  detailValue: { fontSize: 13, fontWeight: '600', color: colors.navyText },
  footer: { alignItems: 'center', paddingVertical: spacing.xl },
  footerText: { fontSize: 12, color: colors.mutedText },
});
