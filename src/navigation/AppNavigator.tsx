import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ProjectDetailsScreen } from '../screens/ProjectDetailsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { AddProjectScreen } from '../screens/AddProjectScreen';

// Import Theme
import { COLORS, FONTS } from '../theme/theme';

export type RootStackParamList = {
  MainTabs: undefined;
  ProjectDetails: { project: any };
  AddProject: undefined;
};

export type TabParamList = {
  ProfileTab: undefined;
  ProjectsTab: undefined;
  ContactTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Bottom Tabs Navigator
const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.prototype.state | string;

          if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'ProjectsTab') {
            iconName = focused ? 'code-slash' : 'code-slash-outline';
          } else if (route.name === 'ContactTab') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: COLORS.card,
          shadowColor: 'transparent', // remove shadow on iOS
          elevation: 0, // remove shadow on Android
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTitleStyle: {
          color: COLORS.text,
          fontSize: FONTS.lg,
          fontWeight: '700',
        },
        headerTintColor: COLORS.primary,
      })}
    >
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
      <Tab.Screen
        name="ProjectsTab"
        component={ProjectsScreen}
        options={{ title: 'Projekty' }}
      />
      <Tab.Screen
        name="ContactTab"
        component={ContactScreen}
        options={{ title: 'Kontakt' }}
      />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.card,
          },
          headerTitleStyle: {
            color: COLORS.text,
            fontSize: FONTS.lg,
            fontWeight: '700',
          },
          headerTintColor: COLORS.primary,
          headerBackTitle: '',
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProjectDetails"
          component={ProjectDetailsScreen}
          options={{ title: 'Szczegóły Projektu' }}
        />
        <Stack.Screen
          name="AddProject"
          component={AddProjectScreen}
          options={{
            title: 'Dodaj Projekt',
            presentation: 'modal', // slides up on iOS as a modal sheet
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
