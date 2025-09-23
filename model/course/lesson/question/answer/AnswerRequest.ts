export class AnswerRequest {
    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly isCorrect: boolean
     ){}
}

export type CreateAnswerRequest = Omit<AnswerRequest, 'id'>;
export type UpdateAnswerRequest = Partial<CreateAnswerRequest> & { id: number }; 