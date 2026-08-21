import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing } from './colors';
import { typography } from './typography';

export const contentStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgApp },
  scrollContent: { padding: spacing.xl, gap: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { gap: spacing.xs },
  subtitle: { ...typography.caption, marginTop: 2 },
  sectionGrid: { gap: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  spacer: { flex: 1 },
});

interface SectionCardProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export function SectionCard({ title, subtitle, right, children }: SectionCardProps) {
  return (
    <View style={scStyles.card}>
      <View style={scStyles.header}>
        <View style={contentStyles.headerLeft}>
          <Text style={typography.h3}>{title}</Text>
          {subtitle ? <Text style={contentStyles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View>{right}</View> : null}
      </View>
      {children}
    </View>
  );
}

const scStyles = StyleSheet.create({
  card: { backgroundColor: colors.bgCard, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
});

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
}

export function InputField({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType = 'default', autoCapitalize = 'none', multiline, numberOfLines = 1, disabled, icon }: InputFieldProps) {
  return (
    <View style={ipStyles.field}>
      {label ? <Text style={typography.label}>{label}</Text> : null}
      <View style={[ipStyles.inputRow, disabled && ipStyles.disabled]}>
        {icon ? <Feather name={icon} size={15} color={colors.mutedText} style={ipStyles.icon} /> : null}
        <TextInput
          style={[ipStyles.input, icon && ipStyles.inputWithIcon, multiline && ipStyles.multiline]}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedText}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
        />
      </View>
    </View>
  );
}

const ipStyles = StyleSheet.create({
  field: { gap: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.bgInput },
  icon: { position: 'absolute', left: 12 },
  input: { flex: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, fontSize: 13, color: colors.navyText },
  inputWithIcon: { paddingLeft: 36 },
  multiline: { minHeight: 80, textAlignVertical: 'top' as const, paddingTop: spacing.sm + 2 },
  disabled: { backgroundColor: colors.bgHover, opacity: 0.7 },
});

interface SelectFieldProps {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SelectField({ label, value, options, onSelect, placeholder, disabled }: SelectFieldProps) {
  const selected = options.find((o) => o.value === value);
  return (
    <View style={ipStyles.field}>
      {label ? <Text style={typography.label}>{label}</Text> : null}
      <TouchableOpacity
        style={[ipStyles.inputRow, disabled && ipStyles.disabled]}
        disabled={disabled}
        onPress={() => {
          if (options.length > 0) {
            const ci = options.findIndex((o) => o.value === value);
            onSelect(options[(ci + 1) % options.length].value);
          }
        }}
      >
        <Text style={[ipStyles.input, !selected && { color: colors.mutedText }]}>
          {selected?.label ?? placeholder ?? 'Select...'}
        </Text>
        <Feather name="chevron-down" size={16} color={colors.mutedText} style={{ marginRight: 12 }} />
      </TouchableOpacity>
    </View>
  );
}

interface BadgeProps { label: string; bg: string; text: string; size?: 'sm' | 'md'; }
export function Badge({ label, bg, text, size = 'sm' }: BadgeProps) {
  return (
    <View style={[bdStyles.badge, { backgroundColor: bg }, size === 'md' && bdStyles.md]}>
      <Text style={[bdStyles.text, { color: text }, size === 'md' && bdStyles.textMd]}>{label}</Text>
    </View>
  );
}

const bdStyles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  md: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  text: { fontSize: 11, fontWeight: '600' },
  textMd: { fontSize: 12 },
});

export function PromptBadge({ level }: { level: string }) {
  const m: Record<string, { bg: string; text: string }> = {
    FP: { bg: colors.promptFP, text: '#991B1B' }, 'Full Physical': { bg: colors.promptFP, text: '#991B1B' },
    PP: { bg: '#FEF3C7', text: '#92400E' }, 'Partial Physical': { bg: '#FEF3C7', text: '#92400E' },
    G: { bg: colors.promptG, text: '#1E40AF' }, Gestural: { bg: colors.promptG, text: '#1E40AF' },
    '+': { bg: colors.promptIndependent, text: '#166534' }, Independent: { bg: colors.promptIndependent, text: '#166534' },
  };
  const c = m[level] ?? { bg: colors.bgHover, text: colors.bodyText };
  return <Badge label={level} bg={c.bg} text={c.text} size="md" />;
}

export function RoleBadge({ role }: { role: string }) {
  const m: Record<string, { bg: string; text: string }> = {
    teacher: { bg: colors.roleTeacherBg, text: colors.roleTeacherText },
    coordinator: { bg: colors.roleCoordinatorBg, text: colors.roleCoordinatorText },
    director: { bg: colors.roleDirectorBg, text: colors.roleDirectorText },
    institutional_admin: { bg: colors.roleInstitutionalAdminBg, text: colors.roleInstitutionalAdminText },
    sysadmin: { bg: colors.roleSysAdminBg, text: colors.roleSysAdminText },
    active: { bg: colors.roleActiveBg, text: colors.roleActiveText },
    inactive: { bg: colors.roleInactiveBg, text: colors.roleInactiveText },
  };
  const c = m[role.toLowerCase()] ?? { bg: colors.bgHover, text: colors.bodyText };
  return <Badge label={role.replace(/_/g, ' ')} bg={c.bg} text={c.text} />;
}

export function StatusBadge({ status }: { status: string }) {
  const m: Record<string, { bg: string; text: string }> = {
    active: { bg: '#D1FAE5', text: '#059669' }, inactive: { bg: '#F3F4F6', text: '#6B7280' },
    pending: { bg: '#FEF3C7', text: '#B45309' }, approved: { bg: '#D1FAE5', text: '#059669' },
    rejected: { bg: '#FEE2E2', text: '#DC2626' }, draft: { bg: '#F3F4F6', text: '#6B7280' },
  };
  const c = m[status.toLowerCase()] ?? { bg: colors.bgHover, text: colors.bodyText };
  return <Badge label={status} bg={c.bg} text={c.text} />;
}

interface ToggleProps { value: boolean; onToggle: (v: boolean) => void; disabled?: boolean; label?: string; }
export function Toggle({ value, onToggle, disabled, label }: ToggleProps) {
  return (
    <TouchableOpacity style={[tgStyles.row, disabled && { opacity: 0.5 }]} disabled={disabled} onPress={() => onToggle(!value)} activeOpacity={0.7}>
      <View style={[tgStyles.track, value && tgStyles.trackOn]}>
        <View style={[tgStyles.thumb, value && tgStyles.thumbOn]} />
      </View>
      {label ? <Text style={typography.small}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const tgStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  track: { width: 40, height: 22, borderRadius: 11, backgroundColor: colors.border, padding: 2, justifyContent: 'center' },
  trackOn: { backgroundColor: colors.skyAccent },
  thumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.white },
  thumbOn: { alignSelf: 'flex-end' },
});

interface RadioButtonProps { label: string; selected: boolean; onSelect: () => void; }
export function RadioButton({ label, selected, onSelect }: RadioButtonProps) {
  return (
    <TouchableOpacity style={rdStyles.row} onPress={onSelect} activeOpacity={0.7}>
      <View style={[rdStyles.circle, selected && rdStyles.circleOn]}>
        {selected ? <View style={rdStyles.dot} /> : null}
      </View>
      <Text style={typography.small}>{label}</Text>
    </TouchableOpacity>
  );
}

const rdStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  circle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  circleOn: { borderColor: colors.skyAccent },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.skyAccent },
});

interface RadioGroupProps { options: string[]; selected: string; onSelect: (v: string) => void; label?: string; }
export function RadioGroup({ options, selected, onSelect, label }: RadioGroupProps) {
  return (
    <View style={rgStyles.field}>
      {label ? <Text style={typography.label}>{label}</Text> : null}
      <View style={rgStyles.row}>
        {options.map((o) => <RadioButton key={o} label={o} selected={o === selected} onSelect={() => onSelect(o)} />)}
      </View>
    </View>
  );
}

const rgStyles = StyleSheet.create({ field: { gap: spacing.xs }, row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md } });

interface YellowButtonProps { label: string; onPress: () => void; icon?: keyof typeof Feather.glyphMap; size?: 'sm' | 'md'; disabled?: boolean; }
export function YellowButton({ label, onPress, icon, size = 'md', disabled }: YellowButtonProps) {
  return (
    <TouchableOpacity style={[btStyles.yellow, size === 'sm' && btStyles.sm, disabled && { opacity: 0.5 }]} onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      {icon ? <Feather name={icon} size={14} color={colors.navyText} /> : null}
      <Text style={btStyles.yellowText}>{label}</Text>
    </TouchableOpacity>
  );
}

interface GhostButtonProps { label: string; onPress: () => void; icon?: keyof typeof Feather.glyphMap; color?: string; }
export function GhostButton({ label, onPress, icon, color }: GhostButtonProps) {
  return (
    <TouchableOpacity style={btStyles.ghost} onPress={onPress} activeOpacity={0.7}>
      {icon ? <Feather name={icon} size={14} color={color ?? colors.bodyText} /> : null}
      <Text style={[btStyles.ghostText, color ? { color } : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

interface IconButtonProps { icon: keyof typeof Feather.glyphMap; onPress: () => void; color?: string; size?: number; }
export function IconButton({ icon, onPress, color = colors.mutedText, size = 16 }: IconButtonProps) {
  return (
    <TouchableOpacity style={btStyles.icon} onPress={onPress} activeOpacity={0.6}>
      <Feather name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

const btStyles = StyleSheet.create({
  yellow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primaryYellow, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm + 2 },
  sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2 },
  yellowText: { fontSize: 13, fontWeight: '700', color: colors.navyText },
  ghost: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard },
  ghostText: { fontSize: 13, fontWeight: '600', color: colors.bodyText },
  icon: { padding: spacing.sm, borderRadius: radius.sm },
});

interface TableColumn { key: string; label: string; width?: number | string; align?: 'left' | 'center' | 'right'; }
interface TableProps { columns: TableColumn[]; data: Record<string, any>[]; onRowPress?: (row: Record<string, any>, i: number) => void; renderCell?: (key: string, val: any, row: Record<string, any>) => React.ReactNode; }

export function Table({ columns, data, onRowPress, renderCell }: TableProps) {
  return (
    <View style={tbStyles.container}>
      <View style={tbStyles.headerRow}>
        {columns.map((c) => (
          <View key={c.key} style={[tbStyles.headerCell, c.width ? { width: c.width as number } : { flex: 1 }]}>
            <Text style={[typography.tableHeader, c.align === 'right' && { textAlign: 'right' }]}>{c.label}</Text>
          </View>
        ))}
      </View>
      {data.map((row, i) => (
        <TouchableOpacity key={i} style={[tbStyles.dataRow, i < data.length - 1 && tbStyles.border]} onPress={onRowPress ? () => onRowPress(row, i) : undefined} activeOpacity={onRowPress ? 0.6 : 1} disabled={!onRowPress}>
          {columns.map((c) => (
            <View key={c.key} style={[tbStyles.dataCell, c.width ? { width: c.width as number } : { flex: 1 }]}>
              {renderCell ? renderCell(c.key, row[c.key], row) : <Text style={typography.tableCell} numberOfLines={1}>{String(row[c.key] ?? '')}</Text>}
            </View>
          ))}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const tbStyles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', backgroundColor: colors.bgTableHeader, paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerCell: { paddingHorizontal: spacing.xs },
  dataRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 4 },
  border: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  dataCell: { paddingHorizontal: spacing.xs },
});

export function Divider() {
  return <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.md }} />;
}

interface EmptyStateProps { icon: keyof typeof Feather.glyphMap; title: string; subtitle?: string; }
export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={esStyles.container}>
      <Feather name={icon} size={32} color={colors.mutedText} />
      <Text style={typography.h4}>{title}</Text>
      {subtitle ? <Text style={typography.caption}>{subtitle}</Text> : null}
    </View>
  );
}

const esStyles = StyleSheet.create({ container: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl, gap: spacing.sm } });

