// theme.js - StyleHub Design System

export const colors = {
  // Base Colors
  black: '#000000',
  white: '#FFFFFF',
  
  // Primary Colors (Green variants)
  primary50: '#f0f9ff',
  primary100: '#e0f2fe', 
  primary200: '#bae6fd',
  primary300: '#7dd3fc',
  primary400: '#38bdf8',
  primary500: '#0ea5e9', // Main primary
  primary600: '#0284c7',
  primary700: '#0369a1',
  primary800: '#075985',
  primary900: '#0c4a6e',
  
  // Secondary Colors (Orange/Red variants) 
  secondary50: '#fef2f2',
  secondary100: '#fee2e2',
  secondary200: '#fecaca',
  secondary300: '#fca5a5',
  secondary400: '#f87171',
  secondary500: '#ef4444', // Main secondary
  secondary600: '#dc2626',
  secondary700: '#b91c1c',
  secondary800: '#991b1b',
  secondary900: '#7f1d1d',
  
  // Accent Colors
  accent: {
    green: {
      50: '#f0fdf4',
      100: '#dcfce7', 
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main green
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe', 
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    yellow: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308', // Main yellow
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Main red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  
  // Neutral/Gray Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic Colors
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },
  
  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    inverse: '#FFFFFF',
  },
  
  // Border Colors
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  }
};

export const typography = {
  fontFamily: {
    heading: 'Clash Display', // Custom font from the design
    body: 'System', // Default system font
  },
  
  fontSizes: {
    // From the typography section in the image
    heading1: 30, // 30/42
    heading2: 24, // 24/32  
    heading3: 20, // 20/28
    bodyLarge: 18, // 18/28
    bodyMedium: 16, // 16/24
    bodySmall: 14, // 14/20
    caption: 12, // 12/16
  },
  
  lineHeights: {
    heading1: 42,
    heading2: 32,
    heading3: 28, 
    bodyLarge: 28,
    bodyMedium: 24,
    bodySmall: 20,
    caption: 16,
  },
  
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  xxxxxl: 48,
  xxxxxxl: 64,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
};

// Button variants from the design
export const buttonVariants = {
  primary: {
    backgroundColor: colors.accent.green[500],
    color: colors.white,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: colors.accent.green[500],
    borderColor: colors.accent.green[500],
    borderWidth: 1,
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.text.primary,
    borderColor: colors.border.medium,
    borderWidth: 1,
  },
};

// Component sizes
export const componentSizes = {
  button: {
    small: {
      height: 32,
      paddingHorizontal: 16,
      fontSize: typography.fontSizes.bodySmall,
    },
    medium: {
      height: 40,
      paddingHorizontal: 20,
      fontSize: typography.fontSizes.bodyMedium,
    },
    large: {
      height: 48,
      paddingHorizontal: 24,
      fontSize: typography.fontSizes.bodyLarge,
    },
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: typography.fontSizes.bodyMedium,
    borderRadius: borderRadius.md,
  },
};

// Export everything as a single theme object (optional)
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  buttonVariants,
  componentSizes,
};