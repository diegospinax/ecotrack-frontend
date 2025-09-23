import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
});