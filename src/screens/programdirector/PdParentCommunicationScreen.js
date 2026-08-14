// screens/programdirector/PdParentCommunicationScreen.js
// SCR-PD-007: Parent Communication (Program Director View)
// Same pattern as the Coordinator's version (SCR-TC-006) - a Program
// Director typically only shows up in escalated threads, so this is a
// lighter, mostly-read view with an escalate-to-Director action.

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/colors';
import { typography } from '../../theme/typography';
import ProgramDirectorNav from './components/ProgramDirectorNav';
import { PD_ROUTE_BY_TAB } from './components/pdNavRoutes';
import { getPdConversations, getPdConversationThread, sendPdMessage, escalateToDirector } from '../../api/programDirectorApi';

export default function PdParentCommunicationScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState('');

  const loadList = useCallback(async () => {
    try {
      const { data } = await getPdConversations({});
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
    getPdConversationThread(activeId).then(({ data }) => setThread(data.messages)).catch(() => setThread(DEMO_THREAD));
  }, [activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSend = async () => {
    if (!draft.trim()) return;
    const newMsg = { id: `local-${Date.now()}`, sender: 'pd', senderLabel: 'Program Director', text: draft };
    setThread((prev) => [...prev, newMsg]);
    setDraft('');
    try { await sendPdMessage(activeId, { text: newMsg.text }); } catch (err) {}
  };

  const handleEscalate = () => {
    Alert.alert('Escalate to Director?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Escalate', onPress: async () => { try { await escalateToDirector(activeId, {}); } catch (err) {} Alert.alert('Escalated to Director'); } },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ProgramDirectorNav activeTab="Parents" onTabPress={(t) => navigation?.navigate?.(PD_ROUTE_BY_TAB[t])} />
      <View style={styles.body}>
        <View style={styles.sidebar}>
          <ScrollView>
            {conversations.map((c) => (
              <TouchableOpacity key={c.id} style={[styles.convoRow, activeId === c.id && styles.convoRowActive]} onPress={() => setActiveId(c.id)}>
                <Text style={typography.bodyBold}>{c.studentName}</Text>
                <Text style={typography.caption} numberOfLines={1}>{c.lastMessagePreview}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.chatPane}>
          {activeConversation ? (
            <>
              <View style={styles.chatHeader}>
                <Text style={typography.h3}>{activeConversation.studentName} — {activeConversation.parentName}</Text>
                <TouchableOpacity onPress={handleEscalate}>
                  <Text style={styles.escalateText}>Escalate to Director</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.messagesScroll} contentContainerStyle={styles.messagesContent}>
                {thread.map((m) => (
                  <View key={m.id} style={[styles.messageBubble, m.sender === 'pd' && styles.messageBubbleMine]}>
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
              <Text style={typography.body}>Select a conversation</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const DEMO_CONVERSATIONS = [
  { id: '1', studentName: 'Student C', parentName: 'Parent C', lastMessagePreview: 'Requesting a meeting about the IUP.' },
];
const DEMO_THREAD = [
  { id: '1', sender: 'parent', senderLabel: 'Parent C', text: "I'd like to discuss the new goals in the IUP.", timestamp: '9:00 AM' },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  body: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 220, borderRightWidth: 1, borderRightColor: colors.border, backgroundColor: colors.bgCard },
  convoRow: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  convoRowActive: { backgroundColor: colors.bgApp },
  chatPane: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  escalateText: { fontSize: 12, fontWeight: '600', color: colors.statusInProgressText },
  messagesScroll: { flex: 1 },
  messagesContent: { padding: spacing.lg, gap: spacing.sm },
  messageBubble: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, maxWidth: '75%', alignSelf: 'flex-start' },
  messageBubbleMine: { backgroundColor: '#DBEAFE', alignSelf: 'flex-end' },
  composerRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  composerInput: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryYellow, alignItems: 'center', justifyContent: 'center' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
});
