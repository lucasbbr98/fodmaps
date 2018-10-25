import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../../Services/NetworkService';
import { LoaderService } from '../../../../../Services/LoaderService';
import { StorageService } from '../../../../../Services/StorageService';
import { ErrorService } from '../../../../../Services/Errors/ErrorService';
import { User, Questionnaire } from '../../../../../Services/Models/DatabaseModels';
import { CreateQuestionnaireModel } from '../../../../../Services/Models/TranslationModels';

export interface GetQuestionnaireModel {
    questionnaire: Questionnaire;
}

@Component({
    selector: 'patient-info',
    templateUrl: './PatientInfo.html',
    styleUrls: ['./PatientInfo.scss']
})
export class PatientInfoComponent implements OnInit {

    public toasterconfig: ToasterConfig;
    public model: CreateQuestionnaireModel = <CreateQuestionnaireModel>{};
    public pendingQuestionnaire: Questionnaire = <Questionnaire>{};
    public user: User;
    public id: number = 0;
    public name: string = "";
    public hasPending: boolean = false;
    public link: string = "";
    private pendingAttempts = 0;

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private errorService: ErrorService
    ) { }


    ngOnInit(): void {
        this.hasPending = false;
        this.name = this.route.snapshot.queryParamMap.get('name') || "";
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

        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        if (this.id == null || this.id <= 0) {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, tente recarregar a página");
            return;
        }
        this.updatePending();
        this.model.name = this.name;
        this.model.type = 'questionario';
        this.model.patientId = this.id;

    }

    send() {
        if (this.model.name == null || this.model.name.trim() == "") {
            this.toasterService.pop('error', 'Erro', 'Digite um nome para a sua pesquisa');
            return;
        }
        this.loaderService.display(true);
        if (navigator.onLine) {
            this.model.type = "questionario";
            this.model.patientId = this.id;
            this.net.post<CreateQuestionnaireModel>(`User/CreateQuestionnaire`, this.model).subscribe(t => {
                this.loaderService.display(false);
                this.toasterService.pop("success", "Sucesso", "Questionário gerado com sucesso! Compartilhe o link a seguir com " + this.name);
                this.updatePending();
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


    updatePending() {
        if (navigator.onLine) {
            this.net.get<GetQuestionnaireModel>(`User/GetPendingQuestionnaire/` + this.id).subscribe(t => {
                if (t != null && t.questionnaire != null) {
                    this.pendingQuestionnaire = t.questionnaire;
                    this.link = "http://localhost:42300/questionario/painel/" + t.questionnaire.guid;
                    this.hasPending = true;
                    this.toasterService.pop('success', 'Sucesso', 'Questionário pendente encontrado, compartilhe o link a seguir com ' + this.name);
                }
            }, error => {
                this.loaderService.display(false);
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente recarregar a página');
                    this.loaderService.display(false);
                    return;
                }
                this.pendingAttempts++;
                if (this.pendingAttempts <= 10) {
                    this.updatePending();
                }
            });
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Sem conexão com a internet. Não foi possível resgatar o número de pacientes.');
            this.loaderService.display(false);
        }

    }
    //TODO
    view() {
        this.toasterService.pop('info', 'TODO', 'Não implementado ainda')
    }

    copyToClipboard() {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.link;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.toasterService.pop('success', 'Sucesso', 'O link foi copiado, basta colar para compartilhar!');
    }
}