import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';
import type { ProfileDrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<ProfileDrawerParamList, 'ProfileHome'>;

export default function ProfileHomeScreen({ navigation }: Props) {
  const { user } = useAuth();

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={openDrawer} hitSlop={8} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={palette.text} />
        </Pressable>
        <Text style={styles.topTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() ?? 'F'}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
          <Text style={styles.email}>{user?.email ?? 'guest@foodapp.dev'}</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick links</Text>
        <Pressable
          onPress={() => navigation.navigate('MyOrders')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <Ionicons name="receipt-outline" size={20} color={palette.primary} />
          <Text style={styles.rowText}>My Orders</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Settings')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <Ionicons name="settings-outline" size={20} color={palette.primary} />
          <Text style={styles.rowText}>Settings</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Help')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <Ionicons name="help-circle-outline" size={20} color={palette.primary} />
          <Text style={styles.rowText}>Help</Text>
          <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  menuBtn: { padding: 4 },
  topTitle: { fontSize: 18, fontWeight: '700', color: palette.text },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: palette.surface,
    borderRadius: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#FFF' },
  name: { fontSize: 18, fontWeight: '800', color: palette.text },
  email: { fontSize: 13, color: palette.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 13, color: palette.textMuted, fontWeight: '700', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: palette.surface,
    borderRadius: 12,
    marginBottom: 8,
  },
  rowPressed: { opacity: 0.85 },
  rowText: { flex: 1, fontSize: 15, fontWeight: '600', color: palette.text },
});
