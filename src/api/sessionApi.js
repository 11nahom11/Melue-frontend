// api/sessionApi.js
//
// ASSUMED backend contract, based on the Academics::Session / Room / TimeBlock
// pattern from the backend reference repo (conflict-checking, time_blocks,
// nested associations). Field names below are BEST GUESSES until the
// backend team confirms real routes/serializers for the therapy domain.
// Swap BASE_URL and confirm each path/shape with backend before relying on this.

import axios from 'axios';

const BASE_URL = 'https://REPLACE_WITH_REAL_API_HOST/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Attach auth token to every request (token comes from your auth/login flow)
export function setAuthToken(token) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// ---- MR-39: Appointment & Session Management ----
// Per issues doc: full lifecycle - Create, Edit, Cancel, Reschedule, Mark
// Completed, Mark Missed. Status enum: Scheduled, Confirmed, Checked In,
// In Progress, Completed, Cancelled, No Show.
export const getTodaysSchedule = (therapistId) =>
  client.get(`/therapists/${therapistId}/sessions/today`);

export const getAppointments = (params) =>
  // params: { therapistId, startDate, endDate, status }
  client.get('/appointments', { params });

export const getAppointmentDetail = (appointmentId) =>
  client.get(`/appointments/${appointmentId}`);

export const createAppointment = (payload) =>
  // payload: { studentIds[], therapistId, roomId, date, startTime, endTime, stationName }
  client.post('/appointments', payload);

export const updateAppointment = (appointmentId, payload) =>
  client.patch(`/appointments/${appointmentId}`, payload);

export const cancelAppointment = (appointmentId, payload) =>
  client.post(`/appointments/${appointmentId}/cancel`, payload);

export const rescheduleAppointment = (appointmentId, payload) =>
  // payload: { date, startTime, endTime }
  client.post(`/appointments/${appointmentId}/reschedule`, payload);

export const markAppointmentStatus = (appointmentId, status) =>
  // status: 'confirmed' | 'checked_in' | 'in_progress' | 'completed' | 'no_show'
  client.post(`/appointments/${appointmentId}/status`, { status });

// ---- MR-33: Session Data Collection ----
export const startSession = (sessionId) =>
  client.post(`/sessions/${sessionId}/start`);

export const getSessionRoster = (sessionId) =>
  // returns students + their goals for this session
  client.get(`/sessions/${sessionId}/roster`);

export const logTrial = (sessionId, studentId, goalId, payload) =>
  // payload: { promptLevel: 'FP' | 'PP' | 'G' | 'INDEPENDENT', timestamp }
  client.post(`/sessions/${sessionId}/students/${studentId}/goals/${goalId}/trials`, payload);

export const recordIncident = (sessionId, studentId, payload) =>
  client.post(`/sessions/${sessionId}/students/${studentId}/incidents`, payload);

export const requestMasteryCheck = (sessionId, studentId, goalId) =>
  client.post(`/sessions/${sessionId}/students/${studentId}/goals/${goalId}/mastery-check`);

// SCR-004: Goal Mastery Check Screen (Two-Teacher Generalization Check)
export const getGoalMasteryCheck = (studentId, goalId) =>
  client.get(`/students/${studentId}/goals/${goalId}/mastery-check`);

export const submitGoalMasteryCheck = (studentId, goalId, payload) =>
  // payload: { teacherB: {outcome, promptUsed, notes}, teacherC: {outcome, promptUsed, notes} }
  client.post(`/students/${studentId}/goals/${goalId}/mastery-check/submit`, payload);

export const swapStudents = (sessionId, payload) =>
  client.post(`/sessions/${sessionId}/swap-students`, payload);

export const submitSessionSummary = (sessionId, payload) =>
  client.post(`/sessions/${sessionId}/summary`, payload);

// SCR-005: Session Summary Screen (the live end-of-session report)
export const getSessionSummary = (sessionId) =>
  client.get(`/sessions/${sessionId}/summary`);

export const saveSessionDraft = (sessionId, payload) =>
  client.post(`/sessions/${sessionId}/summary/draft`, payload);

// ---- MR-35: Session Notes & Attachments ----
export const getDailyNotes = (params) =>
  // params: { therapistId, month, status }
  client.get('/session-notes', { params });

export const getSessionNoteDetail = (sessionId) =>
  client.get(`/session-notes/${sessionId}`);

export const createSessionNote = (sessionId, payload) =>
  // payload: { bodyMarkdown }
  client.post(`/session-notes/${sessionId}`, payload);

export const updateSessionNote = (sessionId, payload) =>
  client.patch(`/session-notes/${sessionId}`, payload);

export const autoSaveSessionNote = (sessionId, payload) =>
  client.patch(`/session-notes/${sessionId}/autosave`, payload);

export const resubmitSessionNote = (sessionId, payload) =>
  client.post(`/session-notes/${sessionId}/resubmit`, payload);

export const uploadAttachment = (sessionId, formData) =>
  client.post(`/session-notes/${sessionId}/attachments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteAttachment = (sessionId, attachmentId) =>
  client.delete(`/session-notes/${sessionId}/attachments/${attachmentId}`);

export const getWeeklySummary = (params) =>
  client.get('/session-notes/weekly-summary', { params });

// ---- MR-36: Goal Progress Update ----
export const getGoalProgress = (studentId, goalId) =>
  client.get(`/students/${studentId}/goals/${goalId}/progress`);

export const updateGoalProgress = (studentId, goalId, payload) =>
  client.patch(`/students/${studentId}/goals/${goalId}/progress`, payload);

// ---- MR-38: Staff Scheduling Calendar ----
// Per SCR-TC-005 (Operational Management): weekly grid, teacher filter,
// mark unavailable, reassign students, export schedule.
export const getStaffCalendar = (params) =>
  // params: { therapistId, weekStart }
  client.get('/schedule', { params });

export const markTeacherUnavailable = (therapistId, payload) =>
  // payload: { date, reason }
  client.post(`/therapists/${therapistId}/unavailability`, payload);

export const reassignStudents = (payload) =>
  // payload: { fromTherapistId, toTherapistId, studentIds[] }
  client.post('/schedule/reassign', payload);

export const exportSchedule = (params) =>
  client.get('/schedule/export', { params });

// ---- MR-40: Attendance Tracking ----
// Per issues doc: three attendance types (student/therapist/support staff)
// with different status enums, plus one-click and bulk marking.
export const markAttendance = (sessionId, payload) =>
  // payload: { personId, personType: 'student' | 'therapist' | 'support_staff', status, note }
  client.post(`/sessions/${sessionId}/attendance`, payload);

export const markBulkAttendance = (sessionId, payload) =>
  // payload: { entries: [{ personId, personType, status }] }
  client.post(`/sessions/${sessionId}/attendance/bulk`, payload);

export const getAttendanceHistory = (params) =>
  client.get('/attendance', { params });

export const getAttendanceReport = (params) =>
  // params: { scope: 'daily' | 'monthly', date }
  client.get('/attendance/report', { params });

export default client;
