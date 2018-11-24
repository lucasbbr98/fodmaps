import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../Services/NetworkService';
import { LoaderService } from '../../../../Services/LoaderService';
import { StorageService } from '../../../../Services/StorageService';
import { ErrorService } from '../../../../Services/Errors/ErrorService';
import { User, Questionnaire } from '../../../../Services/Models/DatabaseModels'

export interface GetQuestionnairesModel {
    questionnaires: Questionnaire[];
}

@Component({
    selector: 'questionnaire-patient-answers',
    templateUrl: './QuestionnairePatientAnswers.html',
    styleUrls: ['./QuestionnairePatientAnswers.scss']
})
export class QuestionnairePatientAnswersComponent implements OnInit {

    public toasterconfig: ToasterConfig;
    public user: User;
    public model: GetQuestionnairesModel;
    public questionnaires: Questionnaire[] = [];
    public patientId: number = 0;
    public name:string = '';

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        private errorService: ErrorService
    ) { }


    ngOnInit(): void {
        this.user = this.storage.user;
        this.name = this.route.snapshot.queryParamMap.get('name') || "";
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
            window.scrollTo(0, 0);
        });
        this.patientId = parseInt(this.route.snapshot.paramMap.get('patientId'));
        if (this.patientId == null || this.patientId <= 0) {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, tente recarregar a página");
            return;
        }
        // TODO: Change URL
        if (navigator.onLine) {
            this.net.get<GetQuestionnairesModel>(`Questionnaire/GetCompletedByPatient/` + this.patientId).subscribe(t => {
                if (t.questionnaires == null || t.questionnaires.length <= 0) {
                    this.toasterService.pop("info", "Pacientes", "Não encontramos nenhum paciente associado a sua conta no banco de dados. Você pode adicionar pacientes clicando no botão + no seu perfil.");
                    return;
                }
                this.questionnaires = t.questionnaires;

            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente recarregar a página');
                    this.loaderService.display(false);
                    return;
                }
                var errorResponse = this.errorService.createPatient(error.message);
                this.toasterService.pop('error', 'Erro', errorResponse.error);
                this.loaderService.display(false);
            });;
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Sem conexão com a internet. Não foi possível resgatar o número de pacientes.');
            this.loaderService.display(false);
        }


    }
    //TODO Change URL
    seeData(questionnaire: Questionnaire) {
        if (questionnaire == null || questionnaire.id == null || questionnaire.id <= 0) {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, por favor tente recarregar a página");
            return;
        }
        this.router.navigate(['/questionario/respostas/', questionnaire.guid], { queryParams: { name: questionnaire.name, datetime: questionnaire.modifiedOn } });
    }

}