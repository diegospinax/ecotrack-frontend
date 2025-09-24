import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    previewCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    previewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    previewAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    previewAvatarImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    previewAvatarText: { fontSize: 20 },
    previewInfo: { flex: 1 },
    previewName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    previewPosition: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
    previewArea: { fontSize: 12, opacity: 0.7 },
    previewEmail: { fontSize: 14, opacity: 0.8 },
});