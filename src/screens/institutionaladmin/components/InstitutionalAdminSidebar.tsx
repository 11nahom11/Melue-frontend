// screens/institutionaladmin/components/InstitutionalAdminSidebar.tsx
// Delegates to shared AdminSidebar with institutional admin nav items.

import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import type { InstitutionalAdminStackParamList } from '../../../types';

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: 'grid' as const, route: 'InstitutionalAdminOverview' },
  { label: 'Form Builder', icon: 'file-text' as const, route: 'FormBuilder' },
  { label: 'Trial Logging', icon: 'layers' as const, route: 'TrialLoggingFormat' },
  { label: 'ABC Dropdowns', icon: 'list' as const, route: 'AbcDropdownLists' },
  { label: 'Session Schedule', icon: 'calendar' as const, route: 'ScheduleCapacityConfig' },
  { label: 'Goal Domains', icon: 'target' as const, route: 'GoalDomainDefinitions' },
  { label: 'Task Analysis', icon: 'check-square' as const, route: 'TaskAnalysisTemplates' },
  { label: 'Clinical Categories', icon: 'folder' as const, route: 'ClinicalCategoriesConfig' },
  { label: 'Clinic Info', icon: 'info' as const, route: 'ClinicInfoConfig' },
  { label: 'Working Hours', icon: 'clock' as const, route: 'WorkingHoursConfig' },
  { label: 'School Settings', icon: 'book-open' as const, route: 'SchoolSettingsConfig' },
];

interface InstitutionalAdminSidebarProps {
  activeRoute: keyof InstitutionalAdminStackParamList;
  onNavigate: (route: keyof InstitutionalAdminStackParamList) => void;
}

export default function InstitutionalAdminSidebar({ activeRoute, onNavigate }: InstitutionalAdminSidebarProps) {
  return (
    <AdminSidebar
      items={SIDEBAR_ITEMS}
      activeRoute={activeRoute}
      onNavigate={(r) => onNavigate(r as keyof InstitutionalAdminStackParamList)}
      roleLabel="INSTITUTIONAL_ADMIN"
    />
  );
}
