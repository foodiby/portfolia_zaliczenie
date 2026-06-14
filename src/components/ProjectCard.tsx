import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Project } from '../context/ProjectsContext';
import { COLORS, SIZES, FONTS, SHADOWS } from '../theme/theme';
import { SkillTag } from './SkillTag';
import { Ionicons } from '@expo/vector-icons';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {project.title}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {project.description}
      </Text>

      <View style={styles.tagContainer}>
        {project.technologies.slice(0, 3).map((tech, idx) => (
          <SkillTag key={idx} label={tech} variant="primary" />
        ))}
        {project.technologies.length > 3 && (
          <Text style={styles.moreText}>+{project.technologies.length - 3}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.md,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  title: {
    fontSize: FONTS.lg,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    marginRight: SIZES.sm,
  },
  description: {
    fontSize: FONTS.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SIZES.md,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  moreText: {
    fontSize: FONTS.xs,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
    marginBottom: SIZES.xs,
  },
});
