// context/AuthContext.js
//
// Frontend-only auth state - no real backend (per instructions: this team
// is frontend-only, no backend work). Matches the Figma login screen's
// "Demo Accounts (any password)" pattern: picking a role logs you in as
// that role immediately, no real credential check.
//
// Real auth (MR-4, Core Backend) will eventually replace this - when it
// does, swap loginAsRole's body for a real API call and keep the same
// shape (role, userName, login, logout) so screens don't need to change.

import React, { createContext, useContext, useState, useMemo } from 'react';

export const ROLES = {
  TEACHER: 'teacher',
  COORDINATOR: 'coordinator',
  DIRECTOR: 'director',
  PROGRAM_DIRECTOR: 'program_director',
  INSTITUTIONAL_ADMIN: 'institutional_admin',
  SYSTEM_ADMIN: 'system_admin',
  PARENT: 'parent',
};

export const DEMO_ACCOUNTS = [
  { role: ROLES.TEACHER, label: 'Teacher', email: 'teacher@melue.org', userName: 'Teacher A' },
  { role: ROLES.COORDINATOR, label: 'Coordinator', email: 'coordinator@melue.org', userName: 'Coordinator A' },
  { role: ROLES.DIRECTOR, label: 'Director', email: 'director@melue.org', userName: 'Director A' },
  { role: ROLES.INSTITUTIONAL_ADMIN, label: 'Institutional Admin', email: 'admin@melue.org', userName: 'Admin A' },
  { role: ROLES.SYSTEM_ADMIN, label: 'System Admin', email: 'sysadmin@melue.org', userName: 'Sysadmin A' },
];
// Note: Program Director and Parent aren't in the Figma's demo account
// list, but exist in the spec docs. Added as selectable roles below even
// though there's no matching Figma demo row.
export const EXTRA_ROLES = [
  { role: ROLES.PROGRAM_DIRECTOR, label: 'Program Director', email: 'pd@melue.org', userName: 'Program Director A' },
  { role: ROLES.PARENT, label: 'Parent', email: 'parent@melue.org', userName: 'Parent A' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null); // { role, userName, email } | null

  const value = useMemo(
    () => ({
      session,
      loginAsRole: (account) => setSession(account),
      logout: () => setSession(null),
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
