// screens/systemadmin/RoleManagementScreen.js
// SCR-SYS-002: Role Management

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import SystemAdminNav from './components/SystemAdminNav';
import SystemAdminSidebar from './components/SystemAdminSidebar';
import { getRoles, createRole, updateRole, deleteRole } from '../../api/systemAdminApi';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SystemAdminStackParamList } from '../../types';

interface RoleRecord {
  id: string;
  name: string;
  description: string;
  staffCount: number;
  isSystemRole: boolean;
}

type RolePayload = {
  id?: string;
  name: string;
  description: string;
};

interface RoleFormModalProps {
  visible: boolean;
  role: RoleRecord | null | undefined;
  onClose: () => void;
  onSave: (payload: RolePayload) => void;
}

function RoleFormModal({ visible, role, onClose, onSave }: RoleFormModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (role) { setName(role.name); setDescription(role.description); }
    else { setName(''); setDescription(''); }
  }, [role, visible]);
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalSheet}>
          <Text style={typography.h3}>{role ? 'Edit Role' : 'New Role'}</Text>
          <View style={styles.field}><Text style={typography.label}>Role Name</Text><TextInput style={styles.textInput} value={name} onChangeText={setName} /></View>
          <View style={styles.field}><Text style={typography.label}>Description</Text><TextInput style={[styles.textInput, styles.textArea]} multiline value={description} onChangeText={setDescription} /></View>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}><Text style={styles.cancelBtnText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => { if (!name.trim()) { Alert.alert('Name required'); return; } onSave({ id: role?.id, name, description }); }}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function RoleManagementScreen({ navigation }: NativeStackScreenProps<SystemAdminStackParamList, 'RoleManagement'>) {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [formTarget, setFormTarget] = useState<RoleRecord | null | undefined>(undefined);

  const load = useCallback(async () => {
    try {
      const { data } = await getRoles();
      setRoles(data);
    } catch (err) {
      setRoles(DEMO_ROLES);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (payload: RolePayload) => {
    try {
      if (payload.id) { await updateRole(payload.id, payload); setRoles((prev) => prev.map((r) => (r.id === payload.id ? { ...r, ...payload, id: r.id } : r))); }
      else { const { data } = await createRole(payload); setRoles((prev) => [...prev, data]); }
    } catch (err) {
      if (payload.id) setRoles((prev) => prev.map((r) => (r.id === payload.id ? { ...r, ...payload, id: r.id } : r)));
      else setRoles((prev) => [...prev, { ...payload, id: `local-${Date.now()}`, staffCount: 0, isSystemRole: false }]);
    }
    setFormTarget(undefined);
  };

  const handleDelete = (role: RoleRecord) => {
    if (role.staffCount > 0) { Alert.alert('Cannot delete', 'This role is assigned to active staff.'); return; }
    if (role.isSystemRole) { Alert.alert('Cannot delete', 'System roles cannot be deleted.'); return; }
    Alert.alert(`Delete "${role.name}"?`, undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { try { await deleteRole(role.id); } catch (err) {} setRoles((prev) => prev.filter((r) => r.id !== role.id)); } },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SystemAdminNav sectionTitle="Role Management" breadcrumb="System Configuration / Role Management" scrCode="SCR-SYS-002" />
      <View style={styles.body}>
        <SystemAdminSidebar activeRoute="RoleManagement" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="SYSTEM CONFIGURATION" />
        <View style={styles.contentArea}>
          <View style={styles.header}>
            <Text style={typography.h1}>Role Management</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => setFormTarget(null)}>
              <Feather name="plus" size={14} color={colors.navyText} />
              <Text style={styles.addBtnText}>Add Role</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
        {roles.map((r) => (
          <View key={r.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={styles.rowHeaderRow}>
                <Text style={typography.bodyBold}>{r.name}</Text>
                {r.isSystemRole && <View style={styles.systemBadge}><Text style={styles.systemBadgeText}>System Role</Text></View>}
              </View>
              <Text style={typography.caption}>{r.description}</Text>
              <Text style={typography.caption}>{r.staffCount} staff assigned</Text>
            </View>
            <View style={styles.rowActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => setFormTarget(r)}><Feather name="edit-2" size={14} color={colors.navyText} /></TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => handleDelete(r)}><Feather name="trash-2" size={14} color="#EF4444" /></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
        </View>
      </View>

      <RoleFormModal visible={formTarget !== undefined} role={formTarget} onClose={() => setFormTarget(undefined)} onSave={handleSave} />
    </SafeAreaView>
  );
}

const DEMO_ROLES: RoleRecord[] = [
  { id: 'r1', name: 'Teacher', description: 'Daily therapy session delivery.', staffCount: 3, isSystemRole: true },
  { id: 'r2', name: 'Coordinator', description: 'Operational oversight and scheduling.', staffCount: 1, isSystemRole: true },
  { id: 'r3', name: 'Director', description: 'Foundation-wide oversight and approvals.', staffCount: 1, isSystemRole: true },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  body: { flex: 1, flexDirection: 'row' },
  contentArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  addBtn: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center', backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  addBtnText: { fontWeight: '700', color: colors.navyText, fontSize: 12 },
  content: { padding: spacing.lg, gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  rowHeaderRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  systemBadge: { backgroundColor: colors.statusInProgressBg, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill },
  systemBadgeText: { fontSize: 10, fontWeight: '700', color: colors.statusInProgressText },
  rowActions: { flexDirection: 'row', gap: spacing.xs },
  iconBtn: { width: 30, height: 30, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: spacing.lg },
  modalSheet: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md },
  field: { gap: spacing.xs },
  textInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, color: colors.navyText },
  textArea: { minHeight: 60, textAlignVertical: 'top' },
  modalFooter: { flexDirection: 'row', gap: spacing.sm },
  cancelBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  cancelBtnText: { fontWeight: '600', color: colors.navyText },
  saveBtn: { flex: 1, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  saveBtnText: { fontWeight: '700', color: colors.navyText },
});
