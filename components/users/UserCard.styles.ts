import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    employeeCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
    },
    employeeHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    employeeAvatar: {
        width: 50,
        height: 50,
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: { fontSize: 20 },
    employeeInfo: { flex: 1, marginRight: 12 },
    employeeName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    employeePosition: { fontSize: 14, fontWeight: '500' },
    employeeArea: { fontSize: 12, opacity: 0.7 },
    employeeStats: { alignItems: 'flex-end' },
    employeeXP: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: { fontSize: 10, fontWeight: '600', color: 'white' },
    employeeDetails: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        marginBottom: 12,
    },
    employeeEmail: { fontSize: 14, marginBottom: 4 },
    joinDate: { fontSize: 12, opacity: 0.6 },
    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#f2f2f2',
    },
});