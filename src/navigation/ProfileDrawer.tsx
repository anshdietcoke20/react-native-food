import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import ProfileHomeScreen from '../screens/ProfileHomeScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { palette } from '../theme/colors';
import type { ProfileDrawerParamList } from './types';

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: palette.primary },
        headerTintColor: palette.headerText,
        headerTitleStyle: { fontWeight: '700' },
        drawerActiveTintColor: palette.primary,
        drawerInactiveTintColor: palette.text,
        drawerActiveBackgroundColor: palette.surfaceAlt,
        drawerLabelStyle: { fontWeight: '600', marginLeft: -10 },
      }}>
      <Drawer.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{
          title: 'My Orders',
          drawerIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
