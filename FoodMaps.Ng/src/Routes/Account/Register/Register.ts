import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../Services/NetworkService';
import { LoaderService } from '../../../Services/LoaderService';
import { StorageService } from '../../../Services/StorageService';
import { ErrorService } from '../../../Services/Errors/ErrorService';
import { RegistrationModel } from '../../../Services/Models/TranslationModels';

@Component({
    selector: 'register',
    templateUrl: './Register.html',
    styleUrls: ['./Register.scss']
})

export class RegisterComponent implements OnInit {
    // Letting html smaller lol
    days: string[] = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31'
    ];
    public model: RegistrationModel = <RegistrationModel>{ };
    public type ='';
    public bday: string = '';
    public bmonth: string = '';
    public byear: number = 0;

    private currentYear: number;

    public byearError: string = '';
    public cpfError: string = '';
    public returnUrl: string = '/';
    public toasterconfig: ToasterConfig;

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private errorService: ErrorService,
        private route: ActivatedRoute,
    ) { }


    public minDate: number;
    public maxDate: number;
    public get dateError(): string {
        return 'Ano completo entre ' + this.minDate + ' e ' + this.maxDate;
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe(p => this.returnUrl = p['return'] || '/');

        this.currentYear = new Date().getFullYear();
        this.minDate = new Date().getFullYear() - 100;
        this.maxDate = new Date().getFullYear();
        this.toasterconfig = new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 7000,
            positionClass: 'centered',
            limit: 1
        });

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
   

    public get validDate(): boolean {
        if (this.bday == null || this.bday == '' || this.bmonth == '' || this.bmonth == null || this.byear <= 0) {
            this.toasterService.pop('error', 'Erro formulário', 'Forneça a sua data de aniversário');
            return false;
        }
        if (this.byear < this.minDate || this.byear > this.maxDate) {
            this.toasterService.pop('error', 'Erro formulário', 'Ano de aniversário inválido');
            return false;
        }
        if (parseInt(this.bday) <= 0 || parseInt(this.bday) > 31) {
            this.toasterService.pop('error', 'Erro formulário', 'Dia de aniversário inválido');
            return false;
        }
        if (parseInt(this.bmonth) <= 0 || parseInt(this.bmonth) > 12) {
            this.toasterService.pop('error', 'Erro formulário', 'Mês de aniversário inválido');
            return false;
        }
        let dateString = this.byear.toString() + '-' + this.bmonth + '-' + this.bday;
        try {
            var k = new Date(dateString);
            
            return true;
        }
        catch(ex){
            this.toasterService.pop('error', 'Erro formulário', 'Data inválida');
            return false;
        }
    }
    public get validBYear(): boolean {
        if (this.byear == null || this.byear == 0) {
            this.byearError = '';
            return false;
        }
        var minimumYear = this.currentYear - 130;
        if (this.byear > this.currentYear || this.byear < minimumYear) {
            this.byearError = 'Ano completo entre ' + minimumYear.toString() + ' e ' + this.currentYear.toString();
            return false;
        }
        this.byearError = '';
        return true;
    }
    public get validCPF(): boolean {
        if (this.model == null || this.model.cpf == null || this.model.cpf == "") {
            return;
        }
        var soma = 0;
        var resto;
        var inputCPF = this.model.cpf.replace(".", "");
        inputCPF = inputCPF.replace("-", "");
        inputCPF = inputCPF.replace(".", "");
        if (inputCPF.length != 11) {
            this.cpfError = "Digite um CPF válido";
            return false;
        }

        if (inputCPF == '00000000000' || inputCPF == '11111111111' || inputCPF == '22222222222' || inputCPF == '33333333333' || inputCPF == '44444444444' || inputCPF == '55555555555' || inputCPF == '66666666666' || inputCPF == '77777777777' || inputCPF == '88888888888' || inputCPF == '99999999999'  ) return false;
        for (var i = 1; i <= 9; i++) soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(inputCPF.substring(9, 10))) return false;

        soma = 0;
        for (var ii = 1; ii <= 10; ii++) soma = soma + parseInt(inputCPF.substring(ii - 1, ii)) * (12 - ii);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;


        if (resto != parseInt(inputCPF.substring(10, 11)))
        {
            this.cpfError = "Digite um CPF válido";
            return false;
        }
        this.cpfError = "";
        return true;
}


    register() {
        this.model.password = this.model.password.trim();
        this.model.email = this.model.email.trim();
        this.model.name = this.model.name.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        this.model.surname = this.model.surname.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        // Validates Model
        if (!this.isModelValid(this.model)) {
            return false;
        }
        this.model.dateString = this.byear + "-" + this.bmonth + "-" + this.bday;
        this.loaderService.display(true);
        // temp variable created to avoid complications whenever the connection goes down (ex: base64 encoding twice)
        var tempModel = this.model;
        if (navigator.onLine) {
            tempModel.password = btoa(this.model.password);
            this.net.post<RegistrationModel>(`Authentication/Register`, tempModel).subscribe(t => {               
                this.loaderService.display(false);
                this.router.navigate(['conta/login'], {
                    queryParams: {
                        msg: 'Conta criada com sucesso' 
                    }
                });
                return;
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente novamente');
                    this.loaderService.display(false);
                    return;
                }
                var errorResponse = this.errorService.register(error.message);
                this.toasterService.pop('error', 'Erro', errorResponse.error);
                this.loaderService.display(false);
            });;
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }
    }
    doLogin() {
        this.router.navigate(['conta/login'], {
            queryParams: {
                return: this.storage.returnUrl
            }
        });
    }

    isModelValid(model: RegistrationModel): boolean {
        const EMAIL_REG: RegExp = new RegExp("^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$");
        const PASSW_REG: RegExp = new RegExp(".");
        const NAME_REG: RegExp = new RegExp("^[ A-Za-z\u00C0-\u00ff]+$");

        if (!this.validDate) return false;
        if (!this.isFieldValid(this.model.email, EMAIL_REG, 1, 255, "Verifique o e-mail")) return false;
        if (!this.isFieldValid(this.model.password, PASSW_REG, 1, 255, "Verifique a senha")) return false;
        if (!this.isFieldValid(this.model.name, NAME_REG, 3, 40, "Nome entre 3 e 40 caracteres")) return false;
        if (!this.isFieldValid(this.model.surname, NAME_REG, 2, 70, "Sobrenome entre 2 e 70 caracteres")) return false;
        if (!this.validCPF) {
            this.toasterService.pop("error", "Erro", "Verifique o seu CPF")
            return false;
        }
        var temp = this.model.gender.toLowerCase();
        if (temp != "masculino" && temp != "feminino" && temp != "outros") {
            this.toasterService.pop("error", "Erro", "Selecione um gênero")
            return false;
        }

        return true;
    }
    isFieldValid(f: string, r: RegExp, min: number, max: number, err: string): boolean {
        if (f == null || f == "" || !r.test(f) || f.length < min || f.length > max) {
            this.toasterService.pop("error", "Erro", err);
            return false;
        }
        return true;
    }
}
