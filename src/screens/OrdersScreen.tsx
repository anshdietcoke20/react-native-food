import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useCart } from '../context/CartContext';
import { palette } from '../theme/colors';
import type { MainTabsParamList } from '../navigation/types';

const mockOrders = [
  { id: 'o1', name: 'Bella Pizzeria', items: 'Margherita · Garlic Bread', total: 22, status: 'Delivered' },
  { id: 'o2', name: 'Sushi Sora', items: 'Dragon Roll · Miso Soup', total: 31, status: 'Delivered' },
  { id: 'o3', name: 'Curry Leaf', items: 'Butter Chicken · Naan', total: 27, status: 'Cancelled' },
];

export default function OrdersScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  const { items, totalCount, totalPrice } = useCart();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.heading}>Your orders</Text>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {totalCount > 0 && (
          <View style={[styles.card, styles.activeCard]}>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>IN CART</Text>
            </View>
            <Text style={styles.title}>{totalCount} item{totalCount === 1 ? '' : 's'} waiting</Text>
            <Text style={styles.meta} numberOfLines={1}>
              {items.map((i) => i.name).join(' · ')}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('HomeTab', { screen: 'Cart' })
                }
                style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
                <Text style={styles.ctaText}>Go to Cart</Text>
              </Pressable>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Past orders</Text>
        {mockOrders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="bag-check-outline" size={20} color={palette.primary} />
              <Text style={styles.title}>{order.name}</Text>
              <Text style={[styles.status, order.status === 'Cancelled' && styles.statusCancelled]}>
                {order.status}
              </Text>
            </View>
            <Text style={styles.meta}>{order.items}</Text>
            <Text style={styles.total}>${order.total}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  heading: { fontSize: 22, fontWeight: '800', color: palette.text, paddingHorizontal: 20, paddingTop: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: palette.textMuted, marginVertical: 12 },
  card: {
    backgroundColor: palette.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 6,
  },
  activeCard: { backgroundColor: palette.surfaceAlt },
  activeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeBadgeText: { color: '#FFF', fontWeight: '700', fontSize: 10, letterSpacing: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 15, fontWeight: '700', color: palette.text, flex: 1 },
  status: { fontSize: 12, color: palette.success, fontWeight: '700' },
  statusCancelled: { color: palette.danger },
  meta: { fontSize: 13, color: palette.textMuted },
  total: { fontSize: 14, fontWeight: '700', color: palette.text },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  cta: { backgroundColor: palette.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  ctaPressed: { backgroundColor: palette.primaryDark },
  ctaText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
});
