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

export default function LoginScreen() {
  const { loginAsRole } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<{ Login: undefined; ForgotPassword: undefined }>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    const match = ALL_DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!match) {
      setError('Invalid email or password');
      return;
    }
    loginAsRole(match);
  };

  const handleDemoTap = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword('demo');
    setError('');
    loginAsRole(account);
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.card}>
          <View style={s.logoWrap}>
            <Image source={require('../../../assets/logo.png')} style={s.logo} resizeMode="contain" />
          </View>

          <Text style={typography.h1}>Sign In to Your Account</Text>
          <Text style={[typography.small, { textAlign: 'center', color: colors.bodyText, marginBottom: spacing.sm }]}>
            Melu'e Foundation Therapy Portal
          </Text>

          {error ? (
            <View style={s.errorBanner}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={s.field}>
            <Text style={s.fieldLabel}>Email Address</Text>
            <View style={s.inputRow}>
              <Feather name="mail" size={18} color="#9CA3AF" style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="you@melue.org"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(t: string) => { setEmail(t); setError(''); }}
              />
            </View>
          </View>

          <View style={s.field}>
            <Text style={s.fieldLabel}>Password</Text>
            <View style={s.inputRow}>
              <Feather name="lock" size={18} color="#9CA3AF" style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={s.rowBetween}>
            <TouchableOpacity style={s.rememberRow} onPress={() => setRemember((r) => !r)}>
              <View style={[s.checkbox, remember && s.checkboxOn]} />
              <Text style={s.fieldLabel}>Remember this device</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={s.forgotLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={s.signInBtn} onPress={handleSignIn} activeOpacity={0.8}>
            <Text style={s.signInText}>Sign In</Text>
          </TouchableOpacity>

          <View style={s.divider} />

          <Text style={s.demoLabel}>Demo Accounts (any password)</Text>
          <View style={s.demoGrid}>
            {ALL_DEMO_ACCOUNTS.map((account) => (
              <TouchableOpacity key={account.role} style={s.demoRow} onPress={() => handleDemoTap(account)} activeOpacity={0.6}>
                <Text style={s.demoName}>{account.label}</Text>
                <Text style={s.demoEmail}>{account.email}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg + 2,
    padding: spacing.xl + 4,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  logoWrap: { alignItems: 'center', marginBottom: spacing.sm },
  logo: { width: 64, height: 64 },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  errorText: { fontSize: 13, color: '#991B1B' },
  field: { gap: spacing.xs },
  fieldLabel: { fontSize: 13, fontWeight: '500', color: '#374151' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },
  inputIcon: { position: 'absolute', left: 12 },
  input: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 14,
    color: colors.navyText,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  checkbox: { width: 16, height: 16, borderWidth: 1.5, borderColor: '#D1D5DB', borderRadius: 4 },
  checkboxOn: { backgroundColor: colors.skyAccent, borderColor: colors.skyAccent },
  forgotLink: { fontSize: 13, fontWeight: '500', color: colors.skyAccent },
  signInBtn: {
    backgroundColor: colors.primaryYellow,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  signInText: { fontSize: 14, fontWeight: '500', color: '#111827' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginTop: spacing.sm },
  demoLabel: { fontSize: 11, fontWeight: '600', color: '#4B5563', textAlign: 'center', marginBottom: spacing.xs },
  demoGrid: { gap: 2 },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  demoName: { fontSize: 12, fontWeight: '500', color: '#374151' },
  demoEmail: { fontSize: 12, color: '#9CA3AF' },
});
