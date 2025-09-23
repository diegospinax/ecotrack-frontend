export class AchievementRequest {
    constructor(
        public readonly personId: number,
        public readonly badgeId: number
    ) {}
}