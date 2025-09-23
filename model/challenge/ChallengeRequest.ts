export class ChallengeRequest {
    constructor(
        public readonly id: number,
        public readonly personId: number,
        public readonly taskId: number,
     ){}
}
