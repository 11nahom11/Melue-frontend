// api/directorApi.js
// Director role - assumed contract, no real backend.

import client from './sessionApi';

// SCR-DIR-001: Director Dashboard
export const getDirectorDashboard = () => client.get('/director/dashboard');

// SCR-DIR-002: Staff Scheduling (same operational data as SCR-TC-005, Director-level view)
export const getDirectorSchedule = (params) => client.get('/director/schedule', { params });
export const saveAssignment = (payload) => client.post('/director/schedule/assignments', payload);
export const removeAllAssignments = (blockId) => client.post(`/director/schedule/blocks/${blockId}/clear`);

// SCR-DIR-003: Goal Mastery Approval
export const getPendingMasteryApprovals = (params) => client.get('/director/mastery-approvals', { params });
export const getMasteryApprovalDetail = (goalId) => client.get(`/director/mastery-approvals/${goalId}`);
export const approveMastery = (goalId, payload) => client.post(`/director/mastery-approvals/${goalId}/approve`, payload);
export const rejectMastery = (goalId, payload) => client.post(`/director/mastery-approvals/${goalId}/reject`, payload);

// SCR-DIR-004: Parent Communication (Director View)
export const getDirectorConversations = (params) => client.get('/director/conversations', { params });
export const getDirectorConversationThread = (id) => client.get(`/director/conversations/${id}`);
export const sendDirectorMessage = (id, payload) => client.post(`/director/conversations/${id}/messages`, payload);
export const toggleConversationRead = (id, payload) => client.post(`/director/conversations/${id}/read-status`, payload);

// SCR-DIR-005: Reports & Oversight
export const getSessionReports = (params) => client.get('/director/reports/sessions', { params });
export const generateBiAnnualReport = (payload) => client.post('/director/reports/bi-annual', payload);
export const getFoundationOverview = () => client.get('/director/reports/foundation-overview');

// SCR-DIR-006: Student Progress Monitoring (Director View)
export const getDirectorStudentProgress = (studentId) => client.get(`/director/students/${studentId}/progress`);
