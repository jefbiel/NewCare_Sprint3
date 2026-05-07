/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';


const PALETTE = {
  background: '#EEF7FF',
  surface: '#FFFFFF',
  card: '#F7FBFF',
  text: '#0B2545',
  muted: '#5D7F9C',
  border: '#C8E2F6',
  primary: '#087EC1',
  primarySoft: '#D8F0FF',
  secondary: '#00A6D6',
  secondarySoft: '#E0F7FF',
  accent: '#0B4EA2',
  accentSoft: '#E8F1FF',
  success: '#0C89C6',
  successSoft: '#EAF7FF',
  warning: '#F59E0B',
  warningSoft: '#FFF7E6',
  danger: '#EF4444',
};

export const Colors = {
  light: {
    text: PALETTE.text,
    background: PALETTE.background,
    surface: PALETTE.surface,
    card: PALETTE.card,
    muted: PALETTE.muted,
    border: PALETTE.border,
    primary: PALETTE.primary,
    tint: PALETTE.primary,
    primarySoft: PALETTE.primarySoft,
    secondary: PALETTE.secondary,
    secondarySoft: PALETTE.secondarySoft,
    accent: PALETTE.accent,
    accentSoft: PALETTE.accentSoft,
    success: PALETTE.success,
    successSoft: PALETTE.successSoft,
    warning: PALETTE.warning,
    warningSoft: PALETTE.warningSoft,
    danger: PALETTE.danger,
    highlight: PALETTE.accent,
    icon: PALETTE.text,
    tabIconDefault: PALETTE.muted,
    tabIconSelected: PALETTE.primary,
  },
  dark: {
    text: '#F8FAFC',
    background: '#061522',
    surface: '#0B2238',
    card: '#102D49',
    muted: '#A6C1D9',
    border: '#214B70',
    primary: PALETTE.primary,
    tint: PALETTE.primary,
    secondary: PALETTE.secondary,
    primarySoft: '#0B3A5B',
    secondarySoft: '#073B55',
    accent: PALETTE.accent,
    accentSoft: '#102E66',
    success: PALETTE.success,
    successSoft: '#0D344F',
    warning: PALETTE.warning,
    warningSoft: '#3B2A12',
    danger: PALETTE.danger,
    highlight: PALETTE.accent,
    icon: '#F8FAFC',
    tabIconDefault: '#A3B3C7',
    tabIconSelected: PALETTE.primary,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
