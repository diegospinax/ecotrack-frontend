export const getDifficultyColor = (requiredAttempts: number) => {
    if (requiredAttempts < 2) return '#4ade80';
    if (requiredAttempts >= 2 && requiredAttempts < 4) return '#f59e0b';
    if (requiredAttempts >= 4) return '#ef4444';
};

export const getDifficultyText = (requiredAttempts: number) => {
    if (requiredAttempts < 2) return 'Fácil';
    if (requiredAttempts >= 2 && requiredAttempts < 4) return 'Intermedio';
    if (requiredAttempts >= 4) return 'Avanzado';
};