import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';
import { User, Answer } from './Models/DatabaseModels';

const STORAGE_EMAIL: string = 'email';
const STORAGE_PASSWORD: string = 'password';
const STORAGE_TOKEN: string = 'token';
const STORAGE_URL: string = 'returnUrl';

const CATEGORIES = ['frutas', 'acucar', 'legumes-e-verduras', 'leite-e-derivados', 'graos', 'cereais-e-massas'];


@Injectable()
export class StorageService {

    constructor(private storage: LocalStorageService) {}
    public user: User = null;

    public get isLoggedIn() : boolean {
        return this.user != null;
    }
    
    public isInRole(roleName: string): boolean {
        if (!this.isLoggedIn)
            return false;

        for (let r of this.user.roles) {
            if (r.name == roleName)
                return true;
        }

        return false;
    }

    public getHasConfirmed(guid:string): boolean {
        var storageUrl = 'confirmed/' + guid;
        return <boolean>this.storage.get(storageUrl) || false;
    }
    public setHasConfirmed(value: boolean, guid: string) {
        var storageUrl = 'confirmed/' + guid;
        if (value == null) {
            this.storage.remove(storageUrl);
        }
        else {
            this.storage.set(storageUrl, value);
        }
    }

    public get email(): string {
        return <string>this.storage.get(STORAGE_EMAIL) || '';
    }
    public set email(value: string) {
        if (value == null) {
            this.storage.remove(STORAGE_EMAIL);
        }
        else {
            this.storage.set(STORAGE_EMAIL, value);
        }
    }

    public get password(): string {
        return <string>this.storage.get(STORAGE_PASSWORD) || '';
    }
    public set password(value: string) {
        if (value == null) {
            this.storage.remove(STORAGE_PASSWORD);
        }
        else {
            this.storage.set(STORAGE_PASSWORD, value);
        }
    }

    public get token(): string {
        return <string>this.storage.get(STORAGE_TOKEN) || null;
    }
    public set token(value: string) {
        if (value == null) {
            this.storage.remove(STORAGE_TOKEN);
        } else {
            this.storage.set(STORAGE_TOKEN, value);
        }
    }

    public get returnUrl(): string {
        return <string>this.storage.get(STORAGE_URL) || null;
    }
    public set returnUrl(value: string) {
        if (value == null) {
            this.storage.remove(STORAGE_URL);
        } else {
            this.storage.set(STORAGE_URL, value);
        }
    }

    public getAnswers(category: string, guid: string): Answer[] {
        var storageUrl = 'answers/' + category + '/' + guid;
        return <Answer[]>this.storage.get(storageUrl) || [];
    }
    public setAnswers(category: string, guid: string, value: Answer[]) {
        var storageUrl = 'answers/' + category + '/' + guid;
        if (value == null || value.length <= 0) {
            this.storage.remove(storageUrl);
        } else {
            this.storage.set(storageUrl, value);
        }
    }
    public getCompleted(category: string, guid: string): number {
        var storageUrl = 'completed/' + category + '/' + guid;
        var completed = <number>this.storage.get(storageUrl) || 0;
        if (completed == 0) { return 0; }
        return completed + 1;
    }
    public setCompleted(category: string, guid: string, value: number) {
        var storageUrl = 'completed/' + category + '/' + guid;
        if (value == null || value < 0 || value > 18) {
            this.storage.remove(storageUrl);
        } else {
            this.storage.set(storageUrl, value);
        }
    }

    public getAllAnswers(guid: string) {
        var answers = <Answer[]>[];
        for (let c of CATEGORIES) {
            var storageUrl = 'answers/' + c + '/' + guid;
            var answer = <Answer[]>this.storage.get(storageUrl);

            for (let a of answer) {answers.push(a);}
        }
        return answers;
    }
}