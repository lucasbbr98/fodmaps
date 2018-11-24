﻿import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { StorageService } from '../../../Services/StorageService';
import { User, Question, Answer } from '../../../Services/Models/DatabaseModels';
import { WizardComponent } from 'angular-archwizard';

export class QuestionnaireQuestions {
    static imageBaseString = 'build/assets/';
    static ext = '.png';
    static fruitQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'abacate' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres de abacate nos últimos três meses?', id: 21 },
        { image: QuestionnaireQuestions.imageBaseString + 'ameixa' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma ameixa nos últimos três meses?', id: 22 },
        { image: QuestionnaireQuestions.imageBaseString + 'ameixa-seca' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma ameixa seca nos últimos três meses?', id: 23 },
        { image: QuestionnaireQuestions.imageBaseString + 'amora' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu três amoras nos últimos três meses?', id: 24 },
        { image: QuestionnaireQuestions.imageBaseString + 'banana-nanica' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma banana nanica nos últimos três meses?', id: 25 },
        { image: QuestionnaireQuestions.imageBaseString + 'banana-ouro' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma banana ouro nos últimos três meses?', id: 26 },
        { image: QuestionnaireQuestions.imageBaseString + 'caqui' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu um caqui nos últimos três meses?', id: 27 },
        { image: QuestionnaireQuestions.imageBaseString + 'damasco' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu um damasco nos últimos três meses?', id: 28 },
        { image: QuestionnaireQuestions.imageBaseString + 'goiaba-verde' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma goiaba verde nos últimos três meses?', id: 29 },
        { image: QuestionnaireQuestions.imageBaseString + 'leite-de-coco' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu três colheres de leite de coco nos últimos três meses?', id: 30 },
        { image: QuestionnaireQuestions.imageBaseString + 'maca' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma maçã nos últimos três meses?', id: 31 },
        { image: QuestionnaireQuestions.imageBaseString + 'manga' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma manga nos últimos três meses?', id: 32 },
        { image: QuestionnaireQuestions.imageBaseString + 'melancia' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma fatia de melancia nos últimos três meses?', id: 33 },
        { image: QuestionnaireQuestions.imageBaseString + 'melao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma fatia de melão nos últimos três meses?', id: 34 },
        { image: QuestionnaireQuestions.imageBaseString + 'nectarina' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma nectarina nos últimos três meses?', id: 35 },
        { image: QuestionnaireQuestions.imageBaseString + 'pera' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma pêra nos últimos três meses?', id: 36 },
        { image: QuestionnaireQuestions.imageBaseString + 'pessego' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu um pêssego nos últimos três meses?', id: 37 },
        { image: QuestionnaireQuestions.imageBaseString + 'uva-passa' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de uva passa nos últimos três meses?', id: 38 }]
    static grainsQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'bebida-soja' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou dois dedos de copo de requeijão de bebida de soja nos últimos três meses?', id: 58 },
        { image: QuestionnaireQuestions.imageBaseString + 'ervilha-graos' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de sopa e meia de ervilha in natura nos últimos três meses?', id: 59 },
        { image: QuestionnaireQuestions.imageBaseString + 'ervilha-tiras' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de ervilha torta nos últimos três meses?', id:60 },
        { image: QuestionnaireQuestions.imageBaseString + 'ervilha' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de ervilha em grãos enlatada nos últimos três meses?', id: 61 },
        { image: QuestionnaireQuestions.imageBaseString + 'feijao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma concha de feijão nos últimos três meses?', id: 62 },
        { image: QuestionnaireQuestions.imageBaseString + 'lentilha' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres e meia de lentilha nos últimos três meses?', id: 63 },
        { image: QuestionnaireQuestions.imageBaseString + 'pistache' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de pistache nos últimos três meses?', id: 64 },
        { image: QuestionnaireQuestions.imageBaseString + 'proteina-soja' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres de proteína de soja nos últimos três meses?', id: 65 }];
    static milkQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'chocolate' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu chocolate nos últimos três meses?', id: 48 },
        { image: QuestionnaireQuestions.imageBaseString + 'cream-cheese' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma ponta de faca de cream cheese nos últimos três meses?', id: 49 },
        { image: QuestionnaireQuestions.imageBaseString + 'creme-de-leite' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu creme de leite nos últimos três meses?', id: 50 },
        { image: QuestionnaireQuestions.imageBaseString + 'creme-pasteleiro' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu creme pasteleiro nos últimos três meses?', id: 51 },
        { image: QuestionnaireQuestions.imageBaseString + 'iogurte-natural' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu um pote de iogurte natural nos últimos três meses?', id: 52},
        { image: QuestionnaireQuestions.imageBaseString + 'leite' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou uma xícara de leite nos últimos três meses?', id: 53 },
        { image: QuestionnaireQuestions.imageBaseString + 'leite-com-achocolatado' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou meio copo de achocolatado nos últimos três meses?', id: 54 },
        { image: QuestionnaireQuestions.imageBaseString + 'leite-condensado' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu leite condensado nos últimos três meses?', id: 55 },
        { image: QuestionnaireQuestions.imageBaseString + 'queijo-ricota' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma fatia de queijo ricota nos últimos três meses?', id: 56 },
        { image: QuestionnaireQuestions.imageBaseString + 'sorvete-baunilha' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu três colheres de sorvete de baunilha nos últimos três meses?', id: 57 }];
    static pastaQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'aveia' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres de sopa e meia de aveia nos últimos três meses?', id: 5 },
        { image: QuestionnaireQuestions.imageBaseString + 'barra-de-cereal' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma barra de cereal nos últimos três meses?', id: 6 },
        { image: QuestionnaireQuestions.imageBaseString + 'batata-doce' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma batata doce nos últimos três meses?', id: 7 },
        { image: QuestionnaireQuestions.imageBaseString + 'biscoito' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu quatro biscoitos nos últimos três meses?', id: 8 },
        { image: QuestionnaireQuestions.imageBaseString + 'bolo' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma fatia de bolo nos últimos três meses?', id: 9 },
        { image: QuestionnaireQuestions.imageBaseString + 'cereal' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu seis colheres de cereal nos últimos três meses?', id: 10 },
        { image: QuestionnaireQuestions.imageBaseString + 'granola' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres de granola nos últimos três meses?', id: 11 },
        { image: QuestionnaireQuestions.imageBaseString + 'macarrao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma escumadeira de macarrão nos últimos três meses?', id: 12 },
        { image: QuestionnaireQuestions.imageBaseString + 'mandioca' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma mandioca nos últimos três meses?', id: 13 },
        { image: QuestionnaireQuestions.imageBaseString + 'milho' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de milho nos últimos três meses?', id: 14 },
        { image: QuestionnaireQuestions.imageBaseString + 'pao-de-forma' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas fatias de pão de forma nos últimos três meses?', id: 15 },
        { image: QuestionnaireQuestions.imageBaseString + 'pao-frances' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu um pão francês nos últimos três meses?', id: 16 },
        { image: QuestionnaireQuestions.imageBaseString + 'pao-integral' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas fatias de pão de forma integral nos últimos três meses?', id: 17 },
        { image: QuestionnaireQuestions.imageBaseString + 'pizza' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas fatias de pizza nos últimos três meses?', id: 18 },
        { image: QuestionnaireQuestions.imageBaseString + 'salgado' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu dois salgados nos últimos três meses?', id: 19 },
        { image: QuestionnaireQuestions.imageBaseString + 'sopa' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou uma concha de sopa nos últimos três meses?', id: 20 }
    ];
    static sugarQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'geleia' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma ponta de faca de geléia nos últimos três meses?', id: 1 },
        { image: QuestionnaireQuestions.imageBaseString + 'ketchup' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de ketchup nos últimos três meses?', id: 2 },
        { image: QuestionnaireQuestions.imageBaseString + 'mel' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de chá de mel nos últimos três meses?', id: 3 },
        { image: QuestionnaireQuestions.imageBaseString + 'refrigerante' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou um copo de refrigerante nos últimos três meses?', id: 4 }];
    static vegetableQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'abobora' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres e meia de abóbora nos últimos três meses?', id: 39 },
        { image: QuestionnaireQuestions.imageBaseString + 'alho' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu um alho nos últimos três meses?', id: 40 },
        { image: QuestionnaireQuestions.imageBaseString + 'alho-poro' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres de alho poró nos últimos três meses?', id: 41 },
        { image: QuestionnaireQuestions.imageBaseString + 'beterraba' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas colheres de beterraba nos últimos três meses?', id: 42 },
        { image: QuestionnaireQuestions.imageBaseString + 'cebola' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu duas fatias de cebola nos últimos três meses?', id: 43 },
        { image: QuestionnaireQuestions.imageBaseString + 'chuchu' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu três colheres de chuchu nos últimos três meses?', id: 44 },
        { image: QuestionnaireQuestions.imageBaseString + 'cogumelo' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma escumadeira de cogumelo nos últimos três meses?', id: 45 },
        { image: QuestionnaireQuestions.imageBaseString + 'couve-flor' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu três colheres de couve flor nos últimos três meses?', id: 46 },
        { image: QuestionnaireQuestions.imageBaseString + 'salsao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uma colher de salsão nos últimos três meses?', id: 47 }
    ];
}
@Component({
    selector: 'questionnaire-questions',
    templateUrl: './QuestionnaireQuestions.html',
    styleUrls: ['./QuestionnaireQuestions.scss']
})
export class QuestionnaireQuestionsComponent implements OnInit, AfterViewInit  {
    @ViewChild(WizardComponent)
    public wizard: WizardComponent;

    public toasterconfig: ToasterConfig;
    public user: User;
    private guid: string = 'exemplo';
    private category: string = '';
    public questions: Question[] = [];
    public answers: Answer[] = [];
    public selectedAnswer: Answer;
    public currentIndex: number = 0;
    private initialIndex: number = 0;
    public questionValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    public optionSelected: string = 'dia';
    public selectedRadio: number = 0;

    constructor(
        private storage: StorageService,
        private toasterService: ToasterService,
        private router: Router,
        private route: ActivatedRoute,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
    }


    ngOnInit(): void {
        this.route.params.subscribe(p => { this.guid = p['guid'] || 'exemplo'; this.category = p['category'] });
        this.route.queryParams.subscribe(p => { this.currentIndex = parseInt(p['etapa']) || 0; });
        this.initialIndex = this.currentIndex;
        this.user = this.storage.user;
        this.toasterconfig = new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 7000,
            positionClass: 'centered',
            limit: 1
        });

        // Wizzard Step Form Loading
        this.loadDefaultCategoryQuestions();
        var storageAnswers = this.storage.getAnswers(this.category, this.guid);
        if (storageAnswers.length > 0) {
            this.answers = storageAnswers;
        }
        else {
            this.loadDefaultCategoryAnswers();
        }
    }

    previous() {
        this.currentIndex--;
        this.selectedRadio = this.answers[this.currentIndex].value;
        this._changeDetectionRef.detectChanges();
    }

    next() {
        this.currentIndex++;
        this.saveOnLocalStorage();
    }

    save() {
        this.saveOnLocalStorage();
        this.router.navigate(['/questionario/painel', this.guid]);
    }

    saveOnLocalStorage() {
        this.selectedRadio = this.answers[this.currentIndex].value;
        this.answers[this.currentIndex].frequency = this.optionSelected;
        if (this.answers[this.currentIndex].frequency == 'dia') {
            this.answers[this.currentIndex].multiplier = 30;
        }
        else if (this.answers[this.currentIndex].frequency == 'semana') {
            this.answers[this.currentIndex].multiplier = 4;
        }
        else if (this.answers[this.currentIndex].frequency == 'mes') {
            this.answers[this.currentIndex].multiplier = 1;
        }
        else {
            this.answers[this.currentIndex].multiplier = 1;
        }
        this.answers[this.currentIndex].answered = true;
        this.storage.setAnswers(this.category, this.guid, this.answers);
        if (this.initialIndex <= this.currentIndex) {
            this.storage.setCompleted(this.category, this.guid, this.currentIndex);
        }
    }

    // Html stuff
    onRadioChange(value, question) {
        this.answers[this.currentIndex].value = value;
        this.answers[this.currentIndex].foodId = question.id;
    }
    onSelectChange() {
        this.answers[this.currentIndex].frequency = this.optionSelected;
        console.log(this.answers[this.currentIndex]);
    }
    goTo(url: string) {
        if (navigator.onLine) {
            this.router.navigate([url, this.guid]);
        }
        else {
            this.toasterService.pop('info', 'Internet', 'Confira a sua conexão com a internet');
        }
    }

    // Loads Default Questions and Answer objects
    loadDefaultCategoryQuestions() {
        switch (this.category) {
            case 'acucar': {
                this.questions = QuestionnaireQuestions.sugarQuestions;
                break;
            }
            case 'frutas': {
                this.questions = QuestionnaireQuestions.fruitQuestions;
                break;
            }
            case 'cereais-e-massas': {
                this.questions = QuestionnaireQuestions.pastaQuestions;
                break;
            }
            case 'legumes-e-verduras': {
                this.questions = QuestionnaireQuestions.vegetableQuestions;
                break;
            }
            case 'leite-e-derivados': {
                this.questions = QuestionnaireQuestions.milkQuestions;
                break;
            }
            case 'graos': {
                this.questions = QuestionnaireQuestions.grainsQuestions;
                break;
            }
            default: {
                break;
            }
        }
    }
    loadDefaultCategoryAnswers() {
        this.answers = this.buildAnswers(this.questions.length, this.questions[0].id);
    }
    buildAnswers(length: number, ii: number): Answer[] {
        var answers: Answer[] = [];
        for (var _i = 0; _i < length; _i++) {
            var answ: Answer = { questionnaireId: 0, value: 0, frequency: 'dia', foodId: ii, answered: false, multiplier: 0 };
            answers.push(answ);
            ii++;
        }
        return answers;
    }

    // Forces another change detection in order to fix the ngFor error
    ngAfterViewInit(): void {
        this._changeDetectionRef.detectChanges();
        this.wizard.navigation.goToStep(this.currentIndex);
    }
}