// theme/colors.ts
// Pulled directly from the Melu'e Foundation Figma (nova-candle-39897769.figma.site)
// Update these if the design system doc gives exact hex values later.

export const colors = {
  // Brand
  primaryYellow: '#FCD34D', // main CTA buttons (Sign In, active states)
  primaryYellowDark: '#FBBF24', // pressed / hover state
  navyText: '#1A2233', // headings, nav text
  bodyText: '#4B5563', // secondary/body text
  mutedText: '#9CA3AF', // placeholders, timestamps

  // Reference accent
  skyAccent: '#38BDF8', // focus rings, links, active borders (sky-400)
  skyDark: '#0EA5E9', // pressed accent

  // Dark surfaces
  darkSurface: '#1F2937', // admin sidebar, dark headers (gray-800)
  darkSurfaceLight: '#374151', // lighter dark surface (gray-700)

  // Backgrounds
  bgApp: '#F9FAFB', // page background (gray-50)
  bgCard: '#FFFFFF', // card surfaces
  bgFooter: '#1A2233', // dark footer bar
  bgActiveCardBorder: '#38BDF8', // blue outline on active elements
  bgHeader: '#FFFFFF', // header bar background
  bgTableHeader: '#F9FAFB', // table header row
  bgHover: '#F3F4F6', // row hover / pressed state
  bgInput: '#FFFFFF', // input background

  // Status pills
  statusInProgressBg: '#DBEAFE',
  statusInProgressText: '#2563EB',
  statusCompletedBg: '#D1FAE5',
  statusCompletedText: '#059669',
  statusNotStartedBg: '#F3F4F6',
  statusNotStartedText: '#6B7280',
  statusPendingBg: '#FEF3C7',
  statusPendingText: '#B45309',
  statusRevisionBg: '#FEE2E2',
  statusRevisionText: '#DC2626',
  statusApprovedBg: '#D1FAE5',
  statusApprovedText: '#059669',

  // Role badges (reference AdminPanel)
  roleTeacherBg: '#DBEAFE',
  roleTeacherText: '#1D4ED8',
  roleCoordinatorBg: '#EDE9FE',
  roleCoordinatorText: '#7C3AED',
  roleDirectorBg: '#E0E7FF',
  roleDirectorText: '#4338CA',
  roleInstitutionalAdminBg: '#FEF3C7',
  roleInstitutionalAdminText: '#B45309',
  roleSysAdminBg: '#FEE2E2',
  roleSysAdminText: '#DC2626',
  roleActiveBg: '#D1FAE5',
  roleActiveText: '#059669',
  roleInactiveBg: '#F3F4F6',
  roleInactiveText: '#6B7280',

  // Prompt entry buttons
  promptFP: '#FCA5A5', // full physical - red/pink
  promptPP: '#FCD34D', // partial physical - amber
  promptG: '#93C5FD', // gestural - blue
  promptIndependent: '#86EFAC', // "+" independent - green

  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  white: '#FFFFFF',
  black: '#000000',

  // Functional colors
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  success: '#10B981',
  successBg: '#D1FAE5',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  info: '#3B82F6',
  infoBg: '#DBEAFE',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

export default colors;
