import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SystemAdminStackParamList } from '../../types';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import SystemAdminNav from './components/SystemAdminNav';
import SystemAdminSidebar from './components/SystemAdminSidebar';

interface ModuleItem {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
  spec: string;
  status: string;
}

const SYSTEM_MODULES: ModuleItem[] = [
  { key: 'staff', title: 'Staff Account Management', description: 'Create, edit, activate/deactivate staff, reset passwords, teacher-student linking (SCR-008).', icon: 'users', route: 'StaffAccountManagement', spec: 'SCR-SYS-001', status: 'Configured' },
  { key: 'roles', title: 'Role Management', description: 'Manage system roles and role assignments.', icon: 'shield', route: 'RoleManagement', spec: 'SCR-SYS-002', status: 'Default' },
  { key: 'perms', title: 'Permission Configuration', description: 'Role-based permission matrix: CRUD + Approve across modules.', icon: 'key', route: 'PermissionConfiguration', spec: 'SCR-SYS-003', status: 'Default' },
  { key: 'audit', title: 'Audit Log', description: 'User activity and configuration change history.', icon: 'file-text', route: 'AuditLog', spec: 'SCR-SYS-004', status: 'Active' },
];

type Props = NativeStackScreenProps<SystemAdminStackParamList, 'SystemAdminOverview'>;

export default function SystemAdminOverviewScreen({ navigation }: Props) {
  const openModule = (routeName: string) => navigation.navigate(routeName as never);

  return (
    <SafeAreaView style={styles.safe}>
      <SystemAdminNav activeTab="Admin Panel" onTabPress={(t) => navigation.navigate(t as never)} />

      <View style={styles.body}>
        <SystemAdminSidebar activeRoute="SystemAdminOverview" onNavigate={(route) => navigation.navigate(route)} />

        <View style={styles.contentArea}>
          <View style={styles.header}>
            <Feather name="settings" size={18} color={colors.navyText} />
            <View>
              <Text style={typography.h1}>System Administration</Text>
              <Text style={typography.caption}>System and user configuration for {SYSTEM_MODULES.length} modules</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.grid}>
              {SYSTEM_MODULES.map((m) => (
                <TouchableOpacity key={m.key} style={styles.moduleCard} onPress={() => openModule(m.route)}>
                  <View style={styles.moduleIconWrap}>
                    <Feather name={m.icon} size={18} color={colors.navyText} />
                  </View>
                  <Text style={typography.bodyBold}>{m.title}</Text>
                  <Text style={typography.caption}>{m.spec}</Text>
                  <Text style={styles.moduleDesc}>{m.description}</Text>
                  <View style={styles.moduleFooter}>
                    <Text style={styles.moduleStatus}>{m.status}</Text>
                    <Feather name="chevron-right" size={14} color={colors.mutedText} />
                  </View>
                </TouchableOpacity>
              ))}
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
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border },
  scrollContent: { padding: spacing.lg, gap: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  moduleCard: { width: '48%', backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.xs, minHeight: 170 },
  moduleIconWrap: { width: 34, height: 34, borderRadius: radius.md, backgroundColor: colors.statusPendingBg, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  moduleDesc: { fontSize: 11, color: colors.mutedText, flex: 1 },
  moduleFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  moduleStatus: { fontSize: 10, fontWeight: '700', color: colors.bodyText, textTransform: 'uppercase' },
});
