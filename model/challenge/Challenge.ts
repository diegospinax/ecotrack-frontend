import { Person } from "../person/Person";
import { Task } from "./task/Task";

export class Challenge {
  constructor(
    public readonly id: number,
    public readonly person: Person,
    public readonly task: Task,
    public readonly isFinished: boolean,
    public readonly timesDone: number
  ) {}
}
