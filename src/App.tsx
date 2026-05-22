import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AuthStack from './navigation/AuthStack';
import MainTabs from './navigation/MainTabs';
import OnboardingScreen from './screens/OnboardingScreen';
import { linking } from './navigation/linking';
import { palette } from './theme/colors';
import type { RootStackParamList } from './navigation/types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary,
    background: palette.background,
    card: palette.background,
    text: palette.text,
    border: palette.border,
    notification: palette.primary,
  },
};

function RootNavigator() {
  const { isBootstrapping, isAuthenticated, hasSeenOnboarding } = useAuth();

  if (isBootstrapping) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthStack />;
  }

  return (
    <RootStack.Navigator
      initialRouteName={hasSeenOnboarding ? 'MainTabs' : 'Onboarding'}
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="MainTabs" component={MainTabs} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <CartProvider>
            <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
            <NavigationContainer linking={linking} theme={navTheme}>
              <RootNavigator />
            </NavigationContainer>
          </CartProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.background,
  },
});
