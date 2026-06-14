import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useProjects } from '../context/ProjectsContext';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/Button';
import { COLORS, SIZES, FONTS } from '../theme/theme';

interface ProjectsScreenProps {
  navigation: any;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const { projects, loading } = useProjects();

  const handleProjectPress = (project: any) => {
    navigation.navigate('ProjectDetails', { project });
  };

  const handleAddProjectPress = () => {
    navigation.navigate('AddProject');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard project={item} onPress={() => handleProjectPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Brak projektów. Dodaj swój pierwszy projekt!</Text>
            </View>
          }
        />
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Dodaj projekt" 
            onPress={handleAddProjectPress} 
            variant="primary" 
          />
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl * 2, // extra spacing so the button doesn't block the last item
  },
  emptyContainer: {
    paddingVertical: SIZES.xxxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
});
