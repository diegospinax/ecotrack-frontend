import { Achievement } from "@/model/achievement/Achievement";
import apiClient from "../apiClient";
import { AchievementRequest } from "@/model/achievement/AchievementRequest";

const createAchievement = async (request: AchievementRequest): Promise<void> => {
    await apiClient.post<Achievement>(`/achievements/create`, request);
}

const findAll = async (): Promise<Achievement[]> => {
    const response = await apiClient.get<Achievement[]>(`/Achievements/list`);
    return response.data;
}

const findByPersonId = async (personId: number): Promise<Achievement[]> => {
    const response = await apiClient.get<Achievement[]>(`/Achievements/person/${personId}`);
    return response.data;
}

const findByBadgeId = async (taskId: number): Promise<Achievement[]> => {
    const response = await apiClient.get<Achievement[]>(`/Achievements/task/${taskId}`);
    return response.data;
}

export const achievementService = {
    createAchievement,
    findAll,
    findByPersonId,
    findByBadgeId
};