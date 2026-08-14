// screens/coordinator/CoordinatorParentCommunicationScreen.js
// SCR-TC-006: Parent Communication (Coordinator View)

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import CoordinatorNav from './components/CoordinatorNav';
import {
  getCoordinatorConversations,
  getConversationThread,
  sendCoordinatorMessage,
  escalateConversation,
  markConversationResolved,
} from '../../api/coordinatorApi';

export default function CoordinatorParentCommunicationScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState('');
  const [tab, setTab] = useState('active'); // 'active' | 'log'

  const loadList = useCallback(async () => {
    try {
      const { data } = await getCoordinatorConversations({});
      setConversations(data);
      if (!activeId && data.length) setActiveId(data[0].id);
    } catch (err) {
      setConversations(DEMO_CONVERSATIONS);
      if (!activeId) setActiveId(DEMO_CONVERSATIONS[0].id);
    }
  }, [activeId]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    if (!activeId) return;
    getConversationThread(activeId)
      .then(({ data }) => setThread(data.messages))
      .catch(() => setThread(DEMO_THREAD));
  }, [activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSend = async () => {
    if (!draft.trim()) return;
    const newMsg = { id: `local-${Date.now()}`, sender: 'coordinator', senderLabel: 'Coordinator', text: draft, timestamp: 'Just now' };
    setThread((prev) => [...prev, newMsg]);
    setDraft('');
    try {
      await sendCoordinatorMessage(activeId, { text: newMsg.text });
    } catch (err) {}
  };

  const handleShareSchedule = () => {
    setDraft((prev) => `${prev}${prev ? ' ' : ''}[Shared: this week's schedule]`);
  };

  const handleShareProgress = () => {
    setDraft((prev) => `${prev}${prev ? ' ' : ''}[Shared: progress chart]`);
  };

  const handleEscalate = (to) => {
    Alert.alert(`Escalate to ${to === 'program_director' ? 'Program Director' : 'Director'}?`, undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Escalate',
        onPress: async () => {
          try { await escalateConversation(activeId, { to }); } catch (err) {}
          Alert.alert('Escalated', `${to === 'program_director' ? 'Program Director' : 'Director'} notified.`);
        },
      },
    ]);
  };

  const handleResolve = async () => {
    try { await markConversationResolved(activeId); } catch (err) {}
    setConversations((prev) => prev.map((c) => (c.id === activeId ? { ...c, resolved: true } : c)));
    Alert.alert('Marked as resolved');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CoordinatorNav activeTab="Parents" onTabPress={(t) => t !== 'Parents' && navigation?.navigate?.(navRouteForTab(t))} />

      <View style={styles.body}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarTabs}>
            <TouchableOpacity style={[styles.sidebarTab, tab === 'active' && styles.sidebarTabActive]} onPress={() => setTab('active')}>
              <Text style={typography.body}>Conversations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidebarTab, tab === 'log' && styles.sidebarTabActive]} onPress={() => setTab('log')}>
              <Text style={typography.body}>Log</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {conversations.map((c) => (
              <TouchableOpacity key={c.id} style={[styles.convoRow, activeId === c.id && styles.convoRowActive]} onPress={() => setActiveId(c.id)}>
                <Text style={typography.bodyBold}>{c.studentName}</Text>
                <Text style={typography.caption} numberOfLines={1}>{c.lastMessagePreview}</Text>
                {c.unreadCount > 0 && (
                  <View style={styles.unreadBadge}><Text style={styles.unreadBadgeText}>{c.unreadCount}</Text></View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.chatPane}>
          {activeConversation ? (
            <>
              <View style={styles.chatHeader}>
                <Text style={typography.h3}>{activeConversation.studentName} — {activeConversation.parentName}</Text>
                <View style={styles.chatHeaderActions}>
                  <TouchableOpacity onPress={() => handleEscalate('program_director')}>
                    <Text style={styles.escalateText}>Escalate to PD</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEscalate('director')}>
                    <Text style={styles.escalateText}>Escalate to Director</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleResolve}>
                    <Feather name="check-circle" size={18} color={colors.navyText} />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView style={styles.messagesScroll} contentContainerStyle={styles.messagesContent}>
                {thread.map((m) => (
                  <View key={m.id} style={[styles.messageBubble, m.sender === 'coordinator' && styles.messageBubbleMine]}>
                    <Text style={typography.caption}>{m.senderLabel}</Text>
                    <Text style={typography.body}>{m.text}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.quickActionsRow}>
                <TouchableOpacity style={styles.quickActionBtn} onPress={handleShareSchedule}>
                  <Text style={styles.quickActionText}>Share Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionBtn} onPress={handleShareProgress}>
                  <Text style={styles.quickActionText}>Share Progress</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.composerRow}>
                <TextInput style={styles.composerInput} placeholder="Type a message..." placeholderTextColor={colors.mutedText} value={draft} onChangeText={setDraft} />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                  <Feather name="send" size={16} color={colors.navyText} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Feather name="message-circle" size={40} color={colors.mutedText} />
              <Text style={typography.body}>Select a conversation</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function navRouteForTab(tab) {
  return {
    Dashboard: 'CoordinatorDashboard',
    'Live Sessions': 'LiveSessionMonitoring',
    Review: 'SessionSummaryReview',
    Progress: 'CoordinatorStudentProgress',
    Schedule: 'CoordinatorSchedule',
  }[tab];
}

const DEMO_CONVERSATIONS = [
  { id: '1', studentName: 'Student A', parentName: 'Parent A', lastMessagePreview: 'Thank you for the update!', unreadCount: 2, resolved: false },
  { id: '2', studentName: 'Student B', parentName: 'Parent B', lastMessagePreview: 'Can we schedule a meeting?', unreadCount: 0, resolved: false },
];
const DEMO_THREAD = [
  { id: '1', sender: 'parent', senderLabel: 'Parent A', text: 'How did today\u2019s session go?', timestamp: '10:00 AM' },
  { id: '2', sender: 'coordinator', senderLabel: 'Coordinator', text: 'Great progress on requesting items!', timestamp: '10:15 AM' },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  body: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 220, borderRightWidth: 1, borderRightColor: colors.border, backgroundColor: colors.bgCard },
  sidebarTabs: { flexDirection: 'row', padding: spacing.sm, gap: spacing.xs },
  sidebarTab: { flex: 1, paddingVertical: spacing.xs, alignItems: 'center', borderRadius: radius.sm },
  sidebarTabActive: { backgroundColor: colors.bgApp },
  convoRow: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  convoRowActive: { backgroundColor: colors.bgApp },
  unreadBadge: { position: 'absolute', top: spacing.sm, right: spacing.sm, backgroundColor: colors.primaryYellow, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  unreadBadgeText: { fontSize: 9, fontWeight: '700', color: colors.navyText },
  chatPane: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  chatHeaderActions: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  escalateText: { fontSize: 11, fontWeight: '600', color: colors.statusInProgressText },
  messagesScroll: { flex: 1 },
  messagesContent: { padding: spacing.lg, gap: spacing.sm },
  messageBubble: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, maxWidth: '75%', alignSelf: 'flex-start' },
  messageBubbleMine: { backgroundColor: '#DBEAFE', alignSelf: 'flex-end' },
  quickActionsRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  quickActionBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  quickActionText: { fontSize: 11, fontWeight: '600', color: colors.navyText },
  composerRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  composerInput: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryYellow, alignItems: 'center', justifyContent: 'center' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
});
