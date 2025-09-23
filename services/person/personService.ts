import { Person } from "@/model/person/Person";
import apiClient from "../apiClient";


const findPersonById = async (userId: number): Promise<Person> => {
    const response = await apiClient.get<Person>(`/persons/${userId}`);
    return response.data;
}

export const personService = {
    findPersonById
};