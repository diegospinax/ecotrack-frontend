import { Area } from "../enumerated/Area";

export class Person {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly lastname: string,
        public readonly area: Area,
        public readonly profilePicture: string,
        public readonly isActive: boolean 
    ){}
}