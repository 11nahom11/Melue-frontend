// api/teacherExtrasApi.js
//
// Covers the Teacher-facing Dashboard, Assessments, and ABC Log screens.
// These were originally Fyori's (Dashboard) and Hanania's (Assessments,
// ABC Log) tickets, not Daily Operations - built here now that the whole
// project is in scope. Kept in a separate file from sessionApi.js per the
// "one API file per module" convention in PROJECT_NOTES.md.

import client from './sessionApi';

// SCR-TEA-001: Teacher Dashboard
export const getTeacherDashboard = () => client.get('/teacher/dashboard');

// Assessment Dashboard (SCR-010 per Figma's screen ID)
export const getAssessmentDashboard = () => client.get('/teacher/assessments/dashboard');
export const getAssessmentDetail = (studentId, assessmentType) =>
  client.get(`/teacher/students/${studentId}/assessments/${assessmentType}`);

// ABC Log / ABC Data Sheet (SCR-003A per spec doc)
export const getAbcLog = (params) =>
  // params: { studentId, from, to, behavior, category }
  client.get('/teacher/abc-log', { params });
export const exportAbcLog = (params) => client.get('/teacher/abc-log/export', { params });
