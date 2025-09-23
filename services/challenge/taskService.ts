import { Task } from "@/model/challenge/task/Task";
import apiClient from "../apiClient";
import { TaskRequest } from "@/model/challenge/task/TaskRequest";


const findAll = async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(`/tasks/list`);
    return response.data;
}

const updateTask = async (taskId: number, task: TaskRequest): Promise<void> => {
    console.log(`Updating task with ID: ${taskId}`, task);
    
    await apiClient.put(`/tasks/${taskId}`, task);
}

const createTask = async (task: TaskRequest): Promise<void> => {
    await apiClient.post(`/tasks/create`, task);
}

const deleteTask = async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
}

export const taskService = {
    findAll,
    deleteTask,
    updateTask,
    createTask
};