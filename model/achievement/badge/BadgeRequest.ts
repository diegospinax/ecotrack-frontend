import { EcoCategoryEnum } from "@/model/enumerated/EcoCategoryEnum";

export class BadgeRequest {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly type: EcoCategoryEnum,
        public readonly isActive?: boolean
    ) { }
}