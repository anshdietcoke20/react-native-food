import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  RestaurantDetail: { id: string; name?: string; price?: number };
  Cart: undefined;
};

export type ProfileDrawerParamList = {
  ProfileHome: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type MainTabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
  ProfileTab: NavigatorScreenParams<ProfileDrawerParamList>;
};

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
