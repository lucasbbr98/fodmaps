import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
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
    selector: 'researches',
    templateUrl: './Researches.html',
    styleUrls: ['./Researches.scss']
})
export class ResearchesComponent implements OnInit {

    public toasterconfig: ToasterConfig;
    public user: User;
    public model: GetQuestionnairesModel;
    public researches: Questionnaire[] = [];
    public searchText: string = "";

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private errorService: ErrorService
    ) { }


    ngOnInit(): void {
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

        // Gets researches from user
        if (navigator.onLine) {
            this.net.get<GetQuestionnairesModel>(`User/GetResearches`).subscribe(t => {
                if (t != null && t.questionnaires != null && t.questionnaires.length > 0) {
                    this.researches = t.questionnaires;
                }
                else {
                    this.toasterService.pop("info", "Pesquisas", "Não encontramos nenhuma pesquisa associada a sua conta. Você pode criar pesquisas clicando no botão de lupa no seu perfil.");
                }
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

    // TODO
    seeResearch(q: Questionnaire) {
        if (q == null || q.guid == null || q.guid == "") {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, por favor tente recarregar a página");
            return;
        }
        this.router.navigate(['/conta/pesquisa/guid', q.guid]);
    }

}