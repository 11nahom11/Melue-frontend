// theme/typography.ts
import type { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 24, fontWeight: '700', color: colors.navyText },
  h2: { fontSize: 18, fontWeight: '700', color: colors.navyText },
  h3: { fontSize: 15, fontWeight: '600', color: colors.navyText },
  h4: { fontSize: 13, fontWeight: '600', color: colors.navyText },
  body: { fontSize: 14, fontWeight: '400', color: colors.bodyText },
  bodyBold: { fontSize: 14, fontWeight: '600', color: colors.navyText },
  small: { fontSize: 13, fontWeight: '400', color: colors.bodyText },
  caption: { fontSize: 12, fontWeight: '500', color: colors.mutedText },
  tiny: { fontSize: 11, fontWeight: '500', color: colors.mutedText },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.mutedText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelDark: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.navyText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tableHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.mutedText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableCell: { fontSize: 13, fontWeight: '400', color: colors.navyText },
  link: { fontSize: 13, fontWeight: '600', color: colors.skyAccent },
};

export default typography;
