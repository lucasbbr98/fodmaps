import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Routes, RouterModule, Router } from '@angular/router';
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
        private storage: StorageService,
        private net: NetworkService,
        private router: Router) {
    }

    ngOnInit() {
        console.warn('FODMAP Project está sendo inicializado. Por favor usuário, para a sua própria segurança, nunca digite ou compartilhe informações resgatadas nessa tela. A utilização da mesma é exclusiva para desenvolvedores e qualquer compartilhamento de informações pode comprometer a segurança da sua conta pessoal e/ou infringir a sua privacidade. Nós do FODMAP Project jamais te pediremos para acessar essa página.')
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        var email = this.storage.email;
        var base64Password = btoa(this.storage.password);
        if (!email || !base64Password || !this.storage.token) { return; }

        this.loaderService.display(true);
        this.net.get<LoginModel>(`Authentication/Login/${this.storage.email}/${base64Password}`).subscribe(t => {
            this.storage.token = t.token;
            this.storage.email = this.email;
            this.storage.password = this.password;
            this.storage.user = t.user;
            this.loaderService.display(false);
            if (t.user.addressId == null || t.user.addressId == 0 || t.user.university == null || t.user.university == "" || t.user.jobId == null || t.user.jobId == 0) {
                this.router.navigateByUrl("conta/update");
                return;
            }
            else if (this.storage.returnUrl) {
                this.router.navigateByUrl(this.storage.returnUrl);
                this.storage.returnUrl = null;
                return;
            }
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
