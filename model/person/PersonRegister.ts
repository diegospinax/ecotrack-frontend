import { UserRequest } from "../user/UserRequest";
import { PersonRequest } from "./PersonRequest";

export class PersonRegister {
    constructor(
        public readonly person: Omit<PersonRequest, "isActive">,
        public readonly user: UserRequest
    ){}
}