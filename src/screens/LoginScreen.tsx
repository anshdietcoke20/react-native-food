import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.brand}>🍔 FoodApp</Text>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Log in to your account.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={palette.textMuted}
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={palette.textMuted}
              style={styles.input}
            />

            <Pressable
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
              onPress={handleLogin}
              disabled={submitting}>
              <Text style={styles.ctaText}>{submitting ? 'Signing in…' : 'Login'}</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Signup')} style={styles.linkRow}>
              <Text style={styles.linkText}>New here? Create an account</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24, gap: 24 },
  header: { alignItems: 'center', marginTop: 24, gap: 6 },
  brand: { fontSize: 28, fontWeight: '800', color: palette.primary, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: palette.text },
  subtitle: { fontSize: 14, color: palette.textMuted, textAlign: 'center' },
  form: { gap: 8 },
  label: { fontSize: 13, color: palette.textMuted, marginTop: 8 },
  input: {
    backgroundColor: palette.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: palette.text,
    borderWidth: 1,
    borderColor: palette.border,
  },
  cta: {
    marginTop: 16,
    backgroundColor: palette.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaPressed: { backgroundColor: palette.primaryDark },
  ctaText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  linkRow: { paddingVertical: 12, alignItems: 'center' },
  linkText: { color: palette.primary, fontWeight: '600' },
});
