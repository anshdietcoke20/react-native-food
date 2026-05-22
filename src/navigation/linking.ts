import * as Linking from 'expo-linking';
import type { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'foodapp://', 'https://fooddelivery.app'],
  config: {
    screens: {
      Onboarding: 'onboarding',
      MainTabs: {
        screens: {
          HomeTab: {
            screens: {
              HomeList: 'home',
              RestaurantDetail: 'restaurant/:id',
              Cart: 'cart',
            },
          },
          Search: 'search',
          Orders: 'orders',
          ProfileTab: {
            screens: {
              ProfileHome: 'profile',
              MyOrders: 'profile/orders',
              Settings: 'profile/settings',
              Help: 'profile/help',
            },
          },
        },
      },
    },
  },
};
