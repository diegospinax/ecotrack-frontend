import { useAuth } from '@/hooks/useAuth'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Badge } from '@/model/achievement/badge/Badge'
import { Role } from '@/model/enumerated/Role'
import { badgeService } from '@/services/achievement/badgeService'
import { getTypeIcon } from '@/utils/icons'
import { beautifyText, translateEcoCategory } from '@/utils/text-display'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Text, View } from 'react-native'
import CardActions from '../shared/CardActions/CardActions'
import { ThemedText } from '../ThemedText'
import { styles } from './AchievementCard.styles'

interface Props {
    badge: Badge
}

export default function AchievementCard({ badge }: Props) {
    const router = useRouter();
    const { user } = useAuth();

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Medalla',
            `¿Estás seguro de que deseas eliminar "${beautifyText(badge.name)}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await badgeService.deleteBadge(badge.id);
                        Alert.alert('Medalla eliminada', `"${beautifyText(badge.name)}" ha sido eliminada`);
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        router.push(`/(app)/(achievements)/form?badge=${JSON.stringify(badge)}`);
    }

    return (
        <View
            key={badge.id}
            style={[styles.card, { backgroundColor: cardBg, borderColor: border }]}
        >
            <View style={styles.header}>
                <View style={styles.taskIcon}>
                    <Text style={styles.taskIconText}>{getTypeIcon(badge.type)}</Text>
                </View>
                <View style={styles.activityInfo}>
                    <ThemedText style={styles.activityTitle}>
                        {beautifyText(badge.name)}
                    </ThemedText>
                    <ThemedText style={styles.activityCategory}>
                        {translateEcoCategory(badge.type)}
                    </ThemedText>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: badge.isActive ? '#4ade80' : '#ef4444' }
                ]}>
                    <Text style={styles.statusText}>
                        {badge.isActive ? 'Activa' : 'Inactiva'}
                    </Text>
                </View>
            </View>

            <ThemedText style={styles.activityDescription}>
                {beautifyText(badge.description)}
            </ThemedText>

            {user?.role === Role.ADMIN && (
                <CardActions onEdit={handleEdit} onDelete={handleDelete} />
            )}

        </View>
    )
}