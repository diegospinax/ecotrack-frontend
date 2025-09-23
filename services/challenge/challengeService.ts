import { Challenge } from "@/model/challenge/Challenge";
import apiClient from "../apiClient";

const findAll = async (): Promise<Challenge[]> => {
    const response = await apiClient.get<Challenge[]>(`/challenges/list`);
    return response.data;
}

const findByPersonId = async (personId: number): Promise<Challenge[]> => {
    const response = await apiClient.get<Challenge[]>(`/challenges/person/${personId}`);
    return response.data;
}

export const challengeService = {
    findAll,
    findByPersonId
};