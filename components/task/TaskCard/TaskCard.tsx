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
import { taskService } from '@/services/challenge/taskService';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';

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
            'Eliminar Actividad',
            `¿Estás seguro de que deseas eliminar "${beautifyText(task.title)}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        taskService.deleteTask(task.id);
                        onDeleteTask!();
                        Alert.alert('Actividad eliminada', `"${beautifyText(task.title)}" ha sido eliminada`);
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