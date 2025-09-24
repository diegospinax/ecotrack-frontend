import { BadgeRequest } from "@/model/achievement/badge/BadgeRequest";
import apiClient from "../apiClient";
import { Badge } from "@/model/achievement/badge/Badge";


const createBadge = async (request: BadgeRequest): Promise<void> => {
    await apiClient.post("/badges/create", request);
}

const updateBadge = async (badgeId: number, request: BadgeRequest): Promise<void> => {
    await apiClient.put(`/badges/${badgeId}`, request)
}

const findAll = async (): Promise<Badge[]> => {
    const response = await apiClient.get<Badge[]>("/badges/list");
    return response.data
}

const deleteBadge = async (badgeId: number): Promise<void> => {
    await apiClient.delete(`/badges/${badgeId}`);
}

export const badgeService = {
    createBadge,
    updateBadge,
    findAll,
    deleteBadge,
}
