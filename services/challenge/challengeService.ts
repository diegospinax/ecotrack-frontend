import { Challenge } from "@/model/challenge/Challenge";
import apiClient from "../apiClient";
import { ChallengeRequest } from "@/model/challenge/ChallengeRequest";

const createChallenge = async (ChallengeRequest: Omit<ChallengeRequest, "id">): Promise<Challenge> => {
    const response = await apiClient.post<Challenge>(`/challenges/create`, ChallengeRequest);
    return response.data;
}

const findAll = async (): Promise<Challenge[]> => {
    const response = await apiClient.get<Challenge[]>(`/challenges/list`);
    return response.data;
}

const findByPersonId = async (personId: number): Promise<Challenge[]> => {
    const response = await apiClient.get<Challenge[]>(`/challenges/person/${personId}`);
    return response.data;
}

const findByTaskId = async (taskId: number): Promise<Challenge[]> => {
    const response = await apiClient.get<Challenge[]>(`/challenges/task/${taskId}`);
    return response.data;
}

const addAttemtptChallenge = async (challengeId: number, personId: number): Promise<void> => {
    await apiClient.put(`/challenges/${challengeId}`, {personId: personId});
}

export const challengeService = {
    createChallenge,
    findAll,
    findByPersonId,
    findByTaskId,
    addAttemtptChallenge
};