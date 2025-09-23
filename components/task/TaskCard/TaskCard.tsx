import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Task } from '@/model/challenge/task/Task'
import { ThemedText } from '../../ThemedText';
import { styles } from './TaskCard.styles';
import { getTypeIcon } from '@/utils/icons';
import { getDifficultyColor, getDifficultyText } from '@/utils/difficult';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import CardActions from '@/components/shared/CardActions/CardActions';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/model/enumerated/Role';
import { Challenge } from '@/model/challenge/Challenge';

interface Props {
    task: Task;
    challenge?: Challenge
}

export default function TaskCard({ task, challenge }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Actividad',
            `¿Estás seguro de que deseas eliminar "${task.title}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        //Incluir eliminado DELETE a API
                        Alert.alert('Actividad eliminada', `"${task.title}" ha sido eliminada`);
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        //Renombrar a task-form
        router.push(`/activity-form?id=${task.id}`)
    }

    return (
        <View
            key={task.id}
            style={[styles.card, { backgroundColor: cardBg, borderColor: border }]}
        >
            <View style={styles.header}>
                <View style={styles.taskIcon}>
                    <Text style={styles.taskIconText}>{getTypeIcon(task.type)}</Text>
                </View>
                <View style={styles.activityInfo}>
                    <ThemedText style={styles.activityTitle}>{task.title}</ThemedText>
                    <ThemedText style={styles.activityCategory}>{task.type}</ThemedText>
                    <View style={styles.activityMeta}>
                        <Text style={[
                            styles.difficultyBadge,
                            { backgroundColor: getDifficultyColor(task.requiredRepetitions) }
                        ]}>
                            {getDifficultyText(task.requiredRepetitions)}
                        </Text>
                        <ThemedText style={styles.activityDuration}> 🔁 {task.requiredRepetitions}</ThemedText>
                    </View>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: task.isActive ? '#4ade80' : '#ef4444' }
                ]}>
                    <Text style={styles.statusText}>
                        {task.isActive ? 'Activa' : 'Inactiva'}
                    </Text>
                </View>
            </View>

            <ThemedText style={styles.activityDescription}>
                {task.description}
            </ThemedText>

            { user?.role === Role.ADMIN && (
                <CardActions onEdit={handleEdit} onDelete={handleDelete} />
            )}

        </View>
    )
}