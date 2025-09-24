import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Lesson } from '@/model/course/lesson/Lesson';
import { Course } from '@/model/course/Course';
import { lessonService } from '@/services/course/lessonService';
import { styles } from './LessonCard.styles';
import { getTypeIcon } from '@/utils/icons';
import { ThemedText } from '../ThemedText';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';
import CardActions from '../shared/CardActions/CardActions';
import { Role } from '@/model/enumerated/Role';
import { getDifficultyColor, getDifficultyText } from '@/utils/difficult';

interface Props {
    lesson: Lesson;
    course?: Course,
    onDeleteLesson?: () => void;
}

export default function LessonCard({ lesson, course, onDeleteLesson }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Lección',
            `¿Estás seguro de que deseas eliminar "${beautifyText(lesson.title)}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        lessonService.deleteLesson(lesson.id);
                        onDeleteLesson!();
                        Alert.alert('Actividad eliminada', `"${beautifyText(lesson.title)}" ha sido eliminada`);
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        router.push(`/(app)/(courses)/form?lesson=${JSON.stringify(lesson)}`);
    }

    const handleUpdateCourse = () => {
        //TODO 
    }

    return (
        <View
            key={lesson.id}
            style={[styles.lessonCard, { backgroundColor: cardBg, borderColor: border }]}
        >
            <View style={styles.lessonHeader}>
                <View style={styles.lessonIcon}>
                    <Text style={{ fontSize: 20 }}>{getTypeIcon(lesson.type)}</Text>
                </View>
                <View style={styles.lessonInfo}>
                    <ThemedText style={styles.lessonTitle}>
                        {beautifyText(lesson.title)}
                    </ThemedText>
                    <ThemedText style={styles.ecoType}>
                        {translateEcoCategory(lesson.type)}
                    </ThemedText>
                    <View style={styles.lessonMeta}>
                        <Text style={[
                            styles.difficultyBadge,
                            { backgroundColor: getDifficultyColor(lesson.questions.length) }
                        ]}>
                            {getDifficultyText(lesson.questions.length)}
                        </Text>
                        <ThemedText style={styles.lessonDuration}>🧐 {lesson.questions.length} preguntas</ThemedText>
                    </View>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: lesson.isActive ? '#4ade80' : '#ef4444' }
                ]}>
                    <Text style={styles.statusText}>
                        {lesson.isActive ? 'Activa' : 'Inactiva'}
                    </Text>
                </View>
            </View>

            <ThemedText style={styles.lessonDescription}>
                {beautifyText(lesson.description)}
            </ThemedText>

            {user?.role === Role.ADMIN && (
                <CardActions onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </View>
    )
}