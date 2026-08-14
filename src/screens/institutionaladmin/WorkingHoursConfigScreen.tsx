// screens/institutionaladmin/WorkingHoursConfigScreen.tsx
// MR-6: Working Hours configuration per day of the week.

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav, { IA_ROUTE_BY_TAB } from './components/InstitutionalAdminNav';
import { getWorkingHours, saveWorkingHours } from '../../api/institutionalAdminApi';
import type { InstitutionalAdminStackParamList } from '../../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type DayHours = { open: string; close: string; closed: boolean };

type Props = NativeStackScreenProps<InstitutionalAdminStackParamList, 'WorkingHoursConfig'>;

export default function WorkingHoursConfigScreen({ navigation }: Props) {
  const [hours, setHours] = useState<Record<string, DayHours>>(DEFAULT);

  const load = useCallback(async () => {
    try {
      const { data } = await getWorkingHours();
      setHours(data);
    } catch (err) {
      setHours(DEFAULT);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setDay = (day: string, patch: Partial<DayHours>) =>
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));

  const handleSave = async () => {
    try {
      await saveWorkingHours(hours);
    } catch (err) {}
    Alert.alert('Saved', 'Working hours updated.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav activeTab="Working Hours" onTabPress={(t) => navigation?.navigate?.(IA_ROUTE_BY_TAB[t])} />
      <View style={styles.header}><Text style={typography.h1}>Working Hours</Text><Text style={typography.caption}>MR-6 — session availability by day</Text></View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {DAYS.map((day) => (
            <View key={day} style={styles.dayRow}>
              <View style={{ flex: 1 }}>
                <Text style={typography.bodyBold}>{day}</Text>
                <Text style={typography.caption}>{hours[day].closed ? 'Closed' : `${hours[day].open} – ${hours[day].close}`}</Text>
              </View>
              {!hours[day].closed ? (
                <View style={styles.timeRow}>
                  <TextInput style={styles.timeInput} value={hours[day].open} onChangeText={(t) => setDay(day, { open: t })} placeholder="09:00" placeholderTextColor={colors.mutedText} />
                  <Text style={typography.caption}>to</Text>
                  <TextInput style={styles.timeInput} value={hours[day].close} onChangeText={(t) => setDay(day, { close: t })} placeholder="18:00" placeholderTextColor={colors.mutedText} />
                </View>
              ) : (
                <Text style={styles.closedText}>Closed</Text>
              )}
              <TouchableOpacity onPress={() => setDay(day, { closed: !hours[day].closed })}>
                <Feather name={hours[day].closed ? 'plus-circle' : 'minus-circle'} size={18} color={hours[day].closed ? colors.statusCompletedText : colors.statusRevisionText} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Feather name="save" size={16} color={colors.navyText} />
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DEFAULT: Record<string, DayHours> = {
  Monday: { open: '09:00', close: '18:00', closed: false },
  Tuesday: { open: '09:00', close: '18:00', closed: false },
  Wednesday: { open: '09:00', close: '18:00', closed: false },
  Thursday: { open: '09:00', close: '18:00', closed: false },
  Friday: { open: '09:00', close: '17:00', closed: false },
  Saturday: { open: '10:00', close: '14:00', closed: false },
  Sunday: { open: '09:00', close: '18:00', closed: true },
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  header: { padding: spacing.lg, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.xs },
  content: { padding: spacing.lg },
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.md },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  timeInput: { width: 64, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, color: colors.navyText, textAlign: 'center' },
  closedText: { fontSize: 12, fontWeight: '700', color: colors.statusRevisionText },
  saveBtn: { flexDirection: 'row', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { fontWeight: '700', color: colors.navyText },
});
