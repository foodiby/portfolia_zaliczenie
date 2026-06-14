import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useProjects } from '../context/ProjectsContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { COLORS, SIZES, FONTS } from '../theme/theme';

interface AddProjectScreenProps {
  route: any;
  navigation: any;
}

export const AddProjectScreen: React.FC<AddProjectScreenProps> = ({ route, navigation }) => {
  const { addProject, updateProject } = useProjects();

  const projectToEdit = route.params?.project;
  const isEdit = !!projectToEdit;

  // Set Navigation options dynamically
  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edytuj Projekt' : 'Dodaj Projekt',
    });
  }, [navigation, isEdit]);

  // Form states
  const [title, setTitle] = useState(projectToEdit?.title || '');
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [technologies, setTechnologies] = useState(projectToEdit?.technologies?.join(', ') || '');
  const [githubUrl, setGithubUrl] = useState(projectToEdit?.githubUrl || '');

  // Touched states for inline validations
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    technologies: false,
    githubUrl: false,
  });

  // Validation errors
  const errors = {
    title: !title.trim()
      ? 'Tytuł projektu jest wymagany.'
      : title.trim().length < 3
      ? 'Tytuł musi mieć co najmniej 3 znaki.'
      : '',
    description: !description.trim()
      ? 'Opis projektu jest wymagany.'
      : description.trim().length < 10
      ? 'Opis musi mieć co najmniej 10 znaków.'
      : '',
    technologies: !technologies.trim()
      ? 'Podaj chociaż jedną technologię.'
      : technologies.trim().length < 2
      ? 'Nazwa technologii musi mieć co najmniej 2 znaki.'
      : '',
    githubUrl: githubUrl.trim() && !/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(githubUrl.trim())
      ? 'Wprowadź prawidłowy adres URL repozytorium GitHub.'
      : '',
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    // Mark all fields as touched to display errors
    setTouched({
      title: true,
      description: true,
      technologies: true,
      githubUrl: true,
    });

    // Check if any error is active
    const hasErrors = Object.values(errors).some((err) => err !== '');
    if (hasErrors) {
      Alert.alert('Błąd walidacji', 'Proszę poprawić błędy w formularzu przed zapisem.');
      return;
    }

    setSaving(true);
    // Parse technologies (comma-separated)
    const techArray = technologies
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t !== '');

    let success = false;
    if (isEdit) {
      success = await updateProject(projectToEdit.id, {
        title: title.trim(),
        description: description.trim(),
        technologies: techArray,
        githubUrl: githubUrl.trim() || undefined,
      });
    } else {
      success = await addProject({
        title: title.trim(),
        description: description.trim(),
        technologies: techArray,
        githubUrl: githubUrl.trim() || undefined,
      });
    }

    setSaving(false);

    if (success) {
      Alert.alert(
        'Sukces',
        isEdit ? 'Projekt został pomyślnie zaktualizowany!' : 'Projekt został pomyślnie dodany!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              if (isEdit) {
                // Return the updated project to ProjectDetailsScreen so it updates there immediately
                navigation.navigate('ProjectDetails', { 
                  project: {
                    id: projectToEdit.id,
                    title: title.trim(),
                    description: description.trim(),
                    technologies: techArray,
                    githubUrl: githubUrl.trim() || undefined,
                  } 
                });
              } else {
                navigation.goBack();
              }
            } 
          }
        ]
      );
    } else {
      Alert.alert('Błąd', 'Nie udało się zapisać projektu w pamięci urządzenia.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.headerTitle}>{isEdit ? 'Edytuj Projekt' : 'Nowy Projekt'}</Text>
          <Text style={styles.headerSub}>
            {isEdit 
              ? 'Popraw poniższe dane, aby zaktualizować swój projekt w portfolio.' 
              : 'Wypełnij poniższe dane, aby dodać projekt do swojego portfolio.'
            }
          </Text>

          <View style={styles.formCard}>
            {/* Title Input */}
            <Input
              label="Tytuł projektu *"
              placeholder="np. E-Commerce Backend API"
              value={title}
              onChangeText={setTitle}
              onBlur={() => handleBlur('title')}
              error={errors.title}
              touched={touched.title}
            />

            {/* Description Input */}
            <Input
              label="Opis projektu *"
              placeholder="Opisz krótko cel projektu, architekturę i funkcjonalności..."
              value={description}
              onChangeText={setDescription}
              onBlur={() => handleBlur('description')}
              error={errors.description}
              touched={touched.description}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            {/* Technologies Input */}
            <Input
              label="Technologie (oddzielone przecinkami) *"
              placeholder="np. Spring Boot, Java, PostgreSQL"
              value={technologies}
              onChangeText={setTechnologies}
              onBlur={() => handleBlur('technologies')}
              error={errors.technologies}
              touched={touched.technologies}
            />

            {/* GitHub URL Input */}
            <Input
              label="Link do repozytorium GitHub (opcjonalnie)"
              placeholder="https://github.com/uzytkownik/projekt"
              value={githubUrl}
              onChangeText={setGithubUrl}
              onBlur={() => handleBlur('githubUrl')}
              error={errors.githubUrl}
              touched={touched.githubUrl}
              autoCapitalize="none"
              keyboardType="url"
            />

            <View style={styles.actions}>
              <Button
                title={isEdit ? 'Zapisz zmiany' : 'Zapisz projekt'}
                onPress={handleSubmit}
                loading={saving}
                disabled={saving}
                style={styles.saveBtn}
              />
              <Button
                title="Anuluj"
                onPress={() => navigation.goBack()}
                variant="secondary"
                disabled={saving}
                style={styles.cancelBtn}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    padding: SIZES.lg,
  },
  headerTitle: {
    fontSize: FONTS.xxl,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.lg,
    padding: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.xl,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: SIZES.sm,
  },
  actions: {
    marginTop: SIZES.md,
  },
  saveBtn: {
    marginBottom: SIZES.xs,
  },
  cancelBtn: {
    marginTop: SIZES.xs,
  },
});
