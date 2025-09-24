import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Lesson } from '@/model/course/lesson/Lesson';
import { CreateLessonRequest, UpdateLessonRequest } from '@/model/course/lesson/LessonRequest';
import { Question } from '@/model/course/lesson/question/Question';
import { EcoCategoryEnum } from '@/model/enumerated/EcoCategoryEnum';
import { lessonService } from '@/services/course/lessonService';
import { getTypeIcon } from '@/utils/icons';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles/lesson-form.styles';

export default function LessonFormScreen() {
  const params = useLocalSearchParams();

  const router = useRouter();
  const categories = Object.values(EcoCategoryEnum);

  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [type, setType] = useState<EcoCategoryEnum | undefined>();
  const [questions, setQuestions] = useState<Question[]>([]);

  const [lessonId, setLessonId] = useState<number | undefined>();

  const isEditing = !!params.lesson;

  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (params.lesson) {
      const lessonData = JSON.parse(params.lesson as string) as Lesson;
      setLessonId(lessonData.id);
      setTitle(lessonData.title);
      setDescription(lessonData.description);
      setType(lessonData.type);
      setQuestions(lessonData.questions);
    }
  }, [params.lesson]);


  const handleSubmit = async () => {
    if (!title || !description || !type) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    if (isEditing) {
      const lessonUpdateRequest: UpdateLessonRequest = {
        title,
        description,
        type
      }

      await lessonService.updateLesson(lessonId!, lessonUpdateRequest);

    } else {
      const lessonCreateRequest: CreateLessonRequest = {
        title,
        description,
        type,
        questions
      }
      await lessonService.createLesson(lessonCreateRequest);
    }

    const action = isEditing ? 'actualizada' : 'creada';

    Alert.alert(
      'Lección guardada',
      `La lección "${beautifyText(title)}" ha sido ${action} exitosamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const mapQuestionUpdateRequest = (question: Question) => {

  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>
          {isEditing ? 'Editar Lección' : 'Nueva Lección'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título de la lección *</ThemedText>
            <Input
              placeholder="Ej: Introducción al ahorro de agua"
              value={beautifyText(title)}
              onChangeText={setTitle}
              style={{ color: text }}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe brevemente el contenido de la lección..."
              value={beautifyText(description)}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              style={{ height: 80, color: text }}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Categoría *</ThemedText>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryOption,
                    { backgroundColor: cardBg, borderColor: border },
                    type === category && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => setType(category)}
                >
                  <ThemedText style={styles.categoryOptionText}>
                    {getTypeIcon(category)}  {translateEcoCategory(category)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            label={isEditing ? 'Actualizar lección' : 'Crear lección'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
          <Button
            label="Cancelar"
            variant="secondary"
            onPress={() => router.back()}
            style={styles.cancelButton}
          />
        </View>
      </WebContainer>
    </ThemedView>
  );
}
