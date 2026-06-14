import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

interface SkillTagProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'neutral';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const SkillTag: React.FC<SkillTagProps> = ({
  label,
  variant = 'neutral',
  style,
  textStyle,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryBadge;
      case 'secondary':
        return styles.secondaryBadge;
      case 'neutral':
      default:
        return styles.neutralBadge;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'neutral':
      default:
        return styles.neutralText;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      <Text style={[styles.text, getTextStyle(), textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SIZES.md,
    paddingVertical: 6,
    borderRadius: 99,
    marginRight: SIZES.sm,
    marginBottom: SIZES.sm,
    borderWidth: 1,
  },
  primaryBadge: {
    backgroundColor: '#EEF2F6', // very soft blue gray
    borderColor: COLORS.primary,
  },
  secondaryBadge: {
    backgroundColor: '#ECFEFF', // light cyan
    borderColor: COLORS.secondary,
  },
  neutralBadge: {
    backgroundColor: COLORS.lightGray, // light gray
    borderColor: COLORS.border,
  },
  text: {
    fontSize: FONTS.xs,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.primary,
  },
  secondaryText: {
    color: COLORS.secondary,
  },
  neutralText: {
    color: COLORS.textSecondary,
  },
});
