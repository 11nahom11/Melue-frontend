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
  const initials = (session?.userName ?? 'A').charAt(0).toUpperCase();

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
              <Feather name={item.icon} size={16} color={active ? colors.navyText : '#CBD5E1'} />
              <Text style={[s.navText, active && s.navTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={s.spacer} />

      <View style={s.divider} />

      <View style={s.userBlock}>
        <View style={s.avatarRow}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.userName}>{session?.userName ?? 'Admin'}</Text>
            <Text style={s.userEmail}>{session?.email ?? 'admin@melue.org'}</Text>
          </View>
        </View>
        <View style={s.roleTag}>
          <Text style={s.roleTagText}>{roleLabel}</Text>
        </View>
        <TouchableOpacity style={s.signOutBtn} onPress={logout} accessibilityLabel="Sign out">
          <Feather name="log-out" size={14} color="#94A3B8" />
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
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  logo: { width: 28, height: 28 },
  brandName: { fontSize: 17, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 },
  brandSub: { fontSize: 12, fontWeight: '500', color: '#94A3B8', marginTop: 1 },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  navItems: { gap: spacing.xs },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  navItemActive: { backgroundColor: colors.primaryYellow },
  navText: { fontSize: 13, fontWeight: '600', color: '#CBD5E1' },
  navTextActive: { color: colors.navyText, fontWeight: '700' },
  spacer: { flex: 1 },
  userBlock: { gap: spacing.sm, paddingHorizontal: spacing.sm },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.skyAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  userName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  userEmail: { fontSize: 11, color: '#94A3B8' },
  roleTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryYellow,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  roleTagText: { fontSize: 9, fontWeight: '800', color: colors.navyText, letterSpacing: 0.5 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  signOutText: { fontSize: 12, fontWeight: '600', color: '#94A3B8' },
});
