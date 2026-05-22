import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '../theme/colors';

const faqs = [
  { q: 'How do I track my order?', a: 'Open the Orders tab — active orders show real-time status at the top.' },
  { q: 'Can I cancel an order?', a: 'Tap a past order from My Orders within 5 minutes of placing it.' },
  { q: 'How do I change my delivery address?', a: 'Head to Profile → Settings to update your saved addresses.' },
];

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Text style={styles.lead}>Frequently asked</Text>
        {faqs.map((f, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.q}>{f.q}</Text>
            <Text style={styles.a}>{f.a}</Text>
          </View>
        ))}
        <Text style={styles.note}>Email support@foodapp.dev — we reply within a day.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  lead: { fontSize: 14, color: palette.textMuted, marginBottom: 6 },
  card: { backgroundColor: palette.surface, borderRadius: 12, padding: 14, gap: 6 },
  q: { fontSize: 15, fontWeight: '700', color: palette.text },
  a: { fontSize: 13, color: palette.textMuted, lineHeight: 18 },
  note: { fontSize: 12, color: palette.textMuted, marginTop: 8 },
});
