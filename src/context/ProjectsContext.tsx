import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Omit<Project, 'id'>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateProject: (id: string, updatedProjData: Omit<Project, 'id'>) => Promise<boolean>;
}

const STORAGE_KEY = '@student_portfolio_projects';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Portfolio Studenta',
    description: 'Nowoczesna i estetyczna aplikacja mobilna stworzona w React Native z użyciem Expo, prezentująca portfolio studenta. Zawiera informacje o profilu, umiejętnościach, projektach oraz formularz dodawania nowych projektów z lokalną retencją danych.',
    technologies: ['React Native', 'Expo', 'React Navigation', 'AsyncStorage', 'TypeScript'],
    githubUrl: 'https://github.com/foodiby/portfolio-studenta',
  },
];

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load projects from AsyncStorage on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const storedProjects = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedProjects !== null) {
          setProjects(JSON.parse(storedProjects));
        } else {
          // If no stored data, initialize with default projects and save it
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (error) {
        console.error('Failed to load projects from storage:', error);
        // Fallback to default in case of error
        setProjects(DEFAULT_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Add a new project and save to AsyncStorage
  const addProject = async (newProjData: Omit<Project, 'id'>): Promise<boolean> => {
    try {
      const newProject: Project = {
        ...newProjData,
        id: Date.now().toString(), // simple unique id
      };
      const updatedProjects = [newProject, ...projects]; // Prepend so new projects appear at the top
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      return true;
    } catch (error) {
      console.error('Failed to save project:', error);
      return false;
    }
  };

  // Delete a project and update AsyncStorage
  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      const updatedProjects = projects.filter((p) => p.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      return true;
    } catch (error) {
      console.error('Failed to delete project:', error);
      return false;
    }
  };

  // Update a project and update AsyncStorage
  const updateProject = async (id: string, updatedProjData: Omit<Project, 'id'>): Promise<boolean> => {
    try {
      const updatedProjects = projects.map((p) => {
        if (p.id === id) {
          return { ...updatedProjData, id };
        }
        return p;
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      return true;
    } catch (error) {
      console.error('Failed to update project:', error);
      return false;
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, loading, addProject, deleteProject, updateProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
