import { UserRequest } from "@/model/user/UserRequest";
import apiClient from "../apiClient";
import { User } from "@/model/user/User";
import { personService } from "./personService";
import { Role } from "@/model/enumerated/Role";


const findAll = async (): Promise<User[]> => {
    const response = await apiClient.get("/users/list");
    const users = response.data;

    return await Promise.all(users.map(async (element: any) => {
        const person = await personService.findPersonById(element.personId);
        return {
            id: element.id,
            email: element.email,
            role: element.role as Role,
            person
        }
    }));

}

const updateUser = async (userId: number, request: UserRequest): Promise<void> => {
    await apiClient.put(`/users/${userId}`, request);
}

export const userService = {
    updateUser,
    findAll
}