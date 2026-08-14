// components/StatusPill.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

// status: 'inProgress' | 'completed' | 'notStarted' | 'pending' | 'revision' | 'approved'
const STATUS_MAP = {
  inProgress: { bg: colors.statusInProgressBg, text: colors.statusInProgressText, label: 'In Progress' },
  completed: { bg: colors.statusCompletedBg, text: colors.statusCompletedText, label: 'Completed' },
  notStarted: { bg: colors.statusNotStartedBg, text: colors.statusNotStartedText, label: 'Not Started' },
  pending: { bg: colors.statusPendingBg, text: colors.statusPendingText, label: 'Pending' },
  revision: { bg: colors.statusRevisionBg, text: colors.statusRevisionText, label: 'Revision Required' },
  approved: { bg: colors.statusApprovedBg, text: colors.statusApprovedText, label: 'Approved' },
};

export default function StatusPill({ status, label }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.notStarted;
  return (
    <View style={[styles.pill, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.text, { color: cfg.text }]}>{label || cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
