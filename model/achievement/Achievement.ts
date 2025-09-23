import { Person } from "../person/Person";
import { Badge } from "./badge/Badge";

export class Achievement {
    constructor(
        public readonly id: number,
        public readonly dateReceived: Date,
        public readonly person: Person,
        public readonly badge: Badge
    ) {}
}