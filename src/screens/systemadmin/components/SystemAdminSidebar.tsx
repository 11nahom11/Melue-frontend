// screens/systemadmin/components/SystemAdminSidebar.tsx
// Delegates to shared AdminSidebar with system admin nav items.

import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import type { SystemAdminStackParamList } from '../../../types';

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: 'grid' as const, route: 'SystemAdminOverview' },
  { label: 'Staff Accounts', icon: 'users' as const, route: 'StaffAccountManagement' },
  { label: 'Role Management', icon: 'shield' as const, route: 'RoleManagement' },
  { label: 'Permissions', icon: 'lock' as const, route: 'PermissionConfiguration' },
  { label: 'Audit Log', icon: 'list' as const, route: 'AuditLog' },
];

interface SystemAdminSidebarProps {
  activeRoute: keyof SystemAdminStackParamList;
  onNavigate: (route: keyof SystemAdminStackParamList) => void;
}

export default function SystemAdminSidebar({ activeRoute, onNavigate }: SystemAdminSidebarProps) {
  return (
    <AdminSidebar
      items={SIDEBAR_ITEMS}
      activeRoute={activeRoute}
      onNavigate={(r) => onNavigate(r as keyof SystemAdminStackParamList)}
      roleLabel="SYSADMIN"
    />
  );
}
