import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import SystemAdminNav from './components/SystemAdminNav';
import SystemAdminSidebar from './components/SystemAdminSidebar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SystemAdminStackParamList } from '../../types';

const MODULES = ['Students / Enrollment', 'Assessments', 'IUP & Goals', 'Active Therapy', 'Reports', 'Staff', 'Admin'];
const ACTIONS = ['View', 'Create', 'Edit', 'Delete', 'Approve'];

const DEFAULT_MATRIX: Record<string, Record<string, Record<string, boolean>>> = {
  teacher: {
    'Students / Enrollment': { View: true, Create: false, Edit: false, Delete: false, Approve: false },
    Assessments: { View: true, Create: true, Edit: true, Delete: false, Approve: false },
    'IUP & Goals': { View: true, Create: false, Edit: false, Delete: false, Approve: false },
    'Active Therapy': { View: true, Create: true, Edit: true, Delete: false, Approve: false },
    Reports: { View: true, Create: false, Edit: false, Delete: false, Approve: false },
    Staff: { View: false, Create: false, Edit: false, Delete: false, Approve: false },
    Admin: { View: false, Create: false, Edit: false, Delete: false, Approve: false },
  },
  coordinator: {
    'Students / Enrollment': { View: true, Create: true, Edit: true, Delete: false, Approve: false },
    Assessments: { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    'IUP & Goals': { View: true, Create: true, Edit: true, Delete: false, Approve: false },
    'Active Therapy': { View: true, Create: true, Edit: true, Delete: false, Approve: false },
    Reports: { View: true, Create: true, Edit: false, Delete: false, Approve: false },
    Staff: { View: true, Create: false, Edit: false, Delete: false, Approve: false },
    Admin: { View: false, Create: false, Edit: false, Delete: false, Approve: false },
  },
  director: {
    'Students / Enrollment': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Assessments: { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    'IUP & Goals': { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    'Active Therapy': { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    Reports: { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    Staff: { View: true, Create: false, Edit: false, Delete: false, Approve: false },
    Admin: { View: false, Create: false, Edit: false, Delete: false, Approve: false },
  },
  institutional_admin: {
    'Students / Enrollment': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Assessments: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    'IUP & Goals': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    'Active Therapy': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Reports: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Staff: { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    Admin: { View: true, Create: true, Edit: true, Delete: false, Approve: false },
  },
  sysadmin: {
    'Students / Enrollment': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Assessments: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    'IUP & Goals': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    'Active Therapy': { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Reports: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Staff: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Admin: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
  },
};

export default function PermissionConfigurationScreen({ navigation }: NativeStackScreenProps<SystemAdminStackParamList, 'PermissionConfiguration'>) {
  const [selectedRole, setSelectedRole] = useState('teacher');
  const [permMatrix, setPermMatrix] = useState(DEFAULT_MATRIX);

  const currentPerms = permMatrix[selectedRole] ?? {};

  const togglePerm = (module: string, action: string) => {
    setPermMatrix((m) => ({
      ...m,
      [selectedRole]: {
        ...m[selectedRole],
        [module]: { ...m[selectedRole]?.[module], [action]: !m[selectedRole]?.[module]?.[action] },
      },
    }));
  };

  const setAllForModule = (module: string, val: boolean) => {
    setPermMatrix((m) => {
      const updated = { ...(m[selectedRole] ?? {}) };
      updated[module] = { View: val, Create: val, Edit: val, Delete: val, Approve: val };
      return { ...m, [selectedRole]: updated };
    });
  };

  const setAllForAction = (action: string, val: boolean) => {
    setPermMatrix((m) => {
      const updated = { ...(m[selectedRole] ?? {}) };
      MODULES.forEach((mod) => { updated[mod] = { ...updated[mod], [action]: val }; });
      return { ...m, [selectedRole]: updated };
    });
  };

  const setPreset = (preset: 'full' | 'readonly') => {
    setPermMatrix((m) => {
      const updated: Record<string, Record<string, boolean>> = {};
      MODULES.forEach((mod) => {
        updated[mod] = {};
        ACTIONS.forEach((act) => { updated[mod][act] = preset === 'full' || act === 'View'; });
      });
      return { ...m, [selectedRole]: updated };
    });
  };

  const permSummary = MODULES.map((mod) => {
    const allowed = ACTIONS.filter((a) => currentPerms[mod]?.[a]);
    if (!allowed.length) return null;
    return `Can ${allowed.join(', ').toLowerCase()} ${mod}`;
  }).filter(Boolean);

  return (
    <SafeAreaView style={styles.safe}>
      <SystemAdminNav sectionTitle="Permission Configuration" breadcrumb="System Configuration / Permission Configuration" scrCode="SCR-SYS-003" />
      <View style={styles.body}>
        <SystemAdminSidebar activeRoute="PermissionConfiguration" onNavigate={(r) => navigation?.navigate?.(r)} sectionLabel="SYSTEM CONFIGURATION" />
        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerLeft}>
              <Text style={typography.h1}>Permission Configuration</Text>
              <Text style={typography.caption}>SCR-SYS-003 · Define module access permissions per role</Text>
            </View>

            {/* Role Selector + Presets */}
            <View style={styles.controlsRow}>
              <View style={styles.roleChips}>
                {Object.keys(DEFAULT_MATRIX).map((r) => (
                  <TouchableOpacity key={r} style={[styles.roleChip, selectedRole === r && styles.roleChipActive]} onPress={() => setSelectedRole(r)}>
                    <Text style={[styles.roleChipText, selectedRole === r && styles.roleChipTextActive]}>{r.replace(/_/g, ' ')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.presetRow}>
                <TouchableOpacity style={styles.presetBtn} onPress={() => setPreset('full')}><Text style={styles.presetBtnText}>Full Access</Text></TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn} onPress={() => setPreset('readonly')}><Text style={styles.presetBtnText}>Read Only</Text></TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn}>
                  <Feather name="copy" size={13} color={colors.bodyText} />
                  <Text style={styles.presetBtnText}>Copy from Role...</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Permission Matrix */}
            <View style={styles.matrixCard}>
              <View style={styles.matrixHeader}>
                <Text style={[styles.matrixTh, { flex: 2 }]}>Module</Text>
                {ACTIONS.map((action) => (
                  <View key={action} style={[styles.matrixTh, { flex: 1, alignItems: 'center' }]}>
                    <Text style={styles.matrixThText}>{action}</Text>
                    <TouchableOpacity onPress={() => {
                      const allOn = MODULES.every((mod) => currentPerms[mod]?.[action]);
                      setAllForAction(action, !allOn);
                    }}>
                      <Feather name="check-square" size={12} color={colors.skyAccent} />
                    </TouchableOpacity>
                  </View>
                ))}
                <Text style={[styles.matrixTh, { flex: 0.7, textAlign: 'center' }]}>All</Text>
              </View>
              {MODULES.map((module) => {
                const allOn = ACTIONS.every((a) => currentPerms[module]?.[a]);
                return (
                  <View key={module} style={styles.matrixRow}>
                    <Text style={[styles.matrixModuleText, { flex: 2 }]}>{module}</Text>
                    {ACTIONS.map((action) => (
                      <TouchableOpacity key={action} style={[styles.matrixTd, { flex: 1 }]} onPress={() => togglePerm(module, action)}>
                        <View style={[styles.checkbox, currentPerms[module]?.[action] && styles.checkboxOn]} />
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={[styles.matrixTd, { flex: 0.7 }]} onPress={() => setAllForModule(module, !allOn)}>
                      <Feather name="check-square" size={14} color={allOn ? colors.skyAccent : colors.border} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            {/* Live Preview */}
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>Permission Summary — {selectedRole}</Text>
              {permSummary.length > 0 ? (
                <View style={styles.previewList}>
                  {permSummary.map((s, i) => (
                    <View key={i} style={styles.previewItem}>
                      <Feather name="check" size={14} color={colors.success} />
                      <Text style={styles.previewItemText}>{s}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.previewEmpty}>No permissions configured for this role.</Text>
              )}
            </View>

            <View style={styles.bottomRow}>
              <TouchableOpacity style={styles.saveBtn} onPress={() => Alert.alert('Permissions saved')}>
                <Feather name="save" size={14} color={colors.navyText} />
                <Text style={styles.saveBtnText}>Save Configuration</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.auditLink}>
                <Text style={styles.auditLinkText}>View Audit Trail</Text>
              </TouchableOpacity>
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
  scrollContent: { padding: spacing.xl, gap: spacing.lg, maxWidth: 900, alignSelf: 'center', width: '100%' },
  headerLeft: { gap: 2 },
  controlsRow: { gap: spacing.sm },
  roleChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  roleChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard },
  roleChipActive: { backgroundColor: colors.primaryYellow, borderColor: colors.primaryYellow },
  roleChipText: { fontSize: 12, fontWeight: '600', color: colors.bodyText },
  roleChipTextActive: { color: colors.navyText },
  presetRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  presetBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard },
  presetBtnText: { fontSize: 12, fontWeight: '600', color: colors.bodyText },
  matrixCard: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: 'hidden' },
  matrixHeader: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  matrixTh: { paddingHorizontal: spacing.xs },
  matrixThText: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 0.5 },
  matrixRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  matrixModuleText: { fontSize: 13, fontWeight: '600', color: colors.navyText },
  matrixTd: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xs },
  checkbox: { width: 18, height: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 4 },
  checkboxOn: { backgroundColor: colors.skyAccent, borderColor: colors.skyAccent },
  previewCard: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: '#F9FAFB', gap: spacing.sm },
  previewTitle: { fontSize: 10, fontWeight: '700', color: colors.mutedText, textTransform: 'uppercase', letterSpacing: 1 },
  previewList: { gap: spacing.xs },
  previewItem: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  previewItemText: { fontSize: 13, color: colors.navyText },
  previewEmpty: { fontSize: 13, color: colors.mutedText, fontStyle: 'italic' },
  bottomRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2 },
  saveBtnText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
  auditLink: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  auditLinkText: { fontSize: 13, fontWeight: '600', color: colors.skyDark, textDecorationLine: 'underline' },
});
