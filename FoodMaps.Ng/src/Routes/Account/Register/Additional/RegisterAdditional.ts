import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NetworkService } from '../../../../Services/NetworkService';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { StorageService } from '../../../../Services/StorageService';
import { LoaderService } from '../../../../Services/LoaderService';
import { ErrorService } from '../../../../Services/Errors/ErrorService';
import { User, Job, Address } from '../../../../Services/Models/DatabaseModels';

export interface CEPSearchHelper {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}
export interface RegisterAdditionalModel {
    jobName: string;
    identifier: string;
    university: string;
    address: Address;
}
@Component({
    selector: 'register-additional',
    templateUrl: './RegisterAdditional.html',
    styleUrls: ['./RegisterAdditional.scss']
})
export class RegisterAdditionalComponent implements OnInit {
    public toasterconfig: ToasterConfig;
    public user: User;
    public returnUrl: string = '/';
    public model: RegisterAdditionalModel = <RegisterAdditionalModel>{};
    public helper: CEPSearchHelper = <CEPSearchHelper>{};

    jobs = [
        { id: 1, name: "Nutricionista" },
        { id: 2, name: "Nutrólogo" },
       { id: 3, name: "Outro" }
    ];
    selectedJob = null;
    public identifier: string = "";
    public university: string = "";
    public cep: string = "";

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private errorService: ErrorService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(p => this.returnUrl = p['return'] || '/');
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
        this.user = this.storage.user;
    }

    save() {
        if (!this.validateData) return;
        const DIGIT_ONLY_REG: RegExp = new RegExp(".");
        this.identifier = this.identifier.trim();
        this.cep = this.cep.trim();
        this.cep = this.cep.replace("-", "");
        this.model.jobName = this.selectedJob.name;
        this.model.university = this.university.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        this.model.address = {} as Address;
        this.model.address.cep = this.cep;
        if (this.identifier != null && this.identifier != "") {
            if (!DIGIT_ONLY_REG.test(this.identifier)) {
                this.toasterService.pop("error", "Erro", "Somente digitos na identificação")
                return;
            }
            this.model.identifier = this.identifier;
        }


        this.loaderService.display(true);
        if (navigator.onLine) {
            this.net.get<CEPSearchHelper>('https://viacep.com.br/ws/' + this.cep + '/json/', false).subscribe(c => {
                console.log(c);
                this.model.address.city = c.localidade;
                this.model.address.hood = c.bairro;
                this.model.address.street = c.logradouro;
                this.model.address.state = c.uf;

                this.net.post<RegisterAdditionalModel>(`Authentication/RegisterAdditional`, this.model).subscribe(t => {
                    this.loaderService.display(false);
                    this.router.navigateByUrl("conta/perfil");
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
            }, error => {
                this.net.post<RegisterAdditionalModel>(`Authentication/RegisterAdditional`, this.model).subscribe(t => {
                    this.loaderService.display(false);
                    this.router.navigateByUrl("conta/perfil");
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
            });;

        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }
    }

    validateData():boolean {
        if (this.selectedJob == null || this.selectedJob.name != "Nutricionista" && this.selectedJob.name != "Nutrólogo" && this.selectedJob.name != "Outro") {
            this.toasterService.pop("error", "Erro", "Por favor, selecione uma profissão");
            return false;
        }
        if (this.cep == null || this.cep == "" || this.cep.replace("-", "").length != 8) {
            this.toasterService.pop("error", "Erro", "Por favor, digite um CEP válido");
            return false;
        }
        if (this.university == null || this.university == "" || this.university.length < 2 || this.university.length > 40) {
            this.toasterService.pop("error", "Erro", "Por favor, selecione uma profissão");
            return false;
        }
        if (this.selectedJob.name == "Outro") {
            this.identifier = "";
        }
        else {
            if (this.identifier == null || this.identifier == "") {
                this.toasterService.pop("error", "Erro", "Por favor, digite a sua identificação");
                return false;
            }
        }
        return true;
    }

}