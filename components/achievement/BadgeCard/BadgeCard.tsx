import { View, Text } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { Badge } from '@/model/achievement/badge/Badge'
import { getTypeIcon } from '@/utils/icons'
import { beautifyText } from '@/utils/text-display'
import { styles } from './BadgeCard.styles'
import { useThemeColor } from '@/hooks/useThemeColor'

interface Props {
    badge: Badge
}

export default function BadgeCard({ badge }: Props) {

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    return (
        <View
            key={badge.id}
            style={[styles.achievementCard, { backgroundColor: cardBg, borderColor: border }]}
        >
            <Text style={styles.achievementIcon}>{getTypeIcon(badge.type)}</Text>
            <ThemedText style={styles.achievementTitle}>{beautifyText(badge.name)}</ThemedText>
            <ThemedText style={styles.achievementDesc}>{beautifyText(badge.description)}</ThemedText>
        </View>
    )
}