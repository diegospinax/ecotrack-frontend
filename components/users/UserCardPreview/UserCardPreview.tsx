import { View, Text, Image } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { styles } from './UserCardPreview.styles'
import { User } from '@/model/user/User'
import { beautifyText } from '@/utils/text-display'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Person } from '@/model/person/Person'

interface Props {
    user: Partial<User>,
    person: Partial<Person>
}

export default function UserCardPreview({ user, person }: Props) {
    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    return (
        <View style={[styles.previewCard, { backgroundColor: cardBg, borderColor: border }]}>
            <View style={styles.previewHeader}>
                <View style={styles.previewAvatar}>

                    <Image source={{ uri: person.profilePicture }} style={styles.previewAvatarImage} />

                </View>
                <View style={styles.previewInfo}>
                    <ThemedText style={styles.previewName}>
                        {person.name
                            ? beautifyText(person.name + "_" + (person.lastname ?? ''))
                            : 'Nombre del empleado'}
                    </ThemedText>
                    <ThemedText style={styles.previewArea}>
                        {person.area ? beautifyText(person.area) : 'Área'}
                    </ThemedText>
                </View>
            </View>
            <ThemedText style={styles.previewEmail}>
                {user.email ? user.email.toLowerCase() : 'email@empresa.com'}
            </ThemedText>
        </View>
    )
}