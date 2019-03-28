import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../Services/NetworkService';
import { StorageService } from '../../../Services/StorageService';
import { ErrorService } from '../../../Services/Errors/ErrorService';
import { LoaderService } from '../../../Services/LoaderService';
import {LoginModel} from '../../../Services/Models/TranslationModels';


@Component({
    selector: 'login',
    templateUrl: './Login.html',
    styleUrls: ['./Login.scss']
})
export class LoginComponent implements OnInit {
    public msg: string = '';
    public email: string = '';
    public password: string = '';
    public errorMsg: string = '';
    public rememberMe: boolean = false;
    public returnUrl: string = '/';

    public get validEmail(): boolean {
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        return re.test(this.email.toLowerCase());
    }
    public get validPassword(): boolean {
        if (this.password.length < 6 || this.password.length > 50) {
            return false;
        } 
        return true;
    }

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private errorService: ErrorService,
        private router: Router,
        private route: ActivatedRoute,
        private toasterService: ToasterService,
        private loaderService: LoaderService
    ) { }

    public toasterconfig: ToasterConfig =
    new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: true,
        timeout: 7000,
        positionClass: 'centered',
        limit:1    
    });

    ngOnInit(): void {
        this.email = this.storage.email;
        this.password = this.storage.password;
        

        if (this.email && this.password) {
            this.rememberMe = true;
        }

        this.route.queryParams.subscribe(p => this.returnUrl = p['return'] || '/');
        this.route.queryParams.subscribe(p => this.errorMsg = p['message'] || '');
        this.route.queryParams.subscribe(p => this.msg = p['msg'] || '');

    }

    login() {
        if (!this.validEmail) {
            this.toasterService.pop('error', 'Erro', 'Digite um e-mail válido');
            return;
        }
        if (!this.validPassword) {
            this.toasterService.pop('error', 'Erro', 'Digite uma senha válida');
            return;
        }
        this.loaderService.display(true);
        if (navigator.onLine) {
            var base64Password = btoa(this.password);
            this.net.get<LoginModel>(`Authentication/Login/${this.email}/${base64Password}`).subscribe(t => {
                this.storage.token = t.token;
                this.storage.email = this.email;
                this.storage.password = this.password;
                this.storage.user = t.user;
                this.loaderService.display(false);
                if (t.user.addressId == null || t.user.addressId == 0 || t.user.university == null || t.user.university == "" || t.user.jobId == null || t.user.jobId == 0) {
                    this.router.navigateByUrl("conta/update");
                }
                else if (this.storage.returnUrl) {
                    this.router.navigateByUrl(this.storage.returnUrl);
                    this.storage.returnUrl = null;
                }
                else {
                    this.router.navigateByUrl("conta/perfil");
                }
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente novamente');
                    this.loaderService.display(false);
                    return;
                }
                var errorResponse = this.errorService.login(error.message);
                this.toasterService.pop('error', 'Erro', errorResponse.error);
                this.loaderService.display(false);
            });;
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }

    }

    register() {
        if (navigator.onLine) {
            this.router.navigateByUrl("conta/cadastro");
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }
    }

    forgot() {
        if (navigator.onLine) {
            this.router.navigateByUrl('conta/resetar/senha');
        }
        else {
            this.toasterService.pop('info', 'Internet', 'Verifique a sua conexão com a internet');
        }

    }

}
