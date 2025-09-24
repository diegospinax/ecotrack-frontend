import { Role } from "../enumerated/Role";


export class UserRequest { 
    constructor(
        public readonly email: string,
        public readonly role: Role,
        public readonly password?: string
     ){}
}
