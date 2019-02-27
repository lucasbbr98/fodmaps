import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { DirectivesModule } from './../Directives/Directives';
import { LocalStorageModule } from 'angular-2-local-storage';

// containers
import { NavbarComponent } from './Navbar/Navbar';
import { NetworkService } from './../Services/NetworkService';
import { StorageService } from './../Services/StorageService';
import { ErrorService } from './../Services/Errors/ErrorService';
import { LoaderService } from './../Services/LoaderService';
import { PlannerOnly, AdminOnly } from './../Services/Accessors/RoleBased';
import { IsLoggedIn } from './../Services/Accessors/IsLoggedIn';
import { User } from './../Services/Models/DatabaseModels';


export interface LoginModel {
    token: string;
    user: User;
}
@Component({
    selector: 'fodmaps-app',
    templateUrl: './App.html',
    styleUrls: ['./App.scss'],
})

export class AppComponent {
    showLoader: boolean;
    public email = this.storage.email;
    public password = this.storage.password;
    public token = this.storage.token;
    public returnUrl: string = '/';

    constructor(
        private loaderService: LoaderService,
        private storage: StorageService) {
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}

// Rotas Primárias, dentro dessas rotas terão outras
export const ROUTES: Routes = [
    { path: 'error', loadChildren: '../Routes/Modules/404#NotFoundModule' },
    { path: 'home', loadChildren: '../Routes/Modules/Home#HomeModule' },            
    { path: 'conta', loadChildren: '../Routes/Modules/Account#AccountModule' },
    { path: 'admin', loadChildren: '../Routes/Modules/Admin#AdminModule' },
    { path: 'questionario', loadChildren: '../Routes/Modules/Questionnaire#QuestionnaireModule' },
    { path: '', pathMatch: 'full', redirectTo: 'home' }, // Página inicial
    { path: '**', redirectTo: 'error' } //Página de erro padrão (404).
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES),
        LocalStorageModule.forRoot({ prefix: 'agrega-app', storageType: 'localStorage' }),
        DirectivesModule,
        ToasterModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    
    bootstrap: [
        AppComponent
    ],
    providers: [
        StorageService,
        NetworkService,
        IsLoggedIn,
        PlannerOnly,
        AdminOnly,
        ToasterService,
        LoaderService,
        ErrorService
    ]
})
export class AppModule {}
