import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import UserCard from '@/components/users/UserCard';
import WebContainer from '@/components/WebContainer';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Area } from '@/model/enumerated/Area';
import { User } from '@/model/user/User';
import { userService } from '@/services/person/userService';
import { beautifyText } from '@/utils/text-display';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  area: string;
  xp: number;
  avatar: string;
  joinDate: string;
  isActive: boolean;
}

export default function EmployeesScreen() {

  const { user } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      findUsers();
    }, [user])
  );

  const findUsers = async () => {
    const users: User[] = await userService.findAll();
    setUsers(users);
  }

  const [searchText, setSearchText] = useState('');
  const [selectedArea, setSelectedArea] = useState<Area>();

  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const areas = Object.values(Area);

  const filteredEmployees = users.filter(user => {
    const matchesSearch = user.person.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.person.lastname.toLowerCase().includes(searchText.toLowerCase());
    const matchesArea = !selectedArea || user.person.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Empleados</Text>
        <TouchableOpacity onPress={() => router.push('/(app)/(users)/form')}>
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
              placeholder="Buscar empleados..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtro por área */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.areaFilters}>
              <TouchableOpacity
                style={[
                  styles.areaFilter,
                  { backgroundColor: cardBg, borderColor: border },
                  !selectedArea && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                ]}
                onPress={() => setSelectedArea(undefined)}
              >
                <Text style={[
                  styles.areaFilterText,
                  { color: text },
                  !selectedArea && { color: 'white' }
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>

              {areas.map((area) => (
                <TouchableOpacity
                  key={area}
                  style={[
                    styles.areaFilter,
                    { backgroundColor: cardBg, borderColor: border },
                    selectedArea === area && { backgroundColor: '#4ade80', borderColor: '#4ade80' }
                  ]}
                  onPress={() => setSelectedArea(selectedArea === area ? undefined : area)}
                >
                  <Text style={[
                    styles.areaFilterText,
                    { color: text },
                    selectedArea === area && { color: 'white' }
                  ]}>
                    {beautifyText(area)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de empleados */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Empleados ({filteredEmployees.length})
          </ThemedText>

          {filteredEmployees.map((user) => (
            <UserCard u={user} key={user.id} onDeletePerson={() => setUsers(current => current.filter(u => u.id !== user.id))} />
          ))}

          {filteredEmployees.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: cardBg, borderColor: border }]}>
              <Text style={styles.emptyIcon}>👥</Text>
              <ThemedText style={styles.emptyTitle}>No se encontraron empleados</ThemedText>
              <ThemedText style={styles.emptyDescription}>
                {searchText || selectedArea
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Agrega el primer empleado a tu empresa'
                }
              </ThemedText>
            </View>
          )}
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
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, opacity: 0.7, marginTop: 4 },
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
  areaFilters: { flexDirection: 'row', gap: 12, paddingRight: 24 },
  areaFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  areaFilterText: { fontSize: 14, fontWeight: '500' },

  employeeActions: {
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
  emptyState: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
});
