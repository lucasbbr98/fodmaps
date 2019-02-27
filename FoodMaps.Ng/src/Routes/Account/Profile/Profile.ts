import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../Services/NetworkService';
import { LoaderService } from '../../../Services/LoaderService';
import { StorageService } from '../../../Services/StorageService';
import { ErrorService } from '../../../Services/Errors/ErrorService';
import { User } from '../../../Services/Models/DatabaseModels'
import { CreateQuestionnaireModel, CreatePatientModel, GetIntegerModel } from '../../../Services/Models/TranslationModels';


@Component({
    selector: 'profile',
    templateUrl: './Profile.html',
    styleUrls: ['./Profile.scss']
})

export class ProfileComponent implements OnInit {
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
    public showAddPatient: boolean = false;
    public showAddResearch: boolean = false;
    public toasterconfig: ToasterConfig;
    public user: User;
    public model: CreatePatientModel = <CreatePatientModel>{};
    public qModel: CreateQuestionnaireModel = <CreateQuestionnaireModel>{};
    public patientCount = 0;
    public researchCount = 0;

    public bday: string = '';
    public bmonth: string = '';
    public byear: number = 0;
    public byearError: string = '';
    private currentYear: number;
    public minDate: number;
    public maxDate: number;
    public get dateError(): string {
        return 'Ano completo entre ' + this.minDate + ' e ' + this.maxDate;
    }

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private errorService: ErrorService
    ) { }


    ngOnInit(): void {
        this.showAddPatient = false;
        this.showAddResearch = false;
        this.user = this.storage.user;
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

        this.currentYear = new Date().getFullYear();
        this.minDate = new Date().getFullYear() - 100;
        this.maxDate = new Date().getFullYear();

        // Gets how many patients the user has
        if (navigator.onLine) {
            this.net.get<GetIntegerModel>(`User/GetPatientsCount`).subscribe(t => {
                this.patientCount = t.value;
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente recarregar a página');
                    this.loaderService.display(false);
                    return;
                }
                this.toasterService.pop('info', 'Erro', 'Não foi possível carregar o número de pacientes, tente recarregar a página.');
                this.loaderService.display(false);
                });

            // Gets how many questionnaires the user has
            this.net.get<GetIntegerModel>(`User/GetResearchesCount`).subscribe(t => {
                this.researchCount = t.value;
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente recarregar a página');
                    this.loaderService.display(false);
                    return;
                }
                this.toasterService.pop('info', 'Erro', 'Não foi possível carregar o número de pesquisas.');
                this.loaderService.display(false);
            });
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Sem conexão com a internet. Não foi possível resgatar o número de pesquisas.');
            this.loaderService.display(false);
        }

    }

    createNewPatient() {
        if (!this.isModelValid()) { return; }
        this.model.name = this.model.name.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        this.model.surname = this.model.surname.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        this.model.stringBday = this.byear + "-" + this.bmonth + "-" + this.bday;
        this.loaderService.display(true);
        if (navigator.onLine) {
            this.net.post<CreatePatientModel>(`User/CreatePatient`, this.model).subscribe(t => {
                this.loaderService.display(false);
                this.model.gender = "";
                this.model.height = null;
                this.model.name = "";
                this.model.surname = "";
                this.model.weight = null;
                this.model.stringBday = "";
                this.bday = "";
                this.bmonth = "";
                this.byear = null;
                this.patientCount = this.patientCount + 1;
                this.showAddPatient = false;
                this.showAddResearch = false;
                this.toasterService.pop("success", "Sucesso", "Paciente adicionado com sucesso!");
                return;
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente novamente');
                    this.loaderService.display(false);
                    return;
                }
                var errorResponse = this.errorService.createPatient(error.message);
                this.toasterService.pop('error', 'Erro', errorResponse.error);
                this.loaderService.display(false);
            });
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }

    }

    createNewResearch() {
        if (this.qModel.name == null || this.qModel.name.trim() == "") {
            this.toasterService.pop('error', 'Erro', 'Digite um nome para a sua pesquisa');
            return;
        }
        this.loaderService.display(true);
        if (navigator.onLine) {
            this.qModel.type = "pesquisa";
            this.qModel.patientId = 0;
            this.net.post<CreateQuestionnaireModel>(`User/CreateQuestionnaire`, this.qModel).subscribe(t => {
                this.loaderService.display(false);
                this.qModel.name = "";
                this.qModel.type = "";
                this.researchCount = this.researchCount + 1;
                this.showAddResearch = false;
                this.showAddPatient = false;
                this.toasterService.pop("success", "Sucesso", "Pesquisa adicionada com sucesso!");
                return;
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente novamente');
                    this.loaderService.display(false);
                    return;
                }
                var errorResponse = this.errorService.createPatient(error.message);
                this.toasterService.pop('error', 'Erro', errorResponse.error);
                this.loaderService.display(false);
            });
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }
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
        catch (ex) {
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
    isModelValid(): boolean {
        if (!this.validDate) { return false; }
        if (this.model.weight == null || this.model.weight <= 0 || this.model.weight > 300) {
            this.toasterService.pop("error", "Erro", "Peso deve estar entre 1 e 300 kilogramas");
            return false;
        }
        if (this.model.height == null || this.model.height <= 0 || this.model.height > 250) {
            this.toasterService.pop("error", "Erro", "Altura deve estar entre 1 e 250 centímetros");
            return false;
        }

        const NAME_REG: RegExp = new RegExp("^[ A-Za-z\u00C0-\u00ff]+$");
        if (!this.isFieldValid(this.model.name, NAME_REG, 3, 40, "Verifique o seu nome")) {
            return false;
        }
        if (!this.isFieldValid(this.model.surname, NAME_REG, 2, 70, "Verifique o seu sobrenome")) {
            return false;
        }
        if (this.model.gender == "" || this.model.gender == null) {
            this.toasterService.pop("error", "Erro", "Selecione o seu gênero");
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
    showPatients() {
        this.router.navigateByUrl("conta/pacientes");
    }
    showResearches() {
        this.router.navigateByUrl("conta/pesquisas");
    }
}