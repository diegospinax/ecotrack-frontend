import { Lesson } from "./lesson/Lesson";
import { Person } from "../person/Person";

export class Course {
  constructor(
    public readonly id: number,
    public readonly person: Person,
    public readonly lesson: Lesson,
    public readonly isFinished: boolean,
  ) {}
}
