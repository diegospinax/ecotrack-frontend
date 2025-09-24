import CardActions from '@/components/shared/CardActions/CardActions';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Challenge } from '@/model/challenge/Challenge';
import { Task } from '@/model/challenge/task/Task';
import { Role } from '@/model/enumerated/Role';
import { taskService } from '@/services/challenge/taskService';
import { getDifficultyColor, getDifficultyText } from '@/utils/difficult';
import { getTypeIcon } from '@/utils/icons';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { styles } from './TaskCard.styles';

interface Props {
    task: Task;
    challenge?: Challenge,
    onDeleteTask?: () => void;
}

export default function TaskCard({ task, challenge, onDeleteTask }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Tarea',
            `¿Estás seguro de que deseas eliminar "${beautifyText(task.title)}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await taskService.deleteTask(task.id);
                        onDeleteTask!();
                        Alert.alert('Tarea eliminada', `"${beautifyText(task.title)}" ha sido eliminada`);
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        router.push(`/(app)/(challenges)/form?task=${JSON.stringify(task)}`);
    }

    const handleUpdateChallenge = () => {
        //TODO 
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
                    <ThemedText style={styles.activityTitle}>
                        {beautifyText(task.title)}
                    </ThemedText>
                    <ThemedText style={styles.activityCategory}>
                        {translateEcoCategory(task.type)}
                    </ThemedText>
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
                {beautifyText(task.description)}
            </ThemedText>

            {user?.role === Role.ADMIN && (
                <CardActions onEdit={handleEdit} onDelete={handleDelete} />
            )}

        </View>
    )
}