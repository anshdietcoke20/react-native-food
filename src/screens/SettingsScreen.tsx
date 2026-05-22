import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '../theme/colors';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [promos, setPromos] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={{ padding: 20, gap: 12 }}>
        <Row label="Push notifications" value={notifications} onValueChange={setNotifications} />
        <Row label="Promo emails" value={promos} onValueChange={setPromos} />
      </View>
    </SafeAreaView>
  );
}

function Row({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.border, true: palette.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: palette.surface,
    borderRadius: 12,
  },
  label: { fontSize: 15, color: palette.text, fontWeight: '600' },
});
