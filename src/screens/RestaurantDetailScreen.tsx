import React, { useLayoutEffect, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useCart } from '../context/CartContext';
import { findRestaurant } from '../data/restaurants';
import { palette } from '../theme/colors';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantDetail'>;

// TODO: replace with real menu data once the menu endpoint is wired up
const placeholderMenu = (basePrice: number) => [
  { id: 'm1', name: 'Chef Special', price: basePrice },
  { id: 'm2', name: 'House Combo', price: basePrice + 4 },
  { id: 'm3', name: 'Side & Drink', price: Math.max(4, basePrice - 6) },
];

export default function RestaurantDetailScreen({ route, navigation }: Props) {
  const { id, name: paramName, price: paramPrice } = route.params;
  const restaurant = useMemo(() => findRestaurant(id), [id]);

  const displayName = restaurant?.name ?? paramName ?? `Restaurant #${id}`;
  const displayPrice = restaurant?.price ?? paramPrice ?? 12;
  const { addItem, totalCount } = useCart();

  useLayoutEffect(() => {
    navigation.setOptions({ title: displayName });
  }, [navigation, displayName]);

  const menu = useMemo(
    () => placeholderMenu(displayPrice).map((m) => ({ ...m, id: `${id}-${m.id}` })),
    [displayPrice, id],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>{restaurant?.banner ?? '🍽️'}</Text>
        </View>

        <View style={styles.headBlock}>
          <Text style={styles.title}>{displayName}</Text>
          <Text style={styles.meta}>{restaurant?.cuisine ?? 'Delicious food'}</Text>
          <View style={styles.row}>
            <View style={styles.pill}>
              <Ionicons name="star" size={12} color={palette.accent} />
              <Text style={styles.pillText}>{(restaurant?.rating ?? 4.5).toFixed(1)}</Text>
            </View>
            <View style={styles.pill}>
              <Ionicons name="time-outline" size={12} color={palette.textMuted} />
              <Text style={styles.pillText}>{restaurant?.eta ?? '20-30 min'}</Text>
            </View>
            <Text style={styles.basePrice}>From ${displayPrice}</Text>
          </View>
          {restaurant?.description ? (
            <Text style={styles.description}>{restaurant.description}</Text>
          ) : null}
        </View>

        <Text style={styles.menuHeader}>Menu</Text>
        {menu.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => addItem({ id: item.id, name: `${displayName} · ${item.name}`, price: item.price })}
            style={({ pressed }) => [styles.menuRow, pressed && { opacity: 0.85 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuPrice}>${item.price}</Text>
            </View>
            <View style={styles.addBtn}>
              <Ionicons name="add" size={20} color="#FFF" />
            </View>
          </Pressable>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={({ pressed }) => [styles.viewCart, pressed && styles.viewCartPressed]}>
          <Text style={styles.viewCartText}>
            {totalCount > 0 ? `View Cart (${totalCount})` : 'Open Cart'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { paddingBottom: 24 },
  banner: {
    backgroundColor: palette.surfaceAlt,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerEmoji: { fontSize: 80 },
  headBlock: { padding: 20, gap: 6 },
  title: { fontSize: 24, fontWeight: '800', color: palette.text },
  meta: { fontSize: 14, color: palette.textMuted },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: palette.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  pillText: { fontSize: 12, color: palette.text, fontWeight: '600' },
  basePrice: { marginLeft: 'auto', fontSize: 14, fontWeight: '700', color: palette.primary },
  description: { fontSize: 14, color: palette.text, marginTop: 10, lineHeight: 20 },
  menuHeader: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginTop: 8,
    marginBottom: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  menuName: { fontSize: 15, color: palette.text, fontWeight: '600' },
  menuPrice: { fontSize: 13, color: palette.textMuted, marginTop: 2 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  viewCart: {
    backgroundColor: palette.text,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  viewCartPressed: { backgroundColor: palette.primaryDark },
  viewCartText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});
