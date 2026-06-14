import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export const ContactScreen = () => {
  const email = 'danilavialichka@gmail.com';
  const github = 'https://github.com/foodiby';
  const phone = '798 846 384';

  const handleContactPress = async (type: 'email' | 'github' | 'phone') => {
    let url = '';
    switch (type) {
      case 'email':
        url = `mailto:${email}`;
        break;
      case 'github':
        url = github;
        break;
      case 'phone':
        url = `tel:${phone.replace(/\s+/g, '')}`;
        break;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Błąd', `Nie można otworzyć aplikacji dla linku: ${url}`);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił problem podczas wywoływania akcji.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Contact Intro Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Skontaktuj się ze mną</Text>
          <Text style={styles.headerSub}>
            Jestem otwarty na nowe projekty, staże oraz współpracę. Wybierz dogodną dla siebie formę kontaktu!
          </Text>
        </View>

        {/* Contact Links List */}
        <View style={styles.contactsWrapper}>
          {/* Email Item */}
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactPress('email')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#EEF2F6' }]}>
              <Ionicons name="mail" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* GitHub Item */}
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactPress('github')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="logo-github" size={24} color={COLORS.text} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>GitHub</Text>
              <Text style={styles.value}>github.com/foodiby</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Phone Item */}
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactPress('phone')}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#ECFEFF' }]}>
              <Ionicons name="call" size={24} color={COLORS.secondary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Telefon</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SIZES.lg,
  },
  headerCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.lg,
    padding: SIZES.lg,
    marginBottom: SIZES.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: FONTS.xl,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  headerSub: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  contactsWrapper: {
    gap: SIZES.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.lg,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: FONTS.xs,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  value: {
    fontSize: FONTS.md,
    fontWeight: '700',
    color: COLORS.text,
  },
});
