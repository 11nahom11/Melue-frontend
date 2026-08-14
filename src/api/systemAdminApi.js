// api/systemAdminApi.js
// System Administrator role - assumed contract, no real backend.

import client from './sessionApi';

// SCR-SYS-001: Staff Account Management
export const getStaffAccounts = (params) => client.get('/sysadmin/staff', { params });
export const createStaffAccount = (payload) => client.post('/sysadmin/staff', payload);
export const updateStaffAccount = (staffId, payload) => client.patch(`/sysadmin/staff/${staffId}`, payload);
export const resetStaffPassword = (staffId) => client.post(`/sysadmin/staff/${staffId}/reset-password`);
export const toggleStaffActive = (staffId, active) => client.post(`/sysadmin/staff/${staffId}/status`, { active });
export const bulkStaffAction = (staffIds, action) => client.post('/sysadmin/staff/bulk', { staffIds, action });

// SCR-SYS-002: Role Management
export const getRoles = () => client.get('/sysadmin/roles');
export const createRole = (payload) => client.post('/sysadmin/roles', payload);
export const updateRole = (roleId, payload) => client.patch(`/sysadmin/roles/${roleId}`, payload);
export const deleteRole = (roleId) => client.delete(`/sysadmin/roles/${roleId}`);

// SCR-SYS-003: Permission Configuration (RBAC)
export const getPermissionMatrix = (roleId) => client.get(`/sysadmin/roles/${roleId}/permissions`);
export const savePermissionMatrix = (roleId, matrix) => client.post(`/sysadmin/roles/${roleId}/permissions`, { matrix });
export const getPermissionAuditTrail = (roleId) => client.get(`/sysadmin/roles/${roleId}/permissions/audit`);
