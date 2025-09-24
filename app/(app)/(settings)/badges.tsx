import AchievementCard from '@/components/achievement/AchievementCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Badge } from '@/model/achievement/badge/Badge';
import { EcoCategoryEnum } from '@/model/enumerated/EcoCategoryEnum';
import { badgeService } from '@/services/achievement/badgeService';
import { translateEcoCategory } from '@/utils/text-display';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BadgesScreen() {

  const { user } = useAuth();
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      findBadges();
    }, [badges])
  );

  const findBadges = async () => {
    const badges: Badge[] = await badgeService.findAll();
    setBadges(badges);
  }

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EcoCategoryEnum>();

  const text = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  const categories = Object.values(EcoCategoryEnum);

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchText.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || badge.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Medallas</Text>
        <TouchableOpacity onPress={() => router.push('/(app)/(achievements)/form')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <WebContainer scrollable maxWidth={1000}>

        {/* Filtros */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Filtros</ThemedText>

          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Buscar metas..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtros de estado y prioridad */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryFilters}>
              <TouchableOpacity
                style={[
                  styles.categoryFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  !selectedCategory && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                ]}
                onPress={() => setSelectedCategory(undefined)}
              >
                <Text style={[
                  styles.categoryFilterText,
                  { color: text },
                  !selectedCategory && { color: 'white' }
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>

              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedCategory === category && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => setSelectedCategory(selectedCategory === category ? undefined : category)}
                >
                  <Text style={[
                    styles.categoryFilterText,
                    { color: text },
                    selectedCategory === category && { color: 'white' }
                  ]}>
                    {translateEcoCategory(category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de metas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Medallas ({filteredBadges.length})
          </ThemedText>

          {filteredBadges.map((badge) => (
            <AchievementCard badge={badge} key={badge.id} />
          ))}
        </View>
      </WebContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backIcon: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: '700' },
  addIcon: { fontSize: 28, color: '#4ade80' },
  content: { flex: 1 },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
      flexWrap: 'wrap',
    }),
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      minWidth: 150,
      maxWidth: 200,
    }),
  },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 11, opacity: 0.7, marginTop: 4 },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  filtersRow: { marginBottom: 16 },
  filters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: { fontSize: 14, fontWeight: '500' },
  goalCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: { fontSize: 20 },
  goalInfo: { flex: 1, marginRight: 12 },
  goalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  goalAssigned: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
  goalMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priorityBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  goalDeadline: { fontSize: 12, opacity: 0.7 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
  goalDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
  },
  progressContainer: { marginBottom: 16 },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: { fontSize: 14, fontWeight: '600' },
  progressText: { fontSize: 14, fontWeight: '600' },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: { fontSize: 12, opacity: 0.7 },
  goalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  categoryFilters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryFilterText: { fontSize: 14, fontWeight: '500' }
});
