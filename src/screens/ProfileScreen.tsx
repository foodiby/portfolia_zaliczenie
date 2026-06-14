import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../theme/theme';
import { SkillTag } from '../components/SkillTag';

const SKILLS = [
  'Java',
  'SpringBoot',
  'React Native',
  'JavaScript',
  'Git',
  'TypeScript',
  'SQL',
  'REST API',
];

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card Header */}
        <View style={styles.profileCard}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Danila Vialichka</Text>
          <Text style={styles.major}>Student Informatyki</Text>
          <Text style={styles.university}>Akademia Śląska</Text>
        </View>

        {/* About Me Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>O mnie</Text>
          <Text style={styles.bioText}>
            Jestem studentem Informatyki na Akademii Śląskiej. Moją pasją jest projektowanie 
            i tworzenie nowoczesnych aplikacji mobilnych oraz wydajnych systemów backendowych. 
            Specjalizuję się w technologiach takich jak Java Spring Boot oraz React Native. 
            Dbam o czystość kodu, dobre praktyki i stale poszerzam wiedzę, poznając nowe rozwiązania programistyczne.
          </Text>
        </View>

        {/* Skills Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Umiejętności</Text>
          <View style={styles.skillsContainer}>
            {SKILLS.map((skill, index) => (
              <SkillTag 
                key={index} 
                label={skill} 
                variant={skill === 'React Native' || skill === 'Java' || skill === 'SpringBoot' ? 'primary' : 'neutral'} 
              />
            ))}
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: SIZES.lg,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.xl,
    paddingVertical: SIZES.xxl,
    paddingHorizontal: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SIZES.md,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: FONTS.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  major: {
    fontSize: FONTS.md,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  university: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.lg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.md,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.border,
    paddingBottom: SIZES.xs,
  },
  bioText: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.xs,
  },
});
