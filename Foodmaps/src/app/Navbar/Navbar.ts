import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { StorageService } from './../../Services/StorageService';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
    selector: 'fodmaps-navbar',
    templateUrl: './Navbar.html',
    styleUrls: ['./Navbar.scss']
})
export class NavbarComponent implements OnInit {
    @ViewChild('navbarToggler') navbarToggler: ElementRef;
 
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 7000,
            positionClass: 'centered',
            limit: 1

        });
    navBarTogglerIsVisible() {
        return this.navbarToggler.nativeElement.offsetParent !== null;
    }

    collapseNav() {
        if (this.navBarTogglerIsVisible()) {
            this.navbarToggler.nativeElement.click();
        }
    }

    public get loggedIn(): boolean {
        return this.storage.isLoggedIn;
    }

    public get user() {
        return this.storage.user;
    }

    public isInRole(name: string): boolean {
        return this.storage.isInRole(name);
    }

    ngOnInit(): void {

    }

    constructor(
        private storage: StorageService,
        private router: Router,
        private toasterService: ToasterService
    ) { }

    goTo(url: string) {
        if (!navigator.onLine) {
            this.closeMenuOnSmallScreens();
            this.toasterService.pop('info', 'Internet', 'Confira a sua conexão com a internet');
            return;
        }

        if (url == '/questionario/painel') {
            this.router.navigate([url, 'exemplo']);
        }
        else {
            this.router.navigateByUrl(url);
        }
        this.closeMenuOnSmallScreens();
    }

    closeMenuOnSmallScreens() {
        if (this.navBarTogglerIsVisible()) {
            this.navbarToggler.nativeElement.click();
        }
    }
}