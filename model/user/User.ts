import { Role } from "../enumerated/Role";
import { Person } from "../person/Person";

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: Role,
    public readonly person: Person
  ) {}
}
