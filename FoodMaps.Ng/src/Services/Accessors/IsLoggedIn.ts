import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from './../StorageService';

@Injectable()
export class IsLoggedIn implements CanActivate {

    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    canActivate(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {

        if (this.storage.isLoggedIn) {
            return true;
        }
        this.storage.returnUrl = state.url;
        this.router.navigate(['conta/login'], {
            queryParams: {
                return: state.url
            }
        });
        return false;
    }
}