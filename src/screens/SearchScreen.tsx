import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { restaurants } from '../data/restaurants';
import { palette } from '../theme/colors';
import type { MainTabsParamList } from '../navigation/types';

export default function SearchScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return restaurants;
    return restaurants.filter(
      (r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.heading}>Search</Text>
      <View style={styles.inputWrap}>
        <Ionicons name="search" size={18} color={palette.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search restaurants or cuisines"
          placeholderTextColor={palette.textMuted}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 4 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('HomeTab', {
                screen: 'RestaurantDetail',
                params: { id: item.id, name: item.name, price: item.price },
              })
            }
            style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}>
            <Text style={styles.emoji}>{item.banner}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.meta}>{item.cuisine}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No restaurants match “{query}”</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  heading: { fontSize: 22, fontWeight: '800', color: palette.text, paddingHorizontal: 20, paddingTop: 8 },
  inputWrap: {
    margin: 20,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: palette.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 15, color: palette.text },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.surface,
    borderRadius: 12,
    padding: 12,
  },
  emoji: { fontSize: 30 },
  title: { fontSize: 15, fontWeight: '700', color: palette.text },
  meta: { fontSize: 12, color: palette.textMuted, marginTop: 2 },
  empty: { textAlign: 'center', color: palette.textMuted, marginTop: 32 },
});
