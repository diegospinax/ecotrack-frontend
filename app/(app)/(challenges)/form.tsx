import TaskCardPreview from '@/components/task/TaskCard/TaskCardPreview/TaskCardPreview';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Task } from '@/model/challenge/task/Task';
import { TaskRequest } from '@/model/challenge/task/TaskRequest';
import { EcoCategoryEnum } from '@/model/enumerated/EcoCategoryEnum';
import { taskService } from '@/services/challenge/taskService';
import { styles } from '@/styles/task-form.styles';
import { getTypeIcon } from '@/utils/icons';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export default function TaskFormScreen() {
  const params = useLocalSearchParams();

    const router = useRouter();
    const categories = Object.values(EcoCategoryEnum);

  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [requiredRepetitions, setRequiredRepetitions] = useState<number | undefined>();
  const [type, setType] = useState<EcoCategoryEnum | undefined>();

  const [taskId, setTaskId] = useState<number | undefined>();

  const isEditing = !!params.task;

  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (params.task) {
      const taskData = JSON.parse(params.task as string) as Task;
      setTaskId(taskData.id);
      setTitle(taskData.title);
      setDescription(taskData.description);
      setRequiredRepetitions(taskData.requiredRepetitions);
      setType(taskData.type);
    }
  }, [params.task]);

  const handleSubmit = async () => {
    if (!title || !description || !requiredRepetitions || !type) {
      Alert.alert('Error', 'Todos los campos obligatorios');
      return;
    }

    if (isEditing) {
      const taskUpdateRequest: TaskRequest = {
        title,
        description,
        requiredRepetitions,
        type
      }
      await taskService.updateTask(taskId!, taskUpdateRequest);

    } else {
      const taskCreateRequest: TaskRequest = {
        title,
        description,
        requiredRepetitions,
        type
      }
      await taskService.createTask(taskCreateRequest);
    }

    const action = isEditing ? 'actualizada' : 'creada';

    Alert.alert(
      'Actividad guardada',
      `La actividad "${beautifyText(title)}" ha sido ${action} exitosamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>
          {isEditing ? 'Editar Actividad' : 'Nueva Actividad'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título de la actividad *</ThemedText>
            <Input
              placeholder="Ej: Ducha corta (5 minutos)"
              value={beautifyText(title)}
              onChangeText={setTitle}
              style={[styles.input, { color: text }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe cómo realizar la actividad..."
              value={beautifyText(description)}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80, color: text }]}
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

        {/* Configuración */}
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Repeticiones necesarias</ThemedText>
            <Input
              placeholder=" < 2 (para fácil), 3-5 (medio), > 5 (difícil)"
              value={requiredRepetitions?.toString() || undefined}
              onChangeText={(value) => setRequiredRepetitions(Number(value))}
              style={[styles.input, { color: text }]}
            />
          </View>
        </View>

        {/* Vista previa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vista previa</ThemedText>
          <TaskCardPreview task={{ title, description, requiredRepetitions, type }} />
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            label={isEditing ? 'Actualizar actividad' : 'Crear actividad'}
            onPress={async () => await handleSubmit()}
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
