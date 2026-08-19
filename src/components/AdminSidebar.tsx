// components/AdminSidebar.tsx
// Shared dark-navy sidebar for System Admin and Institutional Admin.
// Gemini-style: MELU'E branding, nav items with yellow active, user block.

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
}

export default function AdminSidebar({ items, activeRoute, onNavigate, roleLabel }: AdminSidebarProps) {
  const { session, logout } = useAuth();
  return (
    <View style={styles.sidebar}>
      <View style={styles.brandSection}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        <View>
          <Text style={styles.brandTitle}>MELU'E</Text>
          <Text style={styles.brandSubtitle}>Administration</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>SYSTEM CONFIGURATION</Text>

      <View style={styles.navItems}>
        {items.map((item) => {
          const active = item.route === activeRoute;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.navItem, active && styles.navItemActive]}
              onPress={() => onNavigate(item.route)}
            >
              <Feather name={item.icon} size={16} color={active ? colors.navyText : '#CBD5E1'} />
              <Text style={[styles.navItemText, active && styles.navItemTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.spacer} />

      <View style={styles.userBlock}>
        <Text style={styles.userName}>{session?.userName ?? 'Admin'}</Text>
        <Text style={styles.userEmail}>{session?.email ?? 'admin@melue.org'}</Text>
        <View style={styles.roleTag}>
          <Text style={styles.roleTagText}>{roleLabel}</Text>
        </View>
        <TouchableOpacity style={styles.signOutBtn} onPress={logout} accessibilityLabel="Sign out">
          <Feather name="log-out" size={14} color="#94A3B8" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: colors.navyText,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  logoImage: { width: 28, height: 28 },
  brandTitle: { fontSize: 17, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 },
  brandSubtitle: { fontSize: 12, fontWeight: '500', color: '#94A3B8', marginTop: 1 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
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
  navItemText: { fontSize: 13, fontWeight: '600', color: '#CBD5E1' },
  navItemTextActive: { color: colors.navyText, fontWeight: '700' },
  spacer: { flex: 1 },
  userBlock: { gap: 2, paddingHorizontal: spacing.sm },
  userName: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
  userEmail: { fontSize: 11, color: '#94A3B8' },
  roleTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryYellow,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.xs,
  },
  roleTagText: { fontSize: 9, fontWeight: '800', color: colors.navyText, letterSpacing: 0.5 },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm + 2,
    paddingVertical: spacing.xs,
  },
  signOutText: { fontSize: 12, fontWeight: '600', color: '#94A3B8' },
});
