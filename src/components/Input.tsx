import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  style,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const hasError = touched && !!error;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && styles.labelFocused, hasError && styles.labelError]}>
        {label}
      </Text>
      
      <TextInput
        style={[
          styles.textInput,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          style,
        ]}
        placeholderTextColor={COLORS.textSecondary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
      
      {hasError && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.sm,
    width: '100%',
  },
  label: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  labelFocused: {
    color: COLORS.primary,
  },
  labelError: {
    color: COLORS.error,
  },
  textInput: {
    height: 48,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.md,
    paddingHorizontal: SIZES.md,
    fontSize: FONTS.md,
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: COLORS.primary,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: FONTS.xs,
    color: COLORS.error,
    marginTop: SIZES.xs,
    fontWeight: '500',
  },
});
