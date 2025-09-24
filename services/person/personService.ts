import { Person } from "@/model/person/Person";
import { PersonRegister } from "@/model/person/PersonRegister";
import { PersonRequest } from "@/model/person/PersonRequest";
import apiClient from "../apiClient";


const createPerson = async (person: PersonRegister) => {
    await apiClient.post("/persons/create", person);
}

const findPersonById = async (userId: number): Promise<Person> => {
    const response = await apiClient.get<Person>(`/persons/${userId}`);
    return response.data;
}

const findAll = async (): Promise<Person[]> => {
    const response = await apiClient.get<Person[]>("/persons/list");
    return response.data;
}

const udpatePerson = async (personId: number, request: PersonRequest): Promise<void> => {
    await apiClient.put(`/persons/${personId}`, request);
}

const deletePerson = async (personId: number) => {
    await apiClient.delete(`/persons/${personId}`);
}

export const personService = {
    findPersonById,
    findAll,
    createPerson,
    udpatePerson,
    deletePerson
};