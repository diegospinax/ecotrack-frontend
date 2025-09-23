import TaskCard from '@/components/task/TaskCard/TaskCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Task } from '@/model/challenge/task/Task';
import { EcoCategoryEnum } from '@/model/enumerated/EcoCategoryEnum';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles/tasks.styles';
import { useAuth } from '@/hooks/useAuth';

export default function ActivitiesScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EcoCategoryEnum>();

  const text = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  const categories = Object.values(EcoCategoryEnum);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || task.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Actividades</Text>
        <TouchableOpacity onPress={() => router.push('/activity-form')}>
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
              placeholder="Buscar actividades..."
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: text, backgroundColor: cardBg, borderColor: border }]}
              placeholderTextColor={useThemeColor({}, 'placeholder')}
            />
          </View>

          {/* Filtro por categoría */}
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
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de actividades */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Actividades ({filteredTasks.length})
          </ThemedText>

          {filteredTasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}

        </View>
      </WebContainer>
    </ThemedView>
  );
}
