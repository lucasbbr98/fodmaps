import { User} from './DatabaseModels';

export interface IValidateTracker {
    isValid: (input: any) => boolean
}

export interface AngularImage {
    link:string;
    base64String: string;
    mimeType: string;
}

export interface LoginModel {
    token: string;
    user: User;
}

export interface RegistrationModel {
    email: string;
    name: string;
    surname: string;
    gender: string;
    cpf: string;
    university: string;
    password: string;
    dateString: string;
}

export interface CreatePatientModel {
    name: string;
    surname: string;
    gender: string;
    stringBday: string;
    weight: number;
    height: number;
}

export interface CreateQuestionnaireModel {
    type: string;
    name: string;
    patientId: number;
}

export interface GetIntegerModel {
    value: number;
}

export interface GetStringModel {
    data: string;
}

export interface ResetPasswordModel {
    passwordToken: string;
    password: string;
}
