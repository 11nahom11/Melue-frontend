import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
}

interface AdminSidebarProps {
  items: NavItem[];
  activeRoute: string;
  onNavigate: (route: string) => void;
  roleLabel: string;
  sectionLabel?: string;
}

export default function AdminSidebar({ items, activeRoute, onNavigate, roleLabel, sectionLabel }: AdminSidebarProps) {
  const { session, logout } = useAuth();
  return (
    <View style={s.sidebar}>
      <View style={s.brand}>
        <Image source={require('../../assets/logo.png')} style={s.logo} resizeMode="contain" />
        <View>
          <Text style={s.brandName}>MELU'E</Text>
          <Text style={s.brandSub}>Administration</Text>
        </View>
      </View>

      <View style={s.divider} />

      <Text style={s.sectionLabel}>{sectionLabel ?? 'NAVIGATION'}</Text>

      <View style={s.navItems}>
        {items.map((item) => {
          const active = item.route === activeRoute;
          return (
            <TouchableOpacity
              key={item.route}
              style={[s.navItem, active && s.navItemActive]}
              onPress={() => onNavigate(item.route)}
            >
              <Feather name={item.icon} size={15} color={active ? colors.navyText : '#D1D5DB'} />
              <Text style={[s.navText, active && s.navTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={s.spacer} />

      <View style={s.footer}>
        <View style={s.divider} />
        <View style={s.userBlock}>
          <Text style={s.userName}>{session?.userName ?? 'Administrator'}</Text>
          <Text style={s.userEmail}>{session?.email ?? ''}</Text>
          <Text style={s.userRole}>{roleLabel}</Text>
        </View>
        <TouchableOpacity style={s.signOutBtn} onPress={logout} accessibilityLabel="Sign out">
          <Feather name="log-out" size={14} color="#9CA3AF" />
          <Text style={s.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: colors.darkSurface,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  logo: { width: 36, height: 36, borderRadius: radius.sm },
  brandName: { fontSize: 12, fontWeight: '900', color: colors.primaryYellow, letterSpacing: 1, textTransform: 'uppercase' as const },
  brandSub: { fontSize: 11, fontWeight: '500', color: '#9CA3AF', marginTop: 1 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: spacing.md },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase' as const,
    letterSpacing: 1.2,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  navItems: { gap: spacing.xs },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 1,
  },
  navItemActive: { backgroundColor: colors.primaryYellow },
  navText: { fontSize: 13, fontWeight: '500', color: '#D1D5DB' },
  navTextActive: { color: colors.navyText, fontWeight: '600' },
  spacer: { flex: 1 },
  footer: { gap: spacing.xs },
  userBlock: { paddingHorizontal: spacing.sm, gap: 2 },
  userName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  userEmail: { fontSize: 11, color: '#9CA3AF' },
  userRole: { fontSize: 10, fontWeight: '700', color: colors.primaryYellow, textTransform: 'uppercase' as const, marginTop: spacing.xs },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  signOutText: { fontSize: 13, fontWeight: '500', color: '#9CA3AF' },
});