interface SearchBarProps { value: string; onChangeText: (text: string) => void; placeholder?: string; }
export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  return (
    <View style={sbStyles.container}>
      <Feather name="search" size={15} color={colors.mutedText} style={sbStyles.icon} />
      <TextInput style={sbStyles.input} value={value} onChangeText={onChangeText} placeholder={placeholder ?? 'Search...'} placeholderTextColor={colors.mutedText} />
      {value.length > 0 ? <TouchableOpacity onPress={() => onChangeText('')}><Feather name="x" size={15} color={colors.mutedText} /></TouchableOpacity> : null}
    </View>
  );
}

const sbStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.bgCard, paddingHorizontal: spacing.md },
  icon: { marginRight: spacing.sm },
  input: { flex: 1, paddingVertical: spacing.sm + 2, fontSize: 13, color: colors.navyText },
});

interface FormCanvasProps { children: React.ReactNode; emptyMessage?: string; }
export function FormCanvas({ children, emptyMessage }: FormCanvasProps) {
  return (
    <View style={fcStyles.container}>
      {children}
      {React.Children.count(children) === 0 && emptyMessage ? (
        <View style={fcStyles.empty}>
          <Feather name="layout" size={24} color={colors.mutedText} />
          <Text style={typography.caption}>{emptyMessage}</Text>
        </View>
      ) : null}
    </View>
  );
}

const fcStyles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', borderRadius: radius.md, padding: spacing.md, gap: spacing.sm, minHeight: 100 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl, gap: spacing.xs },
});

interface FieldRowProps { type: string; label: string; index?: number; onEdit?: () => void; onDelete?: () => void; onMoveUp?: () => void; onMoveDown?: () => void; first?: boolean; last?: boolean; }
export function FieldRow({ type, label, index, onEdit, onDelete, onMoveUp, onMoveDown, first, last }: FieldRowProps) {
  const tc: Record<string, string> = { text: '#DBEAFE', number: '#FEF3C7', select: '#E0E7FF', checkbox: '#D1FAE5', date: '#FCE7F3', radio: '#FEE2E2', dropdown: '#E0E7FF', textarea: '#DBEAFE' };
  const tt: Record<string, string> = { text: '#1D4ED8', number: '#B45309', select: '#4338CA', checkbox: '#059669', date: '#BE185D', radio: '#DC2626', dropdown: '#4338CA', textarea: '#1D4ED8' };
  return (
    <View style={frStyles.row}>
      <View style={frStyles.grip}><Feather name="more-vertical" size={14} color={colors.mutedText} /></View>
      {index != null ? <Text style={typography.caption}>{index + 1}</Text> : null}
      <View style={[frStyles.typeBadge, { backgroundColor: tc[type] ?? '#F3F4F6' }]}>
        <Text style={{ fontSize: 10, fontWeight: '600', color: tt[type] ?? '#6B7280' }}>{type.toUpperCase()}</Text>
      </View>
      <Text style={[typography.small, { flex: 1 }]}>{label}</Text>
      <View style={frStyles.actions}>
        {onMoveUp && !first ? <IconButton icon="chevron-up" onPress={onMoveUp} size={14} /> : null}
        {onMoveDown && !last ? <IconButton icon="chevron-down" onPress={onMoveDown} size={14} /> : null}
        {onEdit ? <IconButton icon="edit-2" onPress={onEdit} size={14} color={colors.skyAccent} /> : null}
        {onDelete ? <IconButton icon="trash-2" onPress={onDelete} size={14} color={colors.danger} /> : null}
      </View>
    </View>
  );
}

const frStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, borderRadius: radius.sm, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
  grip: { padding: spacing.xs },
  typeBadge: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 2 },
});
