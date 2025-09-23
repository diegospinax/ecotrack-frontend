import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";

export class Badge {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly type: EcoCategoryEnum,
        public readonly isActive: boolean
    ) { }
}