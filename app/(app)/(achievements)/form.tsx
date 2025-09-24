import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Badge } from '@/model/achievement/badge/Badge';
import { BadgeRequest } from '@/model/achievement/badge/BadgeRequest';
import { EcoCategoryEnum } from '@/model/enumerated/EcoCategoryEnum';
import { badgeService } from '@/services/achievement/badgeService';
import { getTypeIcon } from '@/utils/icons';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BadgeFormScreen() {

  const params = useLocalSearchParams();

  const router = useRouter();
  const categories = Object.values(EcoCategoryEnum);

  const isEditing = !!params.badge

  const text = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  const [badgeId, setBadgeId] = useState<number>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [type, setType] = useState<EcoCategoryEnum>();

  useEffect(() => {
    if (params.badge) {
      const badgeData = JSON.parse(params.badge as string) as Badge;
      setBadgeId(badgeData.id);
      setName(badgeData.name);
      setDescription(badgeData.description);
      setType(badgeData.type);
    }
  }, [params.badge]);

  const handleSubmit = async () => {
    if (!name || !description || !type) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const badgeRequest: BadgeRequest = {
      name,
      description,
      type
    }

    if (isEditing) {
      await badgeService.updateBadge(badgeId!, badgeRequest);
    } else {
      await badgeService.createBadge(badgeRequest);
    }

    const action = isEditing ? 'actualizada' : 'creada';
    Alert.alert(
      'Medalla guardada',
      `La medalla "${beautifyText(name)}" ha sido ${action} exitosamente`,
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
          {isEditing ? 'Editar Meta' : 'Nueva Meta'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Información básica */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información básica</ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Título de la meta *</ThemedText>
            <Input
              placeholder="Ej: Reducir consumo de agua"
              value={beautifyText(name)}
              onChangeText={setName}
              style={[{color: text}]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Descripción *</ThemedText>
            <Input
              placeholder="Describe el objetivo a alcanzar..."
              value={beautifyText(description)}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              style={[{ height: 80, color: text }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Categoría</ThemedText>
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


        {/* Vista previa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vista previa</ThemedText>
          <View style={[styles.previewCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.previewHeader}>
              <View style={styles.previewIcon}>
                <Text style={styles.previewIconText}>{getTypeIcon(type!)}</Text>
              </View>
              <View style={styles.previewInfo}>
                <ThemedText style={styles.previewTitle}>
                  {beautifyText(name) || 'Título de la medalla'}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.previewDescription}>
              {beautifyText(description) || 'Descripción de la meta...'}
            </ThemedText>
          </View>
        </View>
        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            label={isEditing ? 'Actualizar meta' : 'Crear meta'}
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
  content: { flex: 1 },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  targetRow: { flexDirection: 'row', gap: 12 },
  targetInput: { flex: 2 },
  unitInput: { flex: 1 },
  categoriesGrid: {
    flexDirection: 'column',
    gap: 12
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '30%',
    alignItems: 'center',
  },
  categoryOptionText: { fontSize: 14, fontWeight: '500' },
  prioritiesRow: {
    flexDirection: 'row',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityText: { fontSize: 14, fontWeight: '600' },
  areasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  areaOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: '48%',
    alignItems: 'center',
  },
  areaOptionText: { fontSize: 14, fontWeight: '500' },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { fontSize: 20 },
  previewCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  previewIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  previewIconText: { fontSize: 20 },
  previewInfo: { flex: 1 },
  previewTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  previewAssigned: { fontSize: 14, marginBottom: 6, opacity: 0.8 },
  previewMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewPriority: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  previewTarget: { fontSize: 12, opacity: 0.7 },
  previewDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
  previewDeadline: { fontSize: 12, opacity: 0.6 },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
    ...(Platform.OS === 'web' && {
      paddingHorizontal: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      maxWidth: 400,
      alignSelf: 'center',
    }),
  },
  submitButton: { marginBottom: 8 },
  cancelButton: { marginBottom: 8 },
});
