// api/parentApi.js
// Parent/Guardian role - assumed contract, no real backend.

import client from './sessionApi';

// SCR-PAR-001: Parent Dashboard
export const getParentDashboard = () => client.get('/parent/dashboard');

// SCR-PAR-002: Child Progress View
export const getChildProgress = (childId) => client.get(`/parent/children/${childId}/progress`);
export const getSessionSummaryForParent = (sessionId) => client.get(`/parent/sessions/${sessionId}/summary`);

// SCR-PAR-003: Home Observation Log
export const getObservations = (params) => client.get('/parent/observations', { params });
export const createObservation = (payload) => client.post('/parent/observations', payload);
export const getRequestedLogs = () => client.get('/parent/observations/requested');

// SCR-PAR-004: Parent Communication
export const getParentConversations = () => client.get('/parent/conversations');
export const getParentConversationThread = (id) => client.get(`/parent/conversations/${id}`);
export const sendParentMessage = (id, payload) => client.post(`/parent/conversations/${id}/messages`, payload);
