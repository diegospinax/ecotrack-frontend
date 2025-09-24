import { Lesson } from "@/model/course/lesson/Lesson";
import apiClient from "../apiClient";
import { CreateLessonRequest, UpdateLessonRequest } from "@/model/course/lesson/LessonRequest";

const findAll = async (): Promise<Lesson[]> => {
    const response = await apiClient.get<Lesson[]>(`/lessons/list`);
    return response.data;
}

const deleteLesson = async (id: number): Promise<void> => {
    await apiClient.delete(`/lessons/${id}`);
}

const updateLesson = async (id: number, request: UpdateLessonRequest): Promise<void> => {
    await apiClient.put(`/lessons/${id}`, request);
}

const createLesson = async (request: CreateLessonRequest): Promise<void> => {
    await apiClient.post(`/lessons/create`, request);
}

export const lessonService = {
    findAll,
    deleteLesson,
    updateLesson,
    createLesson
};