export const COLORS = {
  background: '#F8FAFC', // Slate 50 (very soft light gray background)
  card: '#FFFFFF',       // Pure white card background
  primary: '#4F46E5',    // Indigo 600 (Primary accent, tech-focused)
  secondary: '#06B6D4',  // Cyan 500 (Secondary accent)
  text: '#0F172A',       // Slate 900 (High contrast dark slate text)
  textSecondary: '#64748B', // Slate 500 (Subtle gray for captions/details)
  border: '#E2E8F0',     // Slate 200 (Soft dividing lines)
  inputBg: '#FFFFFF',    // White input background
  success: '#10B981',    // Emerald 500
  error: '#EF4444',      // Red 500
  white: '#FFFFFF',
  lightGray: '#F1F5F9',  // Slate 100 for secondary pill tags
  shadow: '#0F172A',     // Slate 900 tint for shadows
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONTS = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
};
