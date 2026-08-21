import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import type { SystemAdminStackParamList } from '../../../types';

const SIDEBAR_ITEMS = [
  { label: 'Staff Accounts', icon: 'users' as const, route: 'StaffAccountManagement' },
  { label: 'Role Management', icon: 'shield' as const, route: 'RoleManagement' },
  { label: 'Permissions', icon: 'lock' as const, route: 'PermissionConfiguration' },
  { label: 'Audit Log', icon: 'list' as const, route: 'AuditLog' },
];

interface SystemAdminSidebarProps {
  activeRoute: keyof SystemAdminStackParamList;
  onNavigate: (route: keyof SystemAdminStackParamList) => void;
  sectionLabel?: string;
}

export default function SystemAdminSidebar({ activeRoute, onNavigate, sectionLabel }: SystemAdminSidebarProps) {
  return (
    <AdminSidebar
      items={SIDEBAR_ITEMS}
      activeRoute={activeRoute}
      onNavigate={(r) => onNavigate(r as keyof SystemAdminStackParamList)}
      roleLabel="SYSADMIN"
      sectionLabel={sectionLabel}
    />
  );
}
