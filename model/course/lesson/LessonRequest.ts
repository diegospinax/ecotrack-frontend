import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";
import { CreateQuestionRequest, QuestionRequest, UpdateQuestionRequest } from "./question/QuestionRequest";

export class LessonRequest {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly type: EcoCategoryEnum,
        public readonly questions: QuestionRequest[],
    ) { }
}

export type CreateLessonRequest = Omit<LessonRequest, 'id' | 'questions'> & {
    questions: CreateQuestionRequest[];
};

export type UpdateLessonRequest = Partial<Omit<CreateLessonRequest, 'questions'>> & {
    id: number,
    isActive?: boolean,
    questions?: UpdateQuestionRequest[]
};


