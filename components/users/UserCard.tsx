import { useThemeColor } from '@/hooks/useThemeColor'
import { User } from '@/model/user/User'
import { personService } from '@/services/person/personService'
import { beautifyText } from '@/utils/text-display'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Image, Text, View } from 'react-native'
import CardActions from '../shared/CardActions/CardActions'
import { ThemedText } from '../ThemedText'
import { styles } from './UserCard.styles'
import { useAuth } from '@/hooks/useAuth'

interface Props {
    u: User
    onDeletePerson: () => void
}

export default function UserCard({ u, onDeletePerson }: Props) {
    const { user } = useAuth();
    const router = useRouter();

    const cardBg = useThemeColor({}, 'card');
    const border = useThemeColor({}, 'border');

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Empleado',
            `¿Estás seguro de que deseas eliminar a ${beautifyText(u.person.name + "_" + u.person.lastname)}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        personService.deletePerson(u.person.id)
                        onDeletePerson!();
                        Alert.alert('Empleado eliminado', `${beautifyText(u.person.name + "_" + u.person.lastname)} pasó a mejor lista...`);
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        router.push(`/(app)/(users)/form?user=${JSON.stringify(u)}`);
    }

    return (
        <View
            key={u.id}
            style={[styles.employeeCard, { backgroundColor: cardBg, borderColor: border }]}
        >
            <View style={styles.employeeHeader}>

                <Image
                    source={{ uri: u.person.profilePicture }}
                    style={styles.employeeAvatar}
                />

                <View style={styles.employeeInfo}>
                    <ThemedText style={styles.employeeName}>{beautifyText(u.person.name.concat("_").concat(u.person.lastname))}</ThemedText>
                    <ThemedText style={styles.employeePosition}>{beautifyText(u.person.area)}</ThemedText>
                </View>
                <View style={styles.employeeStats}>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: u.person.isActive ? '#4ade80' : '#ef4444' }
                    ]}>
                        <Text style={styles.statusText}>
                            {u.person.isActive ? 'Activo' : 'Inactivo'}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.employeeDetails}>
                <ThemedText style={styles.employeeEmail}>{u.email}</ThemedText>
            </View>

            {user!.person.id !== u.person.id && <CardActions onDelete={handleDelete} onEdit={handleEdit} />}

            {user!.person.id === u.person.id && (
                <View>
                    <ThemedText style={{
                        textAlign: 'center',
                        opacity: 0.60
                    }}>Administrador</ThemedText>
                </View>
            )}

        </View>
    )
}