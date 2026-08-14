// screens/director/DirectorParentCommunicationScreen.js
// SCR-DIR-004: Parent Communication (Director View) - centralized hub for
// all parent interactions, including escalations from Coordinator/PD.

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import DirectorNav, { DIRECTOR_ROUTE_BY_TAB } from './components/DirectorNav';
import { getDirectorConversations, getDirectorConversationThread, sendDirectorMessage, toggleConversationRead } from '../../api/directorApi';

export default function DirectorParentCommunicationScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState('');
  const [showLog, setShowLog] = useState(false);

  const loadList = useCallback(async () => {
    try {
      const { data } = await getDirectorConversations({});
      setConversations(data);
      if (!activeId && data.length) setActiveId(data[0].id);
    } catch (err) {
      setConversations(DEMO_CONVERSATIONS);
      if (!activeId) setActiveId(DEMO_CONVERSATIONS[0].id);
    }
  }, [activeId]);

  useEffect(() => { loadList(); }, [loadList]);

  useEffect(() => {
    if (!activeId) return;
    getDirectorConversationThread(activeId).then(({ data }) => setThread(data.messages)).catch(() => setThread(DEMO_THREAD));
  }, [activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSend = async () => {
    if (!draft.trim()) return;
    const newMsg = { id: `local-${Date.now()}`, sender: 'director', senderLabel: 'Director', text: draft };
    setThread((prev) => [...prev, newMsg]);
    setDraft('');
    try { await sendDirectorMessage(activeId, { text: newMsg.text }); } catch (err) {}
  };

  const handleToggleRead = async () => {
    const nextUnread = !(activeConversation?.unreadCount > 0);
    try { await toggleConversationRead(activeId, { unread: nextUnread }); } catch (err) {}
    setConversations((prev) => prev.map((c) => (c.id === activeId ? { ...c, unreadCount: nextUnread ? 1 : 0 } : c)));
  };

  const handlePrintLog = () => Alert.alert('Print Communication Log', 'PDF export not wired up yet (stub).');

  return (
    <SafeAreaView style={styles.safe}>
      <DirectorNav activeTab="Parents" onTabPress={(t) => navigation?.navigate?.(DIRECTOR_ROUTE_BY_TAB[t])} />
      <View style={styles.body}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarTabs}>
            <TouchableOpacity style={[styles.sidebarTab, !showLog && styles.sidebarTabActive]} onPress={() => setShowLog(false)}>
              <Text style={typography.body}>Conversations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sidebarTab, showLog && styles.sidebarTabActive]} onPress={() => setShowLog(true)}>
              <Text style={typography.body}>Log</Text>
            </TouchableOpacity>
          </View>
          {showLog ? (
            <View style={{ padding: spacing.md }}>
              <TouchableOpacity style={styles.printBtn} onPress={handlePrintLog}>
                <Text style={styles.printBtnText}>Print Communication Log</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView>
              {conversations.map((c) => (
                <TouchableOpacity key={c.id} style={[styles.convoRow, activeId === c.id && styles.convoRowActive]} onPress={() => setActiveId(c.id)}>
                  <Text style={typography.bodyBold}>{c.studentName}</Text>
                  <Text style={typography.caption} numberOfLines={1}>{c.lastMessagePreview}</Text>
                  {c.escalated && <Text style={styles.escalatedTag}>Escalated</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.chatPane}>
          {activeConversation && !showLog ? (
            <>
              <View style={styles.chatHeader}>
                <Text style={typography.h3}>{activeConversation.studentName} — {activeConversation.parentName}</Text>
                <TouchableOpacity onPress={handleToggleRead}>
                  <Feather name={activeConversation.unreadCount > 0 ? 'mail' : 'mail-open'} size={18} color={colors.navyText} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.messagesScroll} contentContainerStyle={styles.messagesContent}>
                {thread.map((m) => (
                  <View key={m.id} style={[styles.messageBubble, m.sender === 'director' && styles.messageBubbleMine]}>
                    <Text style={typography.caption}>{m.senderLabel}</Text>
                    <Text style={typography.body}>{m.text}</Text>
                  </View>
                ))}
              </ScrollView>
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
              <Text style={typography.body}>{showLog ? 'Select "Print Communication Log" to export' : 'Select a conversation'}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const DEMO_CONVERSATIONS = [
  { id: '1', studentName: 'Student A', parentName: 'Parent A', lastMessagePreview: 'Escalated: needs urgent response', unreadCount: 1, escalated: true },
  { id: '2', studentName: 'Student B', parentName: 'Parent B', lastMessagePreview: 'Can we schedule a meeting?', unreadCount: 0, escalated: false },
];
const DEMO_THREAD = [
  { id: '1', sender: 'parent', senderLabel: 'Parent A', text: 'I need to speak with someone urgently about my child.', timestamp: '8:00 AM' },
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
  escalatedTag: { fontSize: 10, fontWeight: '700', color: '#EF4444', marginTop: 2 },
  printBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  printBtnText: { fontSize: 12, fontWeight: '600', color: colors.navyText },
  chatPane: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  messagesScroll: { flex: 1 },
  messagesContent: { padding: spacing.lg, gap: spacing.sm },
  messageBubble: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, maxWidth: '75%', alignSelf: 'flex-start' },
  messageBubbleMine: { backgroundColor: '#DBEAFE', alignSelf: 'flex-end' },
  composerRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  composerInput: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryYellow, alignItems: 'center', justifyContent: 'center' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
});
