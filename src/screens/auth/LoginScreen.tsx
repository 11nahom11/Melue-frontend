import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { useAuth, DEMO_ACCOUNTS, EXTRA_ROLES } from '../../context/AuthContext';
import type { DemoAccount } from '../../types';

const ALL_DEMO_ACCOUNTS: DemoAccount[] = [...DEMO_ACCOUNTS, ...EXTRA_ROLES];

const ROLE_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  system_admin: { bg: '#FEE2E2', text: '#DC2626' },
  sysadmin: { bg: '#FEE2E2', text: '#DC2626' },
  institutional_admin: { bg: '#FEF3C7', text: '#B45309' },
  director: { bg: '#E0E7FF', text: '#4338CA' },
  coordinator: { bg: '#EDE9FE', text: '#7C3AED' },
  program_director: { bg: '#EDE9FE', text: '#7C3AED' },
  teacher: { bg: '#DBEAFE', text: '#1D4ED8' },
  parent: { bg: '#D1FAE5', text: '#059669' },
};

export default function LoginScreen() {
  const { loginAsRole } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<{ Login: undefined; ForgotPassword: undefined }>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    setError('');
    const match = ALL_DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!match) {
      setError('Unknown demo account. Use one of the demo emails listed below (any password works).');
      return;
    }
    loginAsRole(match);
  };

  const handleDemoTap = (account: DemoAccount) => {
    setEmail(account.email);
    setError('');
    loginAsRole(account);
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.card}>
          <Image source={require('../../../assets/logo.png')} style={s.logo} resizeMode="contain" />
          <Text style={s.brandName}>Melu'e Foundation</Text>

          <Text style={typography.h1}>Sign In to Your Account</Text>
          <Text style={[typography.body, { textAlign: 'center', marginTop: -4 }]}>
            Melu'e Foundation Therapy Portal
          </Text>

          {error ? (
            <View style={s.errorBanner}>
              <Feather name="alert-circle" size={16} color="#DC2626" />
              <Text style={s.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={s.field}>
            <Text style={typography.label}>Email Address</Text>
            <View style={s.inputRow}>
              <Feather name="mail" size={16} color={colors.mutedText} />
              <TextInput
                style={s.input}
                placeholder="you@melue.org"
                placeholderTextColor={colors.mutedText}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
              />
            </View>
          </View>

          <View style={s.field}>
            <Text style={typography.label}>Password</Text>
            <View style={s.inputRow}>
              <Feather name="lock" size={16} color={colors.mutedText} />
              <TextInput
                style={s.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.mutedText}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={s.rowBetween}>
            <TouchableOpacity style={s.rememberRow} onPress={() => setRemember((r) => !r)}>
              <View style={[s.checkbox, remember && s.checkboxOn]}>
                {remember ? <Feather name="check" size={12} color="#FFFFFF" /> : null}
              </View>
              <Text style={typography.small}>Remember this device</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={s.forgotLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={s.signInBtn} onPress={handleSignIn} activeOpacity={0.8}>
            <Feather name="log-in" size={16} color={colors.navyText} />
            <Text style={s.signInText}>Sign In</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          <Text style={[typography.caption, { textAlign: 'center' }]}>Demo Accounts (any password)</Text>

          {ALL_DEMO_ACCOUNTS.map((account) => {
            const bc = ROLE_BADGE_COLORS[account.role] ?? { bg: '#F3F4F6', text: '#6B7280' };
            return (
              <TouchableOpacity key={account.role} style={s.demoRow} onPress={() => handleDemoTap(account)} activeOpacity={0.6}>
                <View style={s.demoLeft}>
                  <View style={[s.demoAvatar, { backgroundColor: bc.bg }]}>
                    <Text style={[s.demoAvatarText, { color: bc.text }]}>{account.label.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={typography.bodyBold}>{account.label}</Text>
                    <Text style={typography.caption}>{account.email}</Text>
                  </View>
                </View>
                <View style={[s.demoBadge, { backgroundColor: bc.bg }]}>
                  <Text style={[s.demoBadgeText, { color: bc.text }]}>{account.role.replace(/_/g, ' ')}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, minHeight: '100%' as any },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg + 4,
    padding: spacing.xl + 4,
    alignItems: 'center',
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  logo: { width: 56, height: 56 },
  brandName: { fontWeight: '800', fontSize: 14, color: colors.primaryYellow, letterSpacing: 0.5, marginBottom: spacing.xs },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  errorText: { flex: 1, fontSize: 13, color: '#991B1B' },
  field: { width: '100%', gap: spacing.xs },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.bgInput,
  },
  input: { flex: 1, paddingVertical: spacing.md, fontSize: 14, color: colors.navyText },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  checkbox: { width: 18, height: 18, borderWidth: 1.5, borderColor: colors.border, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: colors.navyText, borderColor: colors.navyText },
  forgotLink: { color: colors.skyAccent, fontWeight: '600', fontSize: 13 },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    width: '100%',
    backgroundColor: colors.primaryYellow,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  signInText: { fontWeight: '700', fontSize: 15, color: colors.navyText },
  divider: { width: '100%', height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  demoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  demoLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  demoAvatar: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  demoAvatarText: { fontSize: 13, fontWeight: '700' },
  demoBadge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  demoBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase' as const, letterSpacing: 0.3 },
});
