import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { InstitutionalAdminStackParamList } from '../../types';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import InstitutionalAdminNav from './components/InstitutionalAdminNav';
import InstitutionalAdminSidebar from './components/InstitutionalAdminSidebar';

interface ModuleItem {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
  spec: string;
  status: string;
}

const CLINICAL_MODULES: ModuleItem[] = [
  { key: 'forms', title: 'Form Builder', description: 'Enrollment Wizard, IUP, ABLLS form templates, field visibility & order.', icon: 'layout', route: 'FormBuilder', spec: 'SCR-ADMIN-001', status: 'Default template' },
  { key: 'trial', title: 'Trial Logging Format', description: 'Prompt levels, button colors, trial stream layout, mastery criteria.', icon: 'sliders', route: 'TrialLoggingFormat', spec: 'SCR-ADMIN-002', status: 'Default' },
  { key: 'abc', title: 'ABC Dropdown Lists', description: 'Behaviors, antecedents, consequences, locations, frequency & intensity options.', icon: 'list', route: 'AbcDropdownLists', spec: 'SCR-ADMIN-003', status: 'Default' },
  { key: 'schedule', title: 'Session Schedule & Capacity', description: 'Session times, block durations, staff-to-student capacity, draft expiry.', icon: 'clock', route: 'ScheduleCapacityConfig', spec: 'SCR-ADMIN-004', status: 'Configured' },
  { key: 'goals', title: 'Goal Domain Definitions', description: 'Goal domains used by the Goal Bank.', icon: 'target', route: 'GoalDomainDefinitions', spec: 'SCR-ADMIN-005', status: 'Default' },
  { key: 'task', title: 'Task Analysis Templates', description: 'Multi-step task analysis templates with mastery criteria.', icon: 'layers', route: 'TaskAnalysisTemplates', spec: 'SCR-ADMIN-006', status: 'Default' },
  { key: 'programs', title: 'Clinical Categories', description: 'Programs, assessment types, goal categories, therapy & behavior categories.', icon: 'folder', route: 'ClinicalCategoriesConfig', spec: 'SCR-ADMIN-007', status: 'Configured' },
  { key: 'clinic', title: 'Clinic Info', description: 'Organization name, logo, contact and system-wide form header settings.', icon: 'home', route: 'ClinicInfoConfig', spec: 'SCR-ADMIN-008', status: 'Configured' },
  { key: 'hours', title: 'Working Hours', description: 'Institution working hours and availability windows.', icon: 'sun', route: 'WorkingHoursConfig', spec: 'SCR-ADMIN-009', status: 'Configured' },
  { key: 'schools', title: 'School Settings', description: 'Affiliated schools and site-level configuration.', icon: 'book-open', route: 'SchoolSettingsConfig', spec: 'SCR-ADMIN-010', status: 'Default' },
];

type Props = NativeStackScreenProps<InstitutionalAdminStackParamList, 'InstitutionalAdminOverview'>;

export default function InstitutionalAdminOverviewScreen({ navigation }: Props) {
  const openModule = (routeName: string) => navigation.navigate(routeName as never);

  return (
    <SafeAreaView style={styles.safe}>
      <InstitutionalAdminNav activeTab="Admin Panel" onTabPress={(t) => navigation.navigate(t as never)} />

      <View style={styles.body}>
        <InstitutionalAdminSidebar activeRoute="InstitutionalAdminOverview" onNavigate={(route) => navigation.navigate(route)} />

        <View style={styles.contentArea}>
          <View style={styles.header}>
            <Feather name="clipboard" size={18} color={colors.navyText} />
            <View>
              <Text style={typography.h1}>Clinical Configuration</Text>
              <Text style={typography.caption}>Institutional configuration for {CLINICAL_MODULES.length} modules</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.grid}>
              {CLINICAL_MODULES.map((m) => (
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
