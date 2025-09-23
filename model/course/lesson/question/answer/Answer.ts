export class Answer {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly isCorrect: boolean
  ) {}
}
