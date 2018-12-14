import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../Services/NetworkService';
import { LoaderService } from '../../../Services/LoaderService';
import { GetStringModel } from '../../../Services/Models/TranslationModels';


@Component({
    selector: 'reset-password',
    templateUrl: './SendPasswordReset.html',
    styleUrls: ['./SendPasswordReset.scss']
})
export class SendPasswordResetComponent implements OnInit {
    public email: string = '';
    public postModel: GetStringModel = <GetStringModel>{};

    public get validEmail(): boolean {
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        return re.test(this.email.toLowerCase());
    }

    constructor(
        private net: NetworkService,
        private router: Router,
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

    }

    resetPassword() {
        if (this.email == null || this.email == "" || !this.validEmail) {
            this.toasterService.pop("error", "Erro", "Por favor forneça um e-mail válido");
            return;
        }
        this.postModel.data = this.email;
        this.loaderService.display(true);
        this.net.post('Authentication/SendResetPassword', this.postModel).subscribe((res: Response | any) => {

            // Do login
            if (res.status == 200 || res.isOk == true) {
                this.toasterService.pop('success', 'Sucesso', 'Um e-mail foi enviado com um link para resetar a senha');
                this.loaderService.display(false);
            }
            else {
                this.toasterService.pop('error', 'Erro', 'Houve um erro interno');
                this.loaderService.display(false);
            }
        }, err => {
            if (err.message == '400') {
                this.toasterService.pop('error', 'Erro', 'Você não forneceu um e-mail');
                this.loaderService.display(false);
                return;
            }

            if (err.message == '404') {
                this.toasterService.pop('error', 'Erro', 'E-mail não encontrado no sistema, cadastre-se!');
                this.loaderService.display(false);
                return;
            }


            this.toasterService.pop('error', 'Erro', 'Houve um erro interno');
            this.loaderService.display(false);
        });
    }

    back() {
        if (navigator.onLine) {
            this.router.navigateByUrl('/conta/login');
        }
        else {
            this.toasterService.pop('info', 'Internet', 'Verifique a sua conexão com a internet');
        }

    }

}
