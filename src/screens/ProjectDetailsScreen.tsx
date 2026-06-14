import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Linking, Alert } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../theme/theme';
import { SkillTag } from '../components/SkillTag';
import { Button } from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useProjects } from '../context/ProjectsContext';

interface ProjectDetailsScreenProps {
  route: any;
  navigation: any;
}

export const ProjectDetailsScreen: React.FC<ProjectDetailsScreenProps> = ({ route, navigation }) => {
  const { projects, deleteProject } = useProjects();
  const { project: initialProject } = route.params;

  // Reactively fetch the latest version of the project from context if it updates
  const project = projects.find((p) => p.id === initialProject.id) || initialProject;

  const handleEdit = () => {
    navigation.navigate('AddProject', { project });
  };

  const handleDelete = () => {
    Alert.alert(
      'Usuń projekt',
      'Czy na pewno chcesz trwale usunąć ten projekt ze swojego portfolio?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteProject(project.id);
            if (success) {
              Alert.alert('Sukces', 'Projekt został pomyślnie usunięty.', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } else {
              Alert.alert('Błąd', 'Nie udało się usunąć projektu.');
            }
          },
        },
      ]
    );
  };

  const handleOpenGitHub = async () => {
    if (!project.githubUrl) return;

    try {
      const supported = await Linking.canOpenURL(project.githubUrl);
      if (supported) {
        await Linking.openURL(project.githubUrl);
      } else {
        Alert.alert('Błąd', `Nie można otworzyć linku: ${project.githubUrl}`);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił problem podczas otwierania odnośnika.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Project Main Card */}
        <View style={styles.detailCard}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{project.title}</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Opis projektu</Text>
          <Text style={styles.descriptionText}>{project.description}</Text>

          <Text style={styles.sectionTitle}>Użyte technologie</Text>
          <View style={styles.tagContainer}>
            {project.technologies.map((tech: string, index: number) => (
              <SkillTag key={index} label={tech} variant="secondary" />
            ))}
          </View>
        </View>

        {/* GitHub repository CTA */}
        {project.githubUrl ? (
          <View style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <Ionicons name="logo-github" size={24} color={COLORS.primary} style={styles.actionIcon} />
              <View>
                <Text style={styles.actionTitle}>Kod źródłowy</Text>
                <Text style={styles.actionSub}>Dostępny na Twoim koncie GitHub</Text>
              </View>
            </View>
            <Button
              title="Zobacz repozytorium GitHub"
              onPress={handleOpenGitHub}
              variant="primary"
              style={styles.actionBtn}
            />
          </View>
        ) : (
          <View style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <Ionicons name="information-circle-outline" size={24} color={COLORS.textSecondary} style={styles.actionIcon} />
              <View>
                <Text style={styles.actionTitle}>Kod źródłowy</Text>
                <Text style={styles.actionSub}>Projekt nie posiada linku do repozytorium</Text>
              </View>
            </View>
          </View>
        )}

        {/* Project Actions (Edit / Delete) */}
        <View style={styles.actionsCard}>
          <Button
            title="Edytuj projekt"
            onPress={handleEdit}
            variant="secondary"
            style={styles.editBtn}
          />
          <Button
            title="Usuń projekt"
            onPress={handleDelete}
            variant="danger"
            style={styles.deleteBtn}
          />
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
  detailCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.xl,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  headerRow: {
    marginBottom: SIZES.md,
  },
  title: {
    fontSize: FONTS.xxl,
    fontWeight: '800',
    color: COLORS.text,
    lineHeight: 32,
  },
  sectionTitle: {
    fontSize: FONTS.md,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.xs,
  },
  actionCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.lg,
    padding: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  actionIcon: {
    marginRight: SIZES.md,
  },
  actionTitle: {
    fontSize: FONTS.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  actionSub: {
    fontSize: FONTS.xs,
    color: COLORS.textSecondary,
  },
  actionBtn: {
    marginVertical: 0,
    marginTop: SIZES.xs,
  },
  actionsCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.lg,
    padding: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SIZES.lg,
    ...SHADOWS.small,
  },
  editBtn: {
    marginVertical: SIZES.xs,
  },
  deleteBtn: {
    marginVertical: SIZES.xs,
  },
});
