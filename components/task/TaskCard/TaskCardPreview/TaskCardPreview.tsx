import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Task } from '@/model/challenge/task/Task';
import { getDifficultyColor, getDifficultyText } from '@/utils/difficult';
import { getTypeIcon } from '@/utils/icons';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../TaskCard.styles';
import { beautifyText, translateEcoCategory } from '@/utils/text-display';

interface Props {
    task: Partial<Task>;
}

export default function TaskCardPreview({ task }: Props) {

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    return (
        <View
            key={task.id}
            style={[styles.card, { backgroundColor: cardBg, borderColor: border }]}
        >
            <View style={styles.header}>
                <View style={styles.taskIcon}>
                    <Text style={styles.taskIconText}>{
                        task.type ? getTypeIcon(task.type) : '🌱'
                    }
                    </Text>
                </View>
                <View style={styles.activityInfo}>
                    <ThemedText style={styles.activityTitle}>
                        {beautifyText(task.title) || 'Título de la actividad'}
                    </ThemedText>
                    <ThemedText style={styles.activityCategory}>
                        {task.type ? translateEcoCategory(task.type) : 'Categoría'}
                    </ThemedText>
                    <View style={styles.activityMeta}>
                        <Text style={[
                            styles.difficultyBadge,
                            { backgroundColor: getDifficultyColor(task.requiredRepetitions ?? 0) }
                        ]}>
                            {task.requiredRepetitions ? getDifficultyText(task.requiredRepetitions) : 'Dificultad'}
                        </Text>
                        <ThemedText style={styles.activityDuration}> 🔁 {task.requiredRepetitions || 0}</ThemedText>
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
                {beautifyText(task.description) || 'Descripción de la actividad...'}
            </ThemedText>
        </View>
    )
}