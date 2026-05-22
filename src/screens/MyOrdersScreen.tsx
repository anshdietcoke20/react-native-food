import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '../theme/colors';

const orders = [
  { id: 'a', title: 'Bella Pizzeria · 2 items', when: '2 days ago', total: '$22.00' },
  { id: 'b', title: 'Sushi Sora · 3 items', when: 'Last week', total: '$31.00' },
  { id: 'c', title: 'Taco Loco · 4 items', when: '3 weeks ago', total: '$18.40' },
];

export default function MyOrdersScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.lead}>Recent orders</Text>
        {orders.map((o) => (
          <View key={o.id} style={styles.card}>
            <Text style={styles.title}>{o.title}</Text>
            <Text style={styles.meta}>{o.when}</Text>
            <Text style={styles.total}>{o.total}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  lead: { fontSize: 14, color: palette.textMuted, marginBottom: 12 },
  card: { backgroundColor: palette.surface, borderRadius: 12, padding: 14, marginBottom: 10, gap: 4 },
  title: { fontSize: 15, fontWeight: '700', color: palette.text },
  meta: { fontSize: 13, color: palette.textMuted },
  total: { fontSize: 14, fontWeight: '700', color: palette.text },
});
