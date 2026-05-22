import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const { completeOnboarding } = useAuth();

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.replace('MainTabs', { screen: 'HomeTab', params: { screen: 'HomeList' } });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>🍱</Text>
          <Text style={styles.title}>Hungry?</Text>
          <Text style={styles.subtitle}>
            Order from the best local restaurants{'\n'}delivered fast to your door.
          </Text>
        </View>

        <View style={styles.features}>
          <Feature emoji="🛵" label="Free delivery on your first order" />
          <Feature emoji="⭐" label="Top-rated chefs in your area" />
          <Feature emoji="⏱️" label="Real-time order tracking" />
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={handleGetStarted}>
          <Text style={styles.ctaText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Feature({ emoji, label }: { emoji: string; label: string }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.surfaceAlt },
  container: { flex: 1, paddingHorizontal: 24, paddingVertical: 24, justifyContent: 'space-between' },
  hero: { alignItems: 'center', marginTop: 32 },
  emoji: { fontSize: 96, marginBottom: 16 },
  title: { fontSize: 40, fontWeight: '800', color: palette.text },
  subtitle: { marginTop: 12, fontSize: 16, color: palette.textMuted, textAlign: 'center', lineHeight: 22 },
  features: { gap: 14 },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: palette.background,
    borderRadius: 14,
    padding: 14,
  },
  featureEmoji: { fontSize: 24 },
  featureLabel: { fontSize: 15, color: palette.text, flex: 1 },
  cta: {
    backgroundColor: palette.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaPressed: { backgroundColor: palette.primaryDark },
  ctaText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
});
