import { Role } from "../enumerated/Role";


export class UserRequest { 
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role
     ){}
}
