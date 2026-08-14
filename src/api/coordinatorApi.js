// api/coordinatorApi.js
// Therapy Coordinator role - assumed contract, same disclaimer as
// sessionApi.js: no real backend, shapes are best guesses.

import client from './sessionApi'; // reuse the same configured axios instance

// SCR-TC-001: Dashboard
export const getCoordinatorDashboard = () => client.get('/coordinator/dashboard');

// SCR-TC-002: Live Session Monitoring
export const getActiveSessions = (params) => client.get('/coordinator/sessions/active', { params });
export const sendAlertToTeacher = (sessionId, payload) =>
  client.post(`/coordinator/sessions/${sessionId}/alert`, payload);
export const exportSessionLog = (params) => client.get('/coordinator/sessions/export', { params });

// SCR-TC-003: Session Summary Review
export const getPendingSummaries = (params) => client.get('/coordinator/summaries/pending', { params });
export const approveSummary = (summaryId, payload) =>
  client.post(`/coordinator/summaries/${summaryId}/approve`, payload);
export const requestSummaryChanges = (summaryId, payload) =>
  client.post(`/coordinator/summaries/${summaryId}/request-changes`, payload);
export const bulkApproveSummaries = (summaryIds) =>
  client.post('/coordinator/summaries/bulk-approve', { summaryIds });

// SCR-TC-004: Student Progress Monitoring
export const getStudentProgressOverview = (studentId) =>
  client.get(`/coordinator/students/${studentId}/progress`);
export const flagStudent = (studentId, payload) =>
  client.post(`/coordinator/students/${studentId}/flag`, payload);

// SCR-TC-005: Operational Management (also used by MR-38 scheduling)
export const getOperationalSchedule = (params) => client.get('/coordinator/schedule', { params });
export const getTeacherPerformanceMetrics = (params) => client.get('/coordinator/teachers/metrics', { params });

// SCR-TC-006: Parent Communication (Coordinator View)
export const getCoordinatorConversations = (params) => client.get('/coordinator/conversations', { params });
export const getConversationThread = (conversationId) =>
  client.get(`/coordinator/conversations/${conversationId}`);
export const sendCoordinatorMessage = (conversationId, payload) =>
  client.post(`/coordinator/conversations/${conversationId}/messages`, payload);
export const escalateConversation = (conversationId, payload) =>
  // payload: { to: 'program_director' | 'director', note }
  client.post(`/coordinator/conversations/${conversationId}/escalate`, payload);
export const markConversationResolved = (conversationId) =>
  client.post(`/coordinator/conversations/${conversationId}/resolve`);
