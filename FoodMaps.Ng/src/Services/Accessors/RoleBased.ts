import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from './../StorageService';


@Injectable()
export class AdminOnly implements CanActivate {

    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    canActivate(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        var message: string = null;

        if (!this.storage.isLoggedIn) {
            message = 'Você precisa se logar!';
        }

        if (!this.storage.isInRole('Admin')) {
            message = 'Você precisa ser um administrador!';
        }

        if (message == null) {
            return true;
        }
        this.storage.returnUrl = state.url;
        console.log(this.storage.returnUrl);
        this.router.navigate(['conta/login'], {
            queryParams: {
                return: state.url,
                message: message
            }
        });
        return false;
    }

}

@Injectable()
export class PlannerOnly implements CanActivate {
    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    canActivate(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        var message: string = null;
        if (!this.storage.isLoggedIn) {
            message = 'Você precisa se logar!';
        }

        if (!this.storage.isInRole('Planner')) {
            message = 'Você precisa ser um planejador!';
        }

        if (message == null) {
            return true;
        }
        this.storage.returnUrl = state.url;
        console.log(this.storage.returnUrl);
        this.router.navigate(['conta/login'], {
            queryParams: {
                return: state.url,
                message: message
            }
        });
        return false;
    }

}