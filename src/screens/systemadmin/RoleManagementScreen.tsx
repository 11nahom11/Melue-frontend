import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import SystemAdminNav from './components/SystemAdminNav';
import SystemAdminSidebar from './components/SystemAdminSidebar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SystemAdminStackParamList } from '../../types';

interface RoleRecord {
  id: string;
  name: string;
  description: string;
  count: number;
  system: boolean;
}

const DEMO_ROLES: RoleRecord[] = [
  { id: '1', name: 'teacher', description: 'Direct therapy provider', count: 8, system: true },
  { id: '2', name: 'coordinator', description: 'Coordinates caseloads and scheduling', count: 2, system: true },
  { id: '3', name: 'director', description: 'Clinical oversight and approval', count: 1, system: true },
  { id: '4', name: 'institutional_admin', description: 'Clinical configuration and management', count: 1, system: true },
  { id: '5', name: 'sysadmin', description: 'Full system access and configuration', count: 1, system: true },
];

export default function RoleManagementScreen({ navigation }: NativeStackScreenProps<SystemAdminStackParamList, 'RoleManagement'>) {
  const [roles, setRoles] = useState<RoleRecord[]>(DEMO_ROLES);
  const [addingRole, setAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const addRole = () => {
    if (!newRole.name.trim()) return;
    setRoles((rs) => [...rs, { id: String(Date.now()), ...newRole, count: 0, system: false }]);
    setNewRole({ name: '', description: '' });
    setAddingRole(false);
  };

  const deleteRole = (id: string) => {
    Alert.alert('Delete this role?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setRoles((rs) => rs.filter((r) => r.id !== id)) },
    ]);
  };

  const handleSave = () => Alert.alert('Changes saved');

  return (
    <SafeAreaView style={styles.safe}>
      <SystemAdminNav sectionTitle="Role Management" breadcrumb="System Configuration / Role Management" scrCode="SCR-SYS-002" />
      <View style={styles.body}>
        <SystemAdminSidebar activeRoute="RoleManagement" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="SYSTEM CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Role Management</Text>
              <Text style={typography.caption}>SCR-SYS-002 · Configure staff roles and their descriptions</Text>
            </View>

            {/* Roles Table */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={typography.h3}>Roles</Text>
                {!addingRole && (
                  <TouchableOpacity style={styles.addLink} onPress={() => setAddingRole(true)}>
                    <Feather name="plus" size={14} color={colors.skyDark} />
                    <Text style={styles.addLinkText}>Add Role</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.tableHeader}>
                <Text style={[styles.thCell, { flex: 1.5 }]}>Role Name</Text>
                <Text style={[styles.thCell, { flex: 2.5 }]}>Description</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Staff Count</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Type</Text>
                <Text style={[styles.thCell, { flex: 1 }]}>Actions</Text>
              </View>
              {roles.map((role) => (
                <View key={role.id} style={styles.tableRow}>
                  <Text style={[styles.tdCellText, { flex: 1.5, fontWeight: '700' }]}>{role.name}</Text>
                  <Text style={[styles.tdCellText, { flex: 2.5 }]} numberOfLines={1}>{role.description}</Text>
                  <Text style={[styles.tdCellText, { flex: 1 }]}>{role.count}</Text>
                  <View style={[styles.tdCell, { flex: 1 }]}>
                    {role.system ? (
                      <View style={styles.systemBadge}><Text style={styles.systemBadgeText}>System</Text></View>
                    ) : (
                      <View style={styles.customBadge}><Text style={styles.customBadgeText}>Custom</Text></View>
                    )}
                  </View>
                  <View style={[styles.tdCell, { flex: 1 }]}>
                    {!role.system && (
                      <TouchableOpacity onPress={() => deleteRole(role.id)}><Feather name="trash-2" size={15} color={colors.danger} /></TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
              {addingRole && (
                <View style={[styles.tableRow, { backgroundColor: '#EFF6FF' }]}>
                  <View style={[styles.tdCell, { flex: 1.5 }]}>
                    <TextInput style={styles.inlineInput} placeholder="Role name" placeholderTextColor={colors.mutedText} value={newRole.name} onChangeText={(v: string) => setNewRole((n) => ({ ...n, name: v }))} />
                  </View>
                  <View style={[styles.tdCell, { flex: 2.5 }]}>
                    <TextInput style={styles.inlineInput} placeholder="Description" placeholderTextColor={colors.mutedText} value={newRole.description} onChangeText={(v: string) => setNewRole((n) => ({ ...n, description: v }))} />
                  </View>
                  <Text style={[styles.tdCellText, { flex: 1 }]}>0</Text>
                  <View style={[styles.tdCell, { flex: 1 }]}><View style={styles.customBadge}><Text style={styles.customBadgeText}>Custom</Text></View></View>
                  <View style={[styles.tdCell, { flex: 1 }]}>
                    <View style={styles.actionRow}>
                      <TouchableOpacity onPress={addRole}><Feather name="check" size={16} color={colors.success} /></TouchableOpacity>
                      <TouchableOpacity onPress={() => setAddingRole(false)}><Feather name="x" size={16} color={colors.mutedText} /></TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Feather name="save" size={14} color={colors.navyText} />
              <Text style={styles.saveBtnText}>Save Changes</Text>
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.sm },
  thCell: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  tdCell: { paddingHorizontal: spacing.xs },
  tdCellText: { fontSize: 13, color: colors.navyText },
  systemBadge: { backgroundColor: colors.darkSurface, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  systemBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  customBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, alignSelf: 'flex-start' },
  customBadgeText: { fontSize: 10, fontWeight: '700', color: '#6B7280' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  inlineInput: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs + 2, fontSize: 12, color: colors.navyText, backgroundColor: colors.bgCard },
  addLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  addLinkText: { fontSize: 13, fontWeight: '600', color: colors.skyDark },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2, alignSelf: 'flex-start' },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
});
