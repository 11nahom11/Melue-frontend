import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../../theme/colors';
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
  sectionTitle?: string;
}

export default function InstitutionalAdminNav({ activeTab, onTabPress, sectionTitle }: InstitutionalAdminNavProps) {
  const { session, logout } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <View style={s.wrap}>
      <View style={s.left}>
        <TouchableOpacity style={s.menuBtn}>
          <Feather name="menu" size={20} color={colors.navyText} />
        </TouchableOpacity>
        <Image source={require('../../../../assets/logo.png')} style={s.logo} resizeMode="contain" />
        <View>
          <Text style={s.title}>Melu'e Foundation</Text>
          <Text style={s.breadcrumb}>{sectionTitle ?? 'Institutional Admin'}</Text>
        </View>
      </View>
      <View style={s.right}>
        <Text style={s.clock}>{timeStr}</Text>
        <TouchableOpacity style={s.bellBtn}>
          <Feather name="bell" size={18} color={colors.navyText} />
          <View style={s.bellDot} />
        </TouchableOpacity>
        <View style={s.userBlock}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{(session?.userName ?? 'A').charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={s.userName}>{session?.userName}</Text>
            <Text style={s.userRole}>Institutional Admin</Text>
          </View>
        </View>
        <TouchableOpacity onPress={logout} accessibilityLabel="Log out">
          <Feather name="log-out" size={18} color={colors.mutedText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  right: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  menuBtn: { padding: spacing.xs },
  logo: { width: 28, height: 28 },
  title: { fontWeight: '700', fontSize: 15, color: colors.navyText },
  breadcrumb: { fontSize: 12, color: colors.mutedText },
  clock: { fontSize: 12, fontWeight: '600', color: colors.mutedText, fontVariant: ['tabular-nums'] },
  bellBtn: { position: 'relative', padding: spacing.xs },
  bellDot: {
    position: 'absolute', top: 6, right: 6,
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger,
  },
  userBlock: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.skyAccent, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  userName: { fontSize: 13, fontWeight: '600', color: colors.navyText },
  userRole: { fontSize: 11, color: colors.mutedText },
});
