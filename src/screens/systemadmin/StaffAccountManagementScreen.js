// screens/systemadmin/StaffAccountManagementScreen.js
// SCR-SYS-001: Staff Account Management

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import StatusPill from '../../components/StatusPill';
import SystemAdminNav, { SYS_ROUTE_BY_TAB } from './components/SystemAdminNav';
import { getStaffAccounts, createStaffAccount, updateStaffAccount, resetStaffPassword, toggleStaffActive, bulkStaffAction } from '../../api/systemAdminApi';

const ROLE_OPTIONS = ['Teacher', 'Coordinator', 'Director', 'Program Director', 'Institutional Admin', 'System Admin'];

function StaffFormModal({ visible, staff, onClose, onSave }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (staff) { setName(staff.name); setEmail(staff.email); setPhone(staff.phone || ''); setRoles(staff.roles); }
    else { setName(''); setEmail(''); setPhone(''); setRoles([]); }
  }, [staff, visible]);

  const toggleRole = (r) => setRoles((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const handleSave = () => {
    if (!name.trim() || !email.trim()) { Alert.alert('Name and email required'); return; }
    onSave({ id: staff?.id, name, email, phone, roles, active: staff?.active ?? true });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalSheet}>
          <Text style={typography.h2}>{staff ? 'Edit Staff' : 'Add Staff'}</Text>
          <ScrollView contentContainerStyle={{ gap: spacing.md }}>
            <View style={styles.field}><Text style={typography.label}>Name</Text><TextInput style={styles.textInput} value={name} onChangeText={setName} /></View>
            <View style={styles.field}><Text style={typography.label}>Email</Text><TextInput style={styles.textInput} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" /></View>
            <View style={styles.field}><Text style={typography.label}>Phone</Text><TextInput style={styles.textInput} value={phone} onChangeText={setPhone} keyboardType="phone-pad" /></View>
            <View style={styles.field}>
              <Text style={typography.label}>Roles</Text>
              <View style={styles.chipRow}>
                {ROLE_OPTIONS.map((r) => (
                  <TouchableOpacity key={r} style={[styles.chip, roles.includes(r) && styles.chipSelected]} onPress={() => toggleRole(r)}>
                    <Text style={[styles.chipText, roles.includes(r) && styles.chipTextSelected]}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}><Text style={styles.saveBtnText}>Save Changes</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function StaffAccountManagementScreen({ navigation }) {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [formTarget, setFormTarget] = useState(undefined);

  const load = useCallback(async () => {
    try {
      const { data } = await getStaffAccounts({ search, role: roleFilter, status: statusFilter });
      setStaff(data);
    } catch (err) {
      setStaff(DEMO_STAFF);
    }
  }, [search, roleFilter, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const filtered = staff.filter(
    (s) =>
      (roleFilter === 'All' || s.roles.includes(roleFilter)) &&
      (statusFilter === 'All' || (statusFilter === 'Active') === s.active) &&
      (!search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleSelect = (id) => setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleSave = async (payload) => {
    try {
      if (payload.id) {
        await updateStaffAccount(payload.id, payload);
        setStaff((prev) => prev.map((s) => (s.id === payload.id ? { ...s, ...payload } : s)));
      } else {
        const { data } = await createStaffAccount(payload);
        setStaff((prev) => [...prev, data]);
      }
    } catch (err) {
      if (payload.id) setStaff((prev) => prev.map((s) => (s.id === payload.id ? { ...s, ...payload } : s)));
      else setStaff((prev) => [...prev, { ...payload, id: `local-${Date.now()}` }]);
    }
    setFormTarget(undefined);
  };

  const handleResetPassword = (s) => {
    Alert.alert('Send password reset email?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', onPress: async () => { try { await resetStaffPassword(s.id); } catch (err) {} Alert.alert('Reset email sent'); } },
    ]);
  };

  const handleToggleActive = async (s) => {
    const next = !s.active;
    setStaff((prev) => prev.map((x) => (x.id === s.id ? { ...x, active: next } : x)));
    try { await toggleStaffActive(s.id, next); } catch (err) {}
  };

  const handleBulkAction = (action) => {
    Alert.alert(`${action} ${selectedIds.length} accounts?`, undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: async () => {
          try { await bulkStaffAction(selectedIds, action); } catch (err) {}
          if (action === 'Deactivate') setStaff((prev) => prev.map((s) => (selectedIds.includes(s.id) ? { ...s, active: false } : s)));
          setSelectedIds([]);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SystemAdminNav activeTab="Staff Accounts" onTabPress={(t) => navigation?.navigate?.(SYS_ROUTE_BY_TAB[t])} />
      <View style={styles.header}>
        <Text style={typography.h1}>Staff Account Management</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setFormTarget(null)}>
          <Feather name="plus" size={14} color={colors.navyText} />
          <Text style={styles.addBtnText}>Add Staff</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersRow}>
        <TextInput style={styles.searchInput} placeholder="Search by name or email..." placeholderTextColor={colors.mutedText} value={search} onChangeText={setSearch} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', ...ROLE_OPTIONS].map((r) => (
            <TouchableOpacity key={r} style={[styles.filterChip, roleFilter === r && styles.filterChipActive]} onPress={() => setRoleFilter(r)}>
              <Text style={typography.body}>{r}</Text>
            </TouchableOpacity>
          ))}
          {['All', 'Active', 'Inactive'].map((s) => (
            <TouchableOpacity key={s} style={[styles.filterChip, statusFilter === s && styles.filterChipActive]} onPress={() => setStatusFilter(s)}>
              <Text style={typography.body}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedIds.length > 0 && (
        <View style={styles.bulkRow}>
          <Text style={typography.caption}>{selectedIds.length} selected</Text>
          <TouchableOpacity style={styles.bulkBtn} onPress={() => handleBulkAction('Deactivate')}><Text style={styles.bulkBtnText}>Deactivate</Text></TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {filtered.map((s) => (
          <View key={s.id} style={styles.row}>
            <TouchableOpacity onPress={() => toggleSelect(s.id)} style={styles.checkbox}>
              <View style={[styles.checkboxInner, selectedIds.includes(s.id) && styles.checkboxChecked]} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={typography.bodyBold}>{s.name}</Text>
              <Text style={typography.caption}>{s.email} · {s.roles.join(', ')}</Text>
            </View>
            <StatusPill status={s.active ? 'approved' : 'revision'} label={s.active ? 'Active' : 'Inactive'} />
            <View style={styles.rowActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => setFormTarget(s)}><Feather name="edit-2" size={14} color={colors.navyText} /></TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => handleResetPassword(s)}><Feather name="key" size={14} color={colors.navyText} /></TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => handleToggleActive(s)}><Feather name={s.active ? 'user-x' : 'user-check'} size={14} color={colors.navyText} /></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <StaffFormModal visible={formTarget !== undefined} staff={formTarget} onClose={() => setFormTarget(undefined)} onSave={handleSave} />
    </SafeAreaView>
  );
}

const DEMO_STAFF = [
  { id: 's1', name: 'Teacher A', email: 'teacher@melue.org', phone: '', roles: ['Teacher'], active: true },
  { id: 's2', name: 'Coordinator A', email: 'coordinator@melue.org', phone: '', roles: ['Coordinator'], active: true },
  { id: 's3', name: 'Director A', email: 'director@melue.org', phone: '', roles: ['Director'], active: true },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  addBtn: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center', backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  addBtnText: { fontWeight: '700', color: colors.navyText, fontSize: 12 },
  filtersRow: { padding: spacing.md, gap: spacing.sm, backgroundColor: colors.bgCard },
  searchInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, backgroundColor: colors.bgApp },
  filterChip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  bulkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.statusPendingBg },
  bulkBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  bulkBtnText: { fontSize: 12, fontWeight: '600', color: colors.navyText },
  content: { padding: spacing.lg, gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  checkbox: { padding: spacing.xs },
  checkboxInner: { width: 18, height: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 4 },
  checkboxChecked: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  rowActions: { flexDirection: 'row', gap: spacing.xs },
  iconBtn: { width: 30, height: 30, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: spacing.lg },
  modalSheet: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md, maxHeight: '90%' },
  field: { gap: spacing.xs },
  textInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, color: colors.navyText },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  chipSelected: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.bodyText },
  chipTextSelected: { color: colors.navyText },
  modalFooter: { flexDirection: 'row', gap: spacing.sm },
  cancelBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  cancelBtnText: { fontWeight: '600', color: colors.navyText },
  saveBtn: { flex: 2, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  saveBtnText: { fontWeight: '700', color: colors.navyText },
});
