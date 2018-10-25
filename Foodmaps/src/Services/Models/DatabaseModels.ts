
export interface IReferenceTracker {
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    obsoletedOn: Date;
    obsoletedBy: string;
}

export interface Address extends IReferenceTracker {
    id: number;
    cep: string;
    state: string;
    city: string;
    hood: string;
    street: string;
}
export interface Food {
    id: number;
    name: string;
    imageId: number;
    nutrientsId: number;
}
export interface FoodNutrients extends IReferenceTracker {
    id: number;
    category: string;
    frutose: number;
    lactose: number;
    frutoGalacto: number;
    sorbitolManitol: number;
}
export interface User extends IReferenceTracker {
    id: number;
    name: string;
    surname: string;
    birthday: Date;
    gender: string;
    cpf: string;
    email: string;
    university: string;
    jobId: number;
    addressId: number;

    roles: Role[];
}

export interface Role extends IReferenceTracker {
    id: number;
    name: string;
}

export interface Image extends IReferenceTracker {
    id: number;
    key: string;
    link: string;
    mimeType: string;
}
export interface Job extends IReferenceTracker {
    id: number;
    name: string;
    identifier: string;
}

export interface Patient extends IReferenceTracker {
    id: number;
    userId: number;
    name: string;
    surname: string;
    gender: string;
    weight: number;
    height: number;
    birthday: Date;

}

// TODO add DB
export interface Question {
    id: number;
    image: string;
    question: string;
}

export interface Questionnaire extends IReferenceTracker {
    id: number;
    guid: string;
    userId: number;
    type: string;
    patientId: number;
    completed: boolean;
    name: string;
}

export interface Answer {
    foodId: number;
    value: number;
    frequency: string;
    questionnaireId: number;
    answered: boolean;
}