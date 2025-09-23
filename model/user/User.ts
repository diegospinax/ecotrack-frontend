import { Role } from "../enumerated/Role";

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: Role,
    public readonly personId: number
  ) {}
}
