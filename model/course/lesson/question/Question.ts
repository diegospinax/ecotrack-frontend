import { Answer } from "./answer/Answer";

export class Question {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly answers: Answer[],
  ) { }
}
