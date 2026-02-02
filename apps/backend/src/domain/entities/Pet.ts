//src/domain/entities/Pet.ts
//Domain entity representing a Pet in the system

export class Pet {
    constructor(
        public readonly id: string,
        public readonly ownerId: string,
        public readonly name: string,
        public readonly breed: string,
        public readonly size: PetSize,
        public readonly photoUrl?: string,
    ) { }
}

export enum PetSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}