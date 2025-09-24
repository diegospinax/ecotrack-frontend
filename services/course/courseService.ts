import { Course } from "@/model/course/Course";
import apiClient from "../apiClient";
import { CourseRequest } from "@/model/course/CourseRequest";

const createCourse = async (request: CourseRequest): Promise<Course> => {
    const response = await apiClient.post<Course>(`/courses/create`, request);
    return response.data;
}

const findAll = async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>(`/courses/list`);
    return response.data;
}

const findByPersonId = async (personId: number): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>(`/courses/person/${personId}`);
    return response.data;
}

const findByLessonId = async (lessonId: number): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>(`/courses/lesson/${lessonId}`);
    return response.data;
}

const updateToFinished = async (courseId: number, personId: number): Promise<void> => {
    await apiClient.put(`/courses/${courseId}`, {personId: personId});
}

export const courseService = {
    createCourse,
    findAll,
    findByPersonId,
    findByLessonId,
    updateToFinished
};