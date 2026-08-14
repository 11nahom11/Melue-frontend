// api/institutionalAdminApi.js
// Institutional Administrator role - assumed contract, no real backend.

import client from './sessionApi';

// SCR-ADMIN-001: Form Builder
export const getFormConfig = (formName) => client.get(`/admin/forms/${formName}`);
export const saveFormConfig = (formName, payload) => client.post(`/admin/forms/${formName}`, payload);
export const resetFormToDefault = (formName) => client.post(`/admin/forms/${formName}/reset`);

// SCR-ADMIN-002: Trial Logging Format
export const getTrialLoggingConfig = () => client.get('/admin/trial-logging-config');
export const saveTrialLoggingConfig = (payload) => client.post('/admin/trial-logging-config', payload);

// SCR-ADMIN-003: ABC Dropdown List Manager
export const getAbcLists = () => client.get('/admin/abc-lists');
export const saveAbcList = (listType, items) => client.post(`/admin/abc-lists/${listType}`, { items });
export const resetAbcListsToDefault = () => client.post('/admin/abc-lists/reset');

// SCR-ADMIN-004: Session Schedule & Capacity
export const getScheduleCapacityConfig = () => client.get('/admin/schedule-capacity-config');
export const saveScheduleCapacityConfig = (payload) => client.post('/admin/schedule-capacity-config', payload);

// SCR-ADMIN-005: Goal Domain Definitions
export const getGoalDomains = () => client.get('/admin/goal-domains');
export const saveGoalDomains = (domains) => client.post('/admin/goal-domains', { domains });

// SCR-ADMIN-006: Task Analysis Templates
export const getTaskAnalysisTemplates = () => client.get('/admin/task-analysis-templates');
export const saveTaskAnalysisTemplate = (templateId, payload) =>
  templateId
    ? client.patch(`/admin/task-analysis-templates/${templateId}`, payload)
    : client.post('/admin/task-analysis-templates', payload);
export const deleteTaskAnalysisTemplate = (templateId) => client.delete(`/admin/task-analysis-templates/${templateId}`);
