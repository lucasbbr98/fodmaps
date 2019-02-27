import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';

import { Router } from "@angular/router";
import { StorageService } from "./StorageService";

export interface IAnalysis {
    name: string;
    route: string;
    parameters: string;
}

@Injectable()
export class NetworkService {

    private base = 'v1/';
    private errors: string[] = [];
    private debug: boolean = true;

    private get authToken(): string {
        return this.storage.token;
    }

    constructor(
        private http: Http,
        private router: Router,
        private storage: StorageService
    ) {
        this.errors = [];
    }

    get<T>(url: string, hasAuth = true): Observable<T> {
        if (hasAuth) {
            let options = this.doHeaders();
            return this.doSub(this.http.get(this.doUrl(url), options));
        }
        else {
            return this.doSub(this.http.get(this.doUrl(url)));
        }
    }
    post<T>(url: string, data: any, file:any = null): Observable<T> {
        return this.basePut<T>(url, data);
    }
    put<T>(url: string, data: any): Observable<T> {
        let options = this.doHeaders();
        return this.doSub(this.http.put(this.doUrl(url), data, options));
    }
    patch<T>(url: string, data: any): Observable<T> {
        let options = this.doHeaders();
        return this.doSub(this.http.patch(this.doUrl(url), data, options));
    }


    private doSub<T>(obs: Observable<Response>) {
        var ob1: Observable<T> = obs.map(this.extractData)
            .catch(this.handleError);

        return ob1;

    }

    private extractData(res: Response) {
        try {
            let body = res.json();
            return body || [];
        }
        catch (ex) {
            return {
                isOk:res.ok,
                status: res.status,
                message:res.statusText
            }
        }
    }

    private handleError(error: Response | any) {
        if (error instanceof Response &&
            error.status == 401 &&
            this.router) {
            this.router.navigate(['/account/login']);
            return null;
        }

        return Observable.throw(new Error(error.status));
    }

    private doUrl(url: string) {
        if (url.indexOf('://') != -1)
            return url;
        return this.base + (url);
    }

    private doHeaders(hasFile: boolean = false) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.authToken) {
            headers.append('Authorization', 'bearer ' + this.authToken);
        }

        return new RequestOptions({ headers: headers });
    }

    private basePut<T>(url: string, data: any): Observable<T> {
        let options = this.doHeaders();
        return this.doSub(this.http.post(this.doUrl(url), data, options));
    }
}