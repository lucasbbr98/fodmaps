import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../Services/NetworkService';
import { LoaderService } from '../../../Services/LoaderService';
import { StorageService } from '../../../Services/StorageService';
import { ErrorService } from '../../../Services/Errors/ErrorService';
import { User, Answer } from '../../../Services/Models/DatabaseModels';

export interface QuestionnaireAnswersModel {
    answers: Answer[];
    guid: string;
}

@Component({
    selector: 'questionnaire-dashboard',
    templateUrl: './QuestionnaireDashboard.html',
    styleUrls: ['./QuestionnaireDashboard.scss']
})
export class QuestionnaireDashboardComponent implements OnInit {

    private guid: string = 'exemplo';
    public toasterconfig: ToasterConfig;
    public user: User;
    public model: QuestionnaireAnswersModel = <QuestionnaireAnswersModel>{};

    public fruitsCompleted: number = 0;
    public fruitsPercentageString: string = '0%'
    public maxFruits: number = 18;

    public sugarCompleted: number = 0;
    public sugarPercentageString: string = '0%'
    public maxSugar: number = 4;

    public grainsCompleted: number = 0;
    public grainsPercentageString: string = '0%'
    public maxGrains: number = 8;

    public pastaCompleted: number = 0;
    public pastaPercentageString: string = '0%'
    public maxPasta: number = 16;

    public milkCompleted: number = 0;
    public milkPercentageString: string = '0%';
    public maxMilk: number = 10;

    public vegetablesCompleted: number = 0;
    public vegetablesPercentageString: string = '0%';
    public maxVegetables: number = 9;


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
        this.route.params.subscribe(p => {
            this.guid = p['guid'] || 'exemplo';
        });

        this.checkCompleted();
        this.user = this.storage.user;
        this.model.guid = this.guid;

        // Forces top navigation
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        this.toasterconfig = new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 7000,
            positionClass: 'centered',
            limit: 1
        });
    }

    goTo(url: string, category: string, step: number) {
        if (step > 0) {step = step - 1;}
        if (navigator.onLine) {
            this.router.navigate([url, this.guid, category], { queryParams: { etapa: step } });
        }
        else {
            this.toasterService.pop('info', 'Internet', 'Confira a sua conexão com a internet');
        }
    }

    checkCompleted() {
        this.fruitsCompleted = this.storage.getCompleted('frutas', this.guid);
        this.fruitsPercentageString = this.toPercentageString(this.fruitsCompleted, this.maxFruits);

        this.sugarCompleted = this.storage.getCompleted('acucar', this.guid);
        this.sugarPercentageString = this.toPercentageString(this.sugarCompleted, this.maxSugar);

        this.vegetablesCompleted = this.storage.getCompleted('legumes-e-verduras', this.guid);
        this.vegetablesPercentageString = this.toPercentageString(this.vegetablesCompleted, this.maxVegetables);

        this.milkCompleted = this.storage.getCompleted('leite-e-derivados', this.guid);
        this.milkPercentageString = this.toPercentageString(this.milkCompleted, this.maxMilk);

        this.grainsCompleted = this.storage.getCompleted('graos', this.guid);
        this.grainsPercentageString = this.toPercentageString(this.grainsCompleted, this.maxGrains);

        this.pastaCompleted = this.storage.getCompleted('cereais-e-massas', this.guid);
        this.pastaPercentageString = this.toPercentageString(this.pastaCompleted, this.maxPasta);
        
    }

    toPercentageString(n: number, max: number): string{

        if (n == 0) {
            return "0%";
        }

        var fruitsPercentage = (n / max) * 100;
        if (fruitsPercentage > 0 && fruitsPercentage < 10) {
            return fruitsPercentage.toString().substr(0, 3) + "%";
        }
        if (fruitsPercentage > 10 && fruitsPercentage < 100) {
            return fruitsPercentage.toString().substr(0, 2) + "%";
        }
        if (fruitsPercentage >= 100) {
            return "100%";
        }

        return '0%';
    }

    //TODO: Send to API
    completeQuestionnaire() {
        if (!this.isQuestionnaireValid()) { return; }

        this.loaderService.display(true);
        if (navigator.onLine) {
            this.net.post<QuestionnaireAnswersModel>(`Questionnaire/SaveAnswers`, this.model).subscribe(t => {
                this.loaderService.display(false);
                this.toasterService.pop("success", "Sucesso", "Pesquisa adicionada com sucesso!");
                return;
            }, error => {
                if (!navigator.onLine) {
                    this.toasterService.pop('error', 'Erro Conexão', 'A sua conexão com a internet caiu e não foi possível obter a resposta do servidor. Tente novamente');
                    this.loaderService.display(false);
                    return;
                }
                var errorResponse = this.errorService.saveAnswers(error.message);
                this.toasterService.pop('error', 'Erro', errorResponse.error);
                this.loaderService.display(false);
            });
        }
        else {
            this.toasterService.pop('info', 'Sem conexão', 'Verifique a sua conexão com a internet');
            this.loaderService.display(false);
        }

    }
    isQuestionnaireValid(): boolean {
        if (this.sugarCompleted != this.maxSugar) {
            this.toasterService.pop('error', 'Erro', 'Responda todas as perguntas da categoria Açúcar');
            return false;
        }
        if (this.pastaCompleted != this.maxPasta) {
            this.toasterService.pop('error', 'Erro', 'Responda todas as perguntas da categoria Cereais e Massas');
            return false;
        }
        if (this.fruitsCompleted != this.maxFruits) {
            this.toasterService.pop('error', 'Erro', 'Responda todas as perguntas da categoria Frutas');
            return false;
        }
        if (this.vegetablesCompleted != this.maxVegetables) {
            this.toasterService.pop('error', 'Erro', 'Responda todas as perguntas da categoria Legumes e Verduras');
            return false;
        }
        if (this.milkCompleted != this.maxMilk) {
            this.toasterService.pop('error', 'Erro', 'Responda todas as perguntas da categoria Leite e Derivados');
            return false;
        }
        if (this.grainsCompleted != this.maxGrains) {
            this.toasterService.pop('error', 'Erro', 'Responda todas as perguntas da categoria Grãos');
            return false;
        }
        if (this.guid == 'exemplo') {
            this.toasterService.pop('info', 'Informação', 'Esse é um exemplo, por isso não será registrado no banco de dados');
            return false;
        }
        this.model.answers = this.storage.getAllAnswers(this.guid);
        return true;
    }

}