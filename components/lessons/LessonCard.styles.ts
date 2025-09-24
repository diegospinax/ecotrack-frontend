import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    lessonCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
    },
    lessonHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    lessonIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    lessonInfo: { flex: 1, marginRight: 12 },
    lessonTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    ecoType: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
    lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    difficultyBadge: {
        fontSize: 10,
        fontWeight: '600',
        color: 'white',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    lessonDuration: { fontSize: 12, opacity: 0.7 },
    lessonXP: { fontSize: 12, opacity: 0.7 },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
    lessonDescription: {
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.8,
        marginBottom: 8,
    },
    completionInfo: { fontSize: 12, opacity: 0.6, marginBottom: 16 },
    lessonActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
});