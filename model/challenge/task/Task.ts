import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";

export class Task {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly type: EcoCategoryEnum,
        public readonly requiredRepetitions: number,
        public readonly isActive: boolean
    ) { }
}