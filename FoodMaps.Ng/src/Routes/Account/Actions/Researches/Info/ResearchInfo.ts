import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../../Services/NetworkService';
import { LoaderService } from '../../../../../Services/LoaderService';
import { StorageService } from '../../../../../Services/StorageService';
import { ErrorService } from '../../../../../Services/Errors/ErrorService';
import { User, Questionnaire } from '../../../../../Services/Models/DatabaseModels';

export interface GetQuestionnaireModel {
    questionnaire: Questionnaire;
}

@Component({
    selector: 'research-info',
    templateUrl: './ResearchInfo.html',
    styleUrls: ['./ResearchInfo.scss']
})
export class ResearchInfoComponent implements OnInit {

    public toasterconfig: ToasterConfig;
    public questionnaire: Questionnaire = <Questionnaire>{};
    public user: User;
    public guid: string = '';
    public name: string = "";
    public link: string = "";

    constructor(
        private net: NetworkService,
        private storage: StorageService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute
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

        this.guid = this.route.snapshot.paramMap.get('guid') || '';
        if (this.guid == null || this.guid == '') {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, tente recarregar a página");
            return;
        }

        if (navigator.onLine) {
            this.net.get<GetQuestionnaireModel>(`Questionnaire/GetByGuid/` + this.guid).subscribe(t => {
                if (t != null && t.questionnaire != null) {
                    this.questionnaire = t.questionnaire;
                    this.link = window.location.origin + "/questionario/painel/" + t.questionnaire.guid;
                }
            }, error => {
                this.loaderService.display(false);
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente recarregar a página');
                    this.loaderService.display(false);
                    return;
                }
            });
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Sem conexão com a internet. Não foi possível resgatar o número de pacientes.');
            this.loaderService.display(false);
        }
    }

    view() {
        if (this.questionnaire == null || this.questionnaire.guid == null || this.questionnaire.guid == '') {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, por favor tente recarregar a página");
            return;
        }
        this.router.navigate(['/questionario/pesquisas/respostas', this.questionnaire.guid], { queryParams: { name: this.questionnaire.name, datetime: this.questionnaire.createdOn} });
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