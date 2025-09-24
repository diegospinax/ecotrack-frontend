import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    taskIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    taskIconText: { fontSize: 20 },
    activityInfo: { flex: 1, marginRight: 12 },
    activityTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    activityCategory: { fontSize: 14, fontWeight: '500', marginBottom: 6, opacity: 0.8 },
    activityMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    difficultyBadge: {
        fontSize: 10,
        fontWeight: '600',
        color: 'white',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    activityDuration: { fontSize: 12, opacity: 0.7 },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
    activityDescription: {
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.8,
        marginBottom: 8,
    }
});