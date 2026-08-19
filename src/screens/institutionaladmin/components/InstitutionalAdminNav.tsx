// screens/institutionaladmin/components/InstitutionalAdminNav.tsx
// Gemini-style top bar: logo + Admin Panel pill on left, user + logout on right.

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { useAuth } from '../../../context/AuthContext';
import type { InstitutionalAdminStackParamList } from '../../../types';

export const IA_ROUTE_BY_TAB: Record<string, keyof InstitutionalAdminStackParamList> = {
  'Admin Panel': 'InstitutionalAdminOverview',
  Forms: 'FormBuilder',
  'Trial Logging': 'TrialLoggingFormat',
  'ABC Lists': 'AbcDropdownLists',
  Schedule: 'ScheduleCapacityConfig',
  'Goal Domains': 'GoalDomainDefinitions',
  'Task Analysis': 'TaskAnalysisTemplates',
  Programs: 'ClinicalCategoriesConfig',
  'Clinic Info': 'ClinicInfoConfig',
  'Working Hours': 'WorkingHoursConfig',
  Schools: 'SchoolSettingsConfig',
};

interface InstitutionalAdminNavProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

export default function InstitutionalAdminNav({ activeTab, onTabPress }: InstitutionalAdminNavProps) {
  const { session, logout } = useAuth();
  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        <View style={styles.logoBlock}>
          <Image source={require('../../../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.logo}>Melu'e Foundation</Text>
        </View>
        <TouchableOpacity style={styles.adminPill} onPress={() => onTabPress?.('Admin Panel')}>
          <Feather name="settings" size={13} color={colors.navyText} />
          <Text style={styles.adminPillText}>Admin Panel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <View style={styles.userBlock}>
          <View>
            <Text style={typography.bodyBold}>{session?.userName}</Text>
            <Text style={typography.caption}>Institutional Admin</Text>
          </View>
          <TouchableOpacity onPress={logout} accessibilityLabel="Log out">
            <Feather name="log-out" size={20} color={colors.navyText} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  right: { flexDirection: 'row', alignItems: 'center' },
  logoBlock: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoImage: { width: 28, height: 28 },
  logo: { fontWeight: '700', fontSize: 15, color: colors.navyText },
  adminPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primaryYellow,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  adminPillText: { fontWeight: '700', fontSize: 12, color: colors.navyText },
  userBlock: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
