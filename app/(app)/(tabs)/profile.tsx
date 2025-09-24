import BadgeCard from '@/components/achievement/BadgeCard/BadgeCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import WebContainer from '@/components/WebContainer';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Achievement } from '@/model/achievement/Achievement';
import { Badge } from '@/model/achievement/badge/Badge';
import { Challenge } from '@/model/challenge/Challenge';
import { Course } from '@/model/course/Course';
import { achievementService } from '@/services/achievement/achievementService';
import { challengeService } from '@/services/challenge/challengeService';
import { courseService } from '@/services/course/courseService';
import { beautifyText } from '@/utils/text-display';
import { Link, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const { isDark, toggleTheme } = useTheme();

  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      findAchievements();
      findChallenges();
      findCourses();
    }, [user])
  );

  const findAchievements = async () => {
    const achievements: Achievement[] = await achievementService.findByPersonId(user?.person.id!);
    setAchievements(achievements);
  }
  const findChallenges = async () => {
    const challenges: Challenge[] = await challengeService.findByPersonId(user?.person.id!);
    setChallenges(challenges);
  }
  const findCourses = async () => {
    const courses: Course[] = await courseService.findByPersonId(user?.person.id!);
    setCourses(courses);
  }

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container} useSafeArea>
      <View style={styles.header}>
        <Text style={[styles.title, { color: useThemeColor({}, 'text') }]}>Perfil</Text>
        <Link href="/(app)/(settings)" asChild>
          <TouchableOpacity>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Perfil del usuario */}
        <View style={[styles.profileCard, { backgroundColor: cardBg, borderColor: border }]}>
          <Image source={{ uri: user?.person.profilePicture }} style={styles.avatar} />
          <ThemedText style={[styles.userName, { color: text }]}>{beautifyText(user?.person.name)}</ThemedText>
          <ThemedText style={styles.userLocation}>{beautifyText(user?.person.area)}</ThemedText>
          <View style={{flexDirection:'row', gap: 10}}>
            <ThemedText style={styles.userXP}>Tareas: {challenges.length || '0'}</ThemedText>
            <ThemedText style={styles.userXP}>Lecciones: {courses.length || '0'}</ThemedText>
          </View>
        </View>

        {/* Logros */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: text }]}>Logros</ThemedText>
          <View style={styles.achievementsGrid}>
            {achievements.length === 0 && (
              <View style={{ opacity: 0.6, flexDirection: 'column', alignContent: 'center', width: '100%' }}>
                <Text style={[{ color: text, textAlign: 'center', fontSize: 18 }]}>
                  Comienza con pequeñas acciones.
                </Text>
                <Text style={[{ color: text, textAlign: 'center', fontSize: 18 }]}>
                  Verás aquí reflejados tus logros!
                </Text>
              </View>
            )}

            {achievements.map((achievement) => (
              <BadgeCard badge={achievement.badge} key={achievement.id} />
            ))}
          </View>
        </View>

        {/* Ajustes */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Ajustes</ThemedText>

          <TouchableOpacity
            style={[
              styles.settingCard,
              { backgroundColor: cardBg, borderColor: border }
            ]}
            onPress={toggleTheme}
          >
            <ThemedText style={styles.settingTitle}>Modo oscuro</ThemedText>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: border, true: primary }}
              thumbColor={isDark ? '#ffffff' : background}
            />
          </TouchableOpacity>

          <Button
            label="Cerrar Sesión"
            onPress={handleLogout}
            variant="secondary"
            style={[styles.logoutButton]}
          />
        </View>
      </WebContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  settingsIcon: {
    fontSize: 20,
  },
  profileCard: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    ...(Platform.OS === 'web' && {
      maxWidth: 400,
      alignSelf: 'center',
    }),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  userXP: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'space-between',
    }),
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
  }
});


