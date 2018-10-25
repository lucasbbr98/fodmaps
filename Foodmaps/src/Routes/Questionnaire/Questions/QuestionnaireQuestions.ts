import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { StorageService } from '../../../Services/StorageService';
import { User, Question, Answer } from '../../../Services/Models/DatabaseModels';
import { WizardComponent } from 'angular-archwizard';

export class QuestionnaireQuestions {
    static imageBaseString = 'build/assets/';
    static ext = '.png';
    static fruitQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'abacate' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu abacate nos últimos três meses?', id: 21 },
        { image: QuestionnaireQuestions.imageBaseString + 'ameixa' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu ameixa nos últimos três meses?', id: 22 },
        { image: QuestionnaireQuestions.imageBaseString + 'ameixa-seca' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu ameixa seca nos últimos três meses?', id: 23 },
        { image: QuestionnaireQuestions.imageBaseString + 'amora' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu amora nos últimos três meses?', id: 24 },
        { image: QuestionnaireQuestions.imageBaseString + 'banana-nanica' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu banana nanica nos últimos três meses?', id: 25 },
        { image: QuestionnaireQuestions.imageBaseString + 'banana-ouro' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu banana ouro nos últimos três meses?', id: 26 },
        { image: QuestionnaireQuestions.imageBaseString + 'caqui' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu caqui nos últimos três meses?', id: 27 },
        { image: QuestionnaireQuestions.imageBaseString + 'damasco' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu damasco nos últimos três meses?', id: 28 },
        { image: QuestionnaireQuestions.imageBaseString + 'goiaba-verde' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu goiaba verde nos últimos três meses?', id: 29 },
        { image: QuestionnaireQuestions.imageBaseString + 'leite-de-coco' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu leite de coco nos últimos três meses?', id: 30 },
        { image: QuestionnaireQuestions.imageBaseString + 'maca' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu maçã nos últimos três meses?', id: 31 },
        { image: QuestionnaireQuestions.imageBaseString + 'manga' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu manga nos últimos três meses?', id: 32 },
        { image: QuestionnaireQuestions.imageBaseString + 'melancia' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu melancia nos últimos três meses?', id: 33 },
        { image: QuestionnaireQuestions.imageBaseString + 'melao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu melão nos últimos três meses?', id: 34 },
        { image: QuestionnaireQuestions.imageBaseString + 'nectarina' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu nectarina nos últimos três meses?', id: 35 },
        { image: QuestionnaireQuestions.imageBaseString + 'pera' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pêra nos últimos três meses?', id: 36 },
        { image: QuestionnaireQuestions.imageBaseString + 'pessego' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pêssego nos últimos três meses?', id: 37 },
        { image: QuestionnaireQuestions.imageBaseString + 'uva-passa' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu uva passa nos últimos três meses?', id: 38 }]
    static grainsQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'bebida-soja' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou uma bebida de soja nos últimos três meses?', id: 58 },
        { image: QuestionnaireQuestions.imageBaseString + 'ervilha-graos' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu ervilha in natura nos últimos três meses?', id: 59 },
        { image: QuestionnaireQuestions.imageBaseString + 'ervilha-tiras' + QuestionnaireQuestions.ext, question: 'Com qual frequência você ervilha torta nos últimos três meses?', id:60 },
        { image: QuestionnaireQuestions.imageBaseString + 'ervilha' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu ervilha em grãos enlatada nos últimos três meses?', id: 61 },
        { image: QuestionnaireQuestions.imageBaseString + 'feijao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu feijao nos últimos três meses?', id: 62 },
        { image: QuestionnaireQuestions.imageBaseString + 'lentilha' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu lentilha nos últimos três meses?', id: 63 },
        { image: QuestionnaireQuestions.imageBaseString + 'pistache' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pistache nos últimos três meses?', id: 64 },
        { image: QuestionnaireQuestions.imageBaseString + 'proteina-soja' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu proteína de soja nos últimos três meses?', id: 65 }];
    static milkQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'chocolate' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu chocolate nos últimos três meses?', id: 48 },
        { image: QuestionnaireQuestions.imageBaseString + 'cream-cheese' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu cream cheese nos últimos três meses?', id: 49 },
        { image: QuestionnaireQuestions.imageBaseString + 'creme-de-leite' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu creme de leite nos últimos três meses?', id: 50 },
        { image: QuestionnaireQuestions.imageBaseString + 'creme-pasteleiro' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu creme pasteleiro nos últimos três meses?', id: 51 },
        { image: QuestionnaireQuestions.imageBaseString + 'iogurte-natural' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu iogurte natural nos últimos três meses?', id: 52},
        { image: QuestionnaireQuestions.imageBaseString + 'leite' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou leite nos últimos três meses?', id: 53 },
        { image: QuestionnaireQuestions.imageBaseString + 'leite-com-achocolatado' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou leite com achocolatado nos últimos três meses?', id: 54 },
        { image: QuestionnaireQuestions.imageBaseString + 'leite-condensado' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu leite condensado nos últimos três meses?', id: 55 },
        { image: QuestionnaireQuestions.imageBaseString + 'queijo-ricota' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu queijo ricota nos últimos três meses?', id: 56 },
        { image: QuestionnaireQuestions.imageBaseString + 'sorvete-baunilha' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu sorvete de baunilha nos últimos três meses?', id: 57 }];
    static pastaQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'aveia' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu aveia nos últimos três meses?', id: 5 },
        { image: QuestionnaireQuestions.imageBaseString + 'barra-de-ceral' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu barra de cereal nos últimos três meses?', id: 6 },
        { image: QuestionnaireQuestions.imageBaseString + 'batata-doce' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu batata doce nos últimos três meses?', id: 7 },
        { image: QuestionnaireQuestions.imageBaseString + 'biscoito' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu biscoito nos últimos três meses?', id: 8 },
        { image: QuestionnaireQuestions.imageBaseString + 'bolo' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu bolo nos últimos três meses?', id: 9 },
        { image: QuestionnaireQuestions.imageBaseString + 'cereal' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu cereal nos últimos três meses?', id: 10 },
        { image: QuestionnaireQuestions.imageBaseString + 'granola' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu granola nos últimos três meses?', id: 11 },
        { image: QuestionnaireQuestions.imageBaseString + 'macarrao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu macarrão nos últimos três meses?', id: 12 },
        { image: QuestionnaireQuestions.imageBaseString + 'mandioca' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu mandioca nos últimos três meses?', id: 13 },
        { image: QuestionnaireQuestions.imageBaseString + 'milho' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu milho nos últimos três meses?', id: 14 },
        { image: QuestionnaireQuestions.imageBaseString + 'pao-de-forma' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pão de forma nos últimos três meses?', id: 15 },
        { image: QuestionnaireQuestions.imageBaseString + 'pao-frances' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pão francês nos últimos três meses?', id: 16 },
        { image: QuestionnaireQuestions.imageBaseString + 'pao-integral' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pão integral nos últimos três meses?', id: 17 },
        { image: QuestionnaireQuestions.imageBaseString + 'pizza' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu pizza nos últimos três meses?', id: 18 },
        { image: QuestionnaireQuestions.imageBaseString + 'salgado' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu salgado nos últimos três meses?', id: 19 },
        { image: QuestionnaireQuestions.imageBaseString + 'sopa' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou sopa nos últimos três meses?', id: 20 }
    ];
    static sugarQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'geleia' + QuestionnaireQuestions.ext, question: 'Com qual frequência você geléia nos últimos três meses?', id: 1 },
        { image: QuestionnaireQuestions.imageBaseString + 'ketchup' + QuestionnaireQuestions.ext, question: 'Com qual frequência você ketchup nos últimos três meses?', id: 2 },
        { image: QuestionnaireQuestions.imageBaseString + 'mel' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu mel nos últimos três meses?', id: 3 },
        { image: QuestionnaireQuestions.imageBaseString + 'refrigerante' + QuestionnaireQuestions.ext, question: 'Com qual frequência você tomou refrigerante nos últimos três meses?', id: 4 }];
    static vegetableQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + 'abobora' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu abóbora nos últimos três meses?', id: 39 },
        { image: QuestionnaireQuestions.imageBaseString + 'alho' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu alho nos últimos três meses?', id: 40 },
        { image: QuestionnaireQuestions.imageBaseString + 'alho-poro' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu alho poró nos últimos três meses?', id: 41 },
        { image: QuestionnaireQuestions.imageBaseString + 'beterraba' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu beterraba nos últimos três meses?', id: 42 },
        { image: QuestionnaireQuestions.imageBaseString + 'cebola' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu cebola nos últimos três meses?', id: 43 },
        { image: QuestionnaireQuestions.imageBaseString + 'chuchu' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu chuchu nos últimos três meses?', id: 44 },
        { image: QuestionnaireQuestions.imageBaseString + 'cogumelo' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu cogumelo nos últimos três meses?', id: 45 },
        { image: QuestionnaireQuestions.imageBaseString + 'couve-flor' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu couve flor nos últimos três meses?', id: 46 },
        { image: QuestionnaireQuestions.imageBaseString + 'salsao' + QuestionnaireQuestions.ext, question: 'Com qual frequência você comeu salsão nos últimos três meses?', id: 47 }
    ];
}
@Component({
    selector: 'questionnaire-questions',
    templateUrl: './QuestionnaireQuestions.html',
    styleUrls: ['./QuestionnaireQuestions.scss']
})
export class QuestionnaireQuestionsComponent implements OnInit, AfterViewInit {
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

        // Scroll to bottom
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, window.screen.height)
        });
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
            var answ: Answer = { questionnaireId: 0, value: 0, frequency: 'dia', foodId: ii, answered: false };
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