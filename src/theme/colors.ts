export const palette = {
  primary: '#FF6B35',
  primaryDark: '#E85A2B',
  accent: '#FFB627',
  background: '#FFFFFF',
  surface: '#F7F7F9',
  surfaceAlt: '#FFF3EC',
  border: '#E6E6EA',
  text: '#1E1E1E',
  textMuted: '#6B6B70',
  success: '#2BB673',
  danger: '#E03A3A',
  headerText: '#FFFFFF',
} as const;

export type Palette = typeof palette;
