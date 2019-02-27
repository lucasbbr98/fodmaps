import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../Services/NetworkService';
import { StorageService } from '../../../Services/StorageService';
import { ErrorService } from '../../../Services/Errors/ErrorService';
import { LoaderService } from '../../../Services/LoaderService';
import { ResetPasswordModel } from '../../../Services/Models/TranslationModels';


@Component({
    selector: 'reset-password-token',
    templateUrl: './ResetPassword.html',
    styleUrls: ['./ResetPassword.scss']
})
export class ResetPasswordComponent implements OnInit {
    public password: string = '';
    public password2: string = '';
    public postModel: ResetPasswordModel = <ResetPasswordModel>{};
    public passwordToken: string = '';

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
            limit: 1

        });

    ngOnInit(): void {
        var urlInfo = this.route.snapshot.paramMap.get('passwordToken');
        if (urlInfo == null || urlInfo == "") {
            this.toasterService.pop("error", "Erro", "Há um erro no link, tente recarregar a página");
            return;
        }
        this.passwordToken = urlInfo;
    }
    public get validPassword(): boolean {
        if (this.password.length < 6 || this.password.length > 50) {
            return false;
        }
        return true;
    }
    resetPassword() {
        if (this.password == null || this.password == "" || !this.validPassword) {
            this.toasterService.pop("error", "Erro", "Por favor forneça uma nova senha válida");
            return;
        }
        if (this.password != this.password2) {
            this.toasterService.pop("error", "Erro", "Senhas diferentes");
        }
        this.postModel.passwordToken = this.passwordToken;
        this.postModel.password = this.password;
        this.net.post('Authentication/ResetPassword', this.postModel).subscribe((res: Response | any) => {

            // Do login
            if (res.status == 200 || res.isOk == true) {
                this.storage.password = "";
                this.toasterService.pop('success', 'Sucesso', 'A sua senha foi alterada, tente fazer o login :)');
                this.loaderService.display(false);
            }
            else {
                this.toasterService.pop('error', 'Erro', 'Houve um erro interno');
                this.loaderService.display(false);
            }
        }, err => {
            if (err.message == '400') {
                this.toasterService.pop('error', 'Erro', 'Você não forneceu uma senha válida. Tente novamente');
                this.loaderService.display(false);
                return;
            }

            if (err.message == '406') {
                this.toasterService.pop('error', 'Erro', 'Verifique novamente o link. Entre em contato caso o problema persista.');
                this.loaderService.display(false);
                return;
            }


            this.toasterService.pop('error', 'Erro', 'Houve um erro interno');
            this.loaderService.display(false);
        });
    }

    back() {
        if (navigator.onLine) {
            this.router.navigateByUrl('/');
        }
        else {
            this.toasterService.pop('info', 'Internet', 'Verifique a sua conexão com a internet');
        }

    }

}
