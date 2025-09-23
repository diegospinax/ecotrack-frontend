import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";
import { Question } from "./question/Question";

export class Lesson {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly type: EcoCategoryEnum,
    public readonly isActive: boolean,
    public readonly questions: Question[],
  ) {}
}
