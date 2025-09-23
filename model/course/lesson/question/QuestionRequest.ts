import { AnswerRequest, CreateAnswerRequest, UpdateAnswerRequest } from "./answer/AnswerRequest";

export class QuestionRequest {
    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly answers: AnswerRequest[],
    ) { }
}

export type CreateQuestionRequest = Omit<QuestionRequest, 'id' | 'answers'> & {
    answers: CreateAnswerRequest[];
};

export type UpdateQuestionRequest = {
    id: number;
    text?: string;
    answers?: UpdateAnswerRequest[];
};
