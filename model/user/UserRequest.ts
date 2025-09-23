import { Role } from "@/domain/user/Role";

export class UserRequest { 
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role
     ){}
}
