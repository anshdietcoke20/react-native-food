import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, signOut } = useAuth();
  const initials = (user?.name ?? 'F').charAt(0).toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
          <Text style={styles.email}>{user?.email ?? 'guest@foodapp.dev'}</Text>
        </View>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <Pressable
        onPress={() => {
          void signOut();
        }}
        style={({ pressed }) => [styles.logout, pressed && styles.logoutPressed]}>
        <Ionicons name="log-out-outline" size={20} color={palette.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: palette.surfaceAlt,
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#FFF', fontWeight: '800', fontSize: 26 },
  name: { fontSize: 17, fontWeight: '700', color: palette.text },
  email: { fontSize: 13, color: palette.textMuted, marginTop: 2 },
  items: { paddingHorizontal: 4 },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  logoutPressed: { backgroundColor: palette.surface },
  logoutText: { fontSize: 15, color: palette.danger, fontWeight: '700' },
});
