import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WebContainer } from '@/components/WebContainer';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { capitalizeFirstLetter } from '@/utils/text-display';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LessonsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const primary = useThemeColor({}, 'primary');
  const { width } = Dimensions.get('window');
  const isTablet = width >= 768;

  return (
    <ThemedView style={styles.container} useSafeArea>
      <WebContainer scrollable maxWidth={isTablet ? 800 : 600}>
        {/* Header con perfil de usuario */}
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: textColor }]}>EcoTrack</Text>
          <TouchableOpacity onPress={() => router.push('/(app)/(settings)')} style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Perfil de usuario */}
        <TouchableOpacity
          style={[styles.profileCard, { backgroundColor: cardBg, borderColor: border }]}
          onPress={() => router.push('/progress')}
          activeOpacity={0.7}
          accessibilityLabel="Ver mi progreso"
          accessibilityHint="Toca para ver tu progreso detallado y estadísticas"
        >
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user?.person.profilePicture }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>{capitalizeFirstLetter(user?.person.name!)}</ThemedText>
              <ThemedText style={styles.userLevel}>Area: {capitalizeFirstLetter(user?.person.area!)}</ThemedText>
            </View>
          </View>
        </TouchableOpacity>

        {/* Resumen */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Resumen</ThemedText>

          {/* Lecciones */}
          <TouchableOpacity
            style={[styles.summaryCard, { backgroundColor: cardBg, borderColor: border }]}
            onPress={() => router.push('/lessons')}
          >
            <View style={styles.summaryContent}>
              <View style={styles.summaryText}>
                <ThemedText style={styles.summaryLabel}>Lecciones</ThemedText>
                <ThemedText style={styles.summaryTitle}>2 lecciones pendientes</ThemedText>
                <ThemedText style={styles.summaryDesc}>Completa las lecciones para aprender a cuidar el planeta!</ThemedText>
              </View>
              <View style={[styles.summaryIcon, { backgroundColor: background }]}>
                <Text style={styles.iconText}>📚</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Tareas */}
          <TouchableOpacity
            style={[styles.summaryCard, { backgroundColor: cardBg, borderColor: border }]}
            onPress={() => router.push('/challenges')}
          >
            <View style={styles.summaryContent}>
              <View style={styles.summaryText}>
                <ThemedText style={styles.summaryLabel}>Tareas</ThemedText>
                <ThemedText style={styles.summaryTitle}>3 tareas pendientes</ThemedText>
                <ThemedText style={styles.summaryDesc}>Realiza acciones que mejoren tu huella de cabono!</ThemedText>
              </View>
              <View style={[styles.summaryIcon, { backgroundColor: background }]}>
                <Text style={styles.iconText}>🌿</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Recompensas */}
          <TouchableOpacity
            style={[styles.summaryCard, { backgroundColor: cardBg, borderColor: border }]}
            onPress={() => router.push('/profile')}
          >
            <View style={styles.summaryContent}>
              <View style={styles.summaryText}>
                <ThemedText style={styles.summaryLabel}>Logros</ThemedText>
                <ThemedText style={styles.summaryTitle}>3 recompensas ganadas</ThemedText>
                <ThemedText style={styles.summaryDesc}>Mira los logros obtenidos en el perfil</ThemedText>
              </View>
              <View style={[styles.summaryIcon, { backgroundColor: background }]}>
                <Text style={styles.iconText}>🏆</Text>
              </View>
            </View>
          </TouchableOpacity>


        </View>

        {/* Acciones rápidas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Acciones</ThemedText>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: primary }]}
              onPress={() => router.push('/(app)/(challenges)/form')}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Registrar tarea</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: cardBg, borderColor: border, borderWidth: 1 }]}
              onPress={() => router.push('/lesson-topics')}
              activeOpacity={0.8}
            >
              <Text style={[styles.actionButtonText, { color: textColor }]}>Registrar lección</Text>
            </TouchableOpacity>
          </View>
        </View>
      </WebContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    marginTop: 2,
    opacity: 0.8,
  },
  userXP: {
    fontSize: 16,
    marginTop: 2,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
    ...(Platform.OS === 'web' && {
      maxWidth: 800,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
    opacity: 0.7,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  summaryDesc: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.8,
    lineHeight: 20,
  },
  summaryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
      flexWrap: 'wrap',
    }),
  },
  actionButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    ...(Platform.OS === 'web' && {
      minWidth: 200,
      maxWidth: 300,
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  socialButton: {
    width: '48%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    ...(Platform.OS === 'web' && {
      minWidth: 150,
      maxWidth: 200,
      cursor: 'pointer' as any,
      transition: 'all 0.2s ease',
    }),
  },
  socialIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
