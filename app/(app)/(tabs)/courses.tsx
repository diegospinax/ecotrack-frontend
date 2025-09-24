import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WebContainer from '@/components/WebContainer';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Course } from '@/model/course/Course';
import { Lesson } from '@/model/course/lesson/Lesson';
import { EcoCategoryEnum } from '@/model/enumerated/EcoCategoryEnum';
import { courseService } from '@/services/course/courseService';
import { lessonService } from '@/services/course/lessonService';
import { translateEcoCategory } from '@/utils/text-display';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles/course.styles';
import LessonCard from '@/components/lessons/LessonCard';


export default function CoursesScreen() {

  const { user } = useAuth();
  const router = useRouter();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      if (user?.role === 'ADMIN') {
        findLessons();
      } else if (user?.role === 'USER') {
        findCourses();
      }
    }, [user])
  );

  const findLessons = async () => {
    const lessons: Lesson[] = await lessonService.findAll();
    setLessons(lessons);
  }

  const findCourses = async () => {
    const courses: Course[] = await courseService.findByPersonId(user!.person.id);
    setCourses(courses);
  }

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EcoCategoryEnum>();

  const text = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  const categories = Object.values(EcoCategoryEnum);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchText.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || lesson.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.lesson.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.lesson.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || course.lesson.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>Gestión de Lecciones</Text>
        <TouchableOpacity onPress={() => router.push('/(app)/(courses)/form')}>
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
              placeholder="Buscar lecciones..."
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
                    {translateEcoCategory(category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de lecciones */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Lecciones {user?.role === 'ADMIN' ? filteredLessons.length : filteredCourses.length}
          </ThemedText>

          {user?.role === 'ADMIN' && filteredLessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.id} onDeleteLesson={() => {
              setLessons(current => current.filter(l => l.id !== lesson.id))
            }} />
          ))}

          {user?.role === 'USER' && filteredCourses.map((course) => (
            <LessonCard course={course} key={course.id} lesson={course.lesson} />
          ))}
        </View>
      </WebContainer>
    </ThemedView>
  );
}


