import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../../theme/colors';
import { useAuth } from '../../../context/AuthContext';

interface SystemAdminNavProps {
  sectionTitle?: string;
  breadcrumb?: string;
  scrCode?: string;
}

export default function SystemAdminNav({ sectionTitle, breadcrumb, scrCode }: SystemAdminNavProps) {
  const { logout } = useAuth();
  return (
    <View style={s.wrap}>
      <View>
        <Text style={s.title}>{sectionTitle ?? 'Admin Panel'}</Text>
        <Text style={s.breadcrumb}>{breadcrumb ?? 'System Configuration'}</Text>
      </View>
      <View style={s.right}>
        {scrCode ? <View style={s.scrPill}><Text style={s.scrText}>{scrCode}</Text></View> : null}
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md + 2,
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shrink: 0,
  },
  title: { fontSize: 15, fontWeight: '600', color: colors.navyText },
  breadcrumb: { fontSize: 11, color: colors.mutedText, marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  scrPill: {
    backgroundColor: '#F3F4F6',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  scrText: { fontSize: 11, fontWeight: '600', color: '#6B7280', fontVariant: ['tabular-nums'] },
});
