import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { restaurants, type Restaurant } from '../data/restaurants';
import { palette } from '../theme/colors';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { totalCount } = useCart();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.hello}>Hi{user?.name ? `, ${user.name}` : ''}</Text>
          <Text style={styles.subline}>What are you hungry for?</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartBtn}
          hitSlop={8}>
          <Ionicons name="bag-handle-outline" size={22} color={palette.text} />
          {totalCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Popular near you</Text>
        }
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

function RestaurantCard({ restaurant, onPress }: { restaurant: Restaurant; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.98 }] }]}>
      <View style={styles.cardBanner}>
        <Text style={styles.bannerEmoji}>{restaurant.banner}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{restaurant.name}</Text>
        <Text style={styles.cardMeta}>{restaurant.cuisine}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.pill}>
            <Ionicons name="star" size={12} color={palette.accent} />
            <Text style={styles.pillText}>{restaurant.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.pill}>
            <Ionicons name="time-outline" size={12} color={palette.textMuted} />
            <Text style={styles.pillText}>{restaurant.eta}</Text>
          </View>
          <Text style={styles.cardPrice}>${restaurant.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  headerRow: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hello: { fontSize: 20, fontWeight: '700', color: palette.text },
  subline: { fontSize: 13, color: palette.textMuted, marginTop: 2 },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: palette.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: palette.text, marginBottom: 12 },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardBanner: {
    width: 96,
    backgroundColor: palette.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerEmoji: { fontSize: 44 },
  cardBody: { flex: 1, padding: 14, gap: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  cardMeta: { fontSize: 13, color: palette.textMuted },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: palette.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  pillText: { fontSize: 12, color: palette.text, fontWeight: '600' },
  cardPrice: { marginLeft: 'auto', fontSize: 14, fontWeight: '700', color: palette.primary },
});
