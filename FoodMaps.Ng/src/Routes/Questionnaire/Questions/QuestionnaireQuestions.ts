import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { StorageService } from '../../../Services/StorageService';
import { User, Question, Answer } from '../../../Services/Models/DatabaseModels';
import { WizardComponent } from 'angular-archwizard';

export class QuestionnaireQuestions {
    static imageBaseString = 'https://s3-sa-east-1.amazonaws.com/fodmap/questionnaire/';
    static ext = '.jpg';
    static fruitQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + '53abacate' + QuestionnaireQuestions.ext, question: '2 colheres de sopa de abacate', id: 21 },
        { image: QuestionnaireQuestions.imageBaseString + '39ameixapretainnatura' + QuestionnaireQuestions.ext, question: '1 unidade de ameixa preta in natura', id: 22 },
        { image: QuestionnaireQuestions.imageBaseString + '54amora' + QuestionnaireQuestions.ext, question: '3 unidades P de amora', id: 24 },
        { image: QuestionnaireQuestions.imageBaseString + '40bananananicamadura' + QuestionnaireQuestions.ext, question: '1 unidade M de banana nanica madura', id: 25 },
        { image: QuestionnaireQuestions.imageBaseString + '02bananaouromadura' + QuestionnaireQuestions.ext, question: '1 unidade de banana ouro madura', id: 26 },
        { image: QuestionnaireQuestions.imageBaseString + '41caqui' + QuestionnaireQuestions.ext, question: '1 unidade M de Caqui', id: 27 },
        { image: QuestionnaireQuestions.imageBaseString + '42damascoouameixaseca' + QuestionnaireQuestions.ext, question: '1 unidade de damasco seco e/ou ameixa seca', id: 28 },
        { image: QuestionnaireQuestions.imageBaseString + '03goiabaverde' + QuestionnaireQuestions.ext, question: '1 unidade M de goiaba verde', id: 29 },
        { image: QuestionnaireQuestions.imageBaseString + '04macavermelhacomcasca' + QuestionnaireQuestions.ext, question: '1 unidade M de maçã vermelha', id: 31 },
        { image: QuestionnaireQuestions.imageBaseString + '05manga' + QuestionnaireQuestions.ext, question: '1 unidade M de manga', id: 32 },
        { image: QuestionnaireQuestions.imageBaseString + '06melancia' + QuestionnaireQuestions.ext, question: '1 fatia P de melancia', id: 33 },
        { image: QuestionnaireQuestions.imageBaseString + '43melao' + QuestionnaireQuestions.ext, question: '1 fatia P de melão', id: 34 },
        { image: QuestionnaireQuestions.imageBaseString + '44nectarina' + QuestionnaireQuestions.ext, question: '1 unidade M de nectarina', id: 35 },
        { image: QuestionnaireQuestions.imageBaseString + '55pessegobrancodouradoouclingstone' + QuestionnaireQuestions.ext, question: '1 unidade P de pêssego dourado e/ou Clingstone', id: 66 },
        { image: QuestionnaireQuestions.imageBaseString + '07peramadura' + QuestionnaireQuestions.ext, question: '1 unidade M de pêra comum madura', id: 36 },
        { image: QuestionnaireQuestions.imageBaseString + '45pessegobranco' + QuestionnaireQuestions.ext, question: '1 unidade P de pêssego branco', id: 37 }];
    static grainsQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + '25leiteabasedesoja' + QuestionnaireQuestions.ext, question: '2 dedos de copo de requeijão de leite à base de soja', id: 58 },
        { image: QuestionnaireQuestions.imageBaseString + '36ervilhatorta' + QuestionnaireQuestions.ext, question: '1 colher de sopa de ervilha torta', id:60 },
        { image: QuestionnaireQuestions.imageBaseString + '35ervilhaemgraoscozida' + QuestionnaireQuestions.ext, question: '1 colher de sopa cheia de ervilha em grãos cozida', id: 61 },
        { image: QuestionnaireQuestions.imageBaseString + '27feijao' + QuestionnaireQuestions.ext, question: '1 concha M de feijão carioca, feijoada e/ou feijão tropeiro', id: 62 },
        { image: QuestionnaireQuestions.imageBaseString + '28lentilhagraodebicoesoja' + QuestionnaireQuestions.ext, question: '2 ½ colheres de sopa rasa de lentilha, grão de bico e/ou soja', id: 63 },
        { image: QuestionnaireQuestions.imageBaseString + '24amendoacastanhadecajuepistache' + QuestionnaireQuestions.ext, question: '1 colher de sopa de oleaginosas (amêndoa, castanha de caju e/ou pistache?', id: 64 },
        { image: QuestionnaireQuestions.imageBaseString + '26proteinatexturizadadesoja' + QuestionnaireQuestions.ext, question: '2 colheres de sopa cheias de proteína texturizada de soja', id: 65 }];
    static milkQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + '12lactosechocolateaoleiteeoubranco' + QuestionnaireQuestions.ext, question: '1 unidade P de chocolate ao leite e/ou branco', id: 48 },
        { image: QuestionnaireQuestions.imageBaseString + '14lactosecreamcheese' + QuestionnaireQuestions.ext, question: '1 ponta de faca de cream cheese', id: 49 },
        { image: QuestionnaireQuestions.imageBaseString + '13lactosecremedeleite' + QuestionnaireQuestions.ext, question: '1 colher de sopa rasa de creme de leite', id: 50 },
        { image: QuestionnaireQuestions.imageBaseString + '09lactoseiogurteintegralousemidesnatadonaturaleoucomfrutas' + QuestionnaireQuestions.ext, question: '1 pote de iogurte integral ou semi-desnatado com frutas e/ou natural', id: 52},
        { image: QuestionnaireQuestions.imageBaseString + '08lactoseleiteintegralsemidesnatadodesnatadoinnaturaouempo' + QuestionnaireQuestions.ext, question: '1 xícara de leite integral, semi-desnatado, desnatado, in natura ou pó', id: 53 },
        { image: QuestionnaireQuestions.imageBaseString + '11lactoseleitecondensado' + QuestionnaireQuestions.ext, question: '3 colheres de sopa de leite condensado', id: 55 },
        { image: QuestionnaireQuestions.imageBaseString + '15lactosequeijoricota' + QuestionnaireQuestions.ext, question: '1 fatia de queijo ricota', id: 56 },
        { image: QuestionnaireQuestions.imageBaseString + '10lactosesorveteabasedeleite' + QuestionnaireQuestions.ext, question: '3 colheres de sorvete à base de leite', id: 57 }];
    static pastaQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + '16barradecerealoucomfrutas' + QuestionnaireQuestions.ext, question: '1 unidade de barra de cereal', id: 6 },
        { image: QuestionnaireQuestions.imageBaseString + '48batatadoce' + QuestionnaireQuestions.ext, question: '1 unidade de batata doce', id: 7 },
        { image: QuestionnaireQuestions.imageBaseString + '17cerealmatinal' + QuestionnaireQuestions.ext, question: '6 colheres de sopa cheias de cereal matinal (flocos de trigo, milho e/ou frutas secas)', id: 10 },
        { image: QuestionnaireQuestions.imageBaseString + '18granola' + QuestionnaireQuestions.ext, question: '2 colheres de sopa de granola', id: 11 },
        { image: QuestionnaireQuestions.imageBaseString + '22macarraoabasedetrigocozido' + QuestionnaireQuestions.ext, question: '1 escumadeira de massas à base de trigo (macarrão, nhoque, lasanha, canelone)', id: 12 },
        { image: QuestionnaireQuestions.imageBaseString + '37mandiocaeouinhame' + QuestionnaireQuestions.ext, question: '1 unidade de mandioca e/ou inhame', id: 13 },
        { image: QuestionnaireQuestions.imageBaseString + '38milhoverdeenlatado' + QuestionnaireQuestions.ext, question: '1 colher de sopa cheia de milho verde enlatado', id: 23 },
        { image: QuestionnaireQuestions.imageBaseString + '51milhoverdeespiga' + QuestionnaireQuestions.ext, question: '1 colher de sopa cheia de milho verde espiga', id: 14 },
        { image: QuestionnaireQuestions.imageBaseString + '19paodeformabranco' + QuestionnaireQuestions.ext, question: '2 fatias de pão de forma branco', id: 15 },
        { image: QuestionnaireQuestions.imageBaseString + '21paofrances' + QuestionnaireQuestions.ext, question: '1 unidade de pão francês', id: 16 },
        { image: QuestionnaireQuestions.imageBaseString + '20paodeformaintegral' + QuestionnaireQuestions.ext, question: '2 fatias de pão de forma integral ou multigrãos', id: 17 },
        { image: QuestionnaireQuestions.imageBaseString + '23pizza' + QuestionnaireQuestions.ext, question: '2 fatias M de pizza', id: 18 }];
    static sugarQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + '56geleiadefrutasvermelhas' + QuestionnaireQuestions.ext, question: '1 ponta de faca de geleia de frutas vermelhas', id: 1 },
        { image: QuestionnaireQuestions.imageBaseString + '46ketchu' + QuestionnaireQuestions.ext, question: '1 colher de sopa cheia de ketchup', id: 2 },
        { image: QuestionnaireQuestions.imageBaseString + '01mel' + QuestionnaireQuestions.ext, question: '1 colher de sopa de café de mel', id: 3 },];
    static vegetableQuestions: Question[] = [
        { image: QuestionnaireQuestions.imageBaseString + '29alho' + QuestionnaireQuestions.ext, question: '1 unidade de alho', id: 40 },
        { image: QuestionnaireQuestions.imageBaseString + '30alhoporo' + QuestionnaireQuestions.ext, question: '2 colheres de sopa de alho poró (bulbo)', id: 41 },
        { image: QuestionnaireQuestions.imageBaseString + '31beterraba' + QuestionnaireQuestions.ext, question: '2 colheres de sopa de beterraba', id: 42 },
        { image: QuestionnaireQuestions.imageBaseString + '32cebola' + QuestionnaireQuestions.ext, question: '2 fatias de cebola (branca, roxa e/ou amarela)', id: 43 },
        { image: QuestionnaireQuestions.imageBaseString + '33chuchu' + QuestionnaireQuestions.ext, question: '3 colheres de sopa de chuchu', id: 44 },
        { image: QuestionnaireQuestions.imageBaseString + '34cogumelo' + QuestionnaireQuestions.ext, question: '1 escumadeira de cogumelo (champignon, shitake, portobello, porcini)', id: 45 },
        { image: QuestionnaireQuestions.imageBaseString + '50couveflor' + QuestionnaireQuestions.ext, question: '3 colheres de sopa de couve-flor', id: 46 },
        { image: QuestionnaireQuestions.imageBaseString + '52salsao' + QuestionnaireQuestions.ext, question: '1 colher de sopa de salsão', id: 47 }
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
    public optionSelected: string = '';
    public selectedRadio: number = 0;
    public frequencyValues = [
        { name: 'DIA', active: false, value:'dia' },
        { name: 'SEMANA', active: false, value: 'semana' },
        { name: 'MÊS', active: false, value:'mes'},
    ];

    toggleClass(item) {
        for (let v of this.frequencyValues) {v.active = false;}
        item.active = true;
        this.optionSelected = item.value;
        this.answers[this.currentIndex].frequency = this.optionSelected;
        console.log(this.optionSelected);
    }
    
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
        this.optionSelected = '';
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
        for (let v of this.frequencyValues) { v.active = false; }
        this.optionSelected = '';

    }

    next() {
        if (this.optionSelected == 'dia' || this.optionSelected == 'mes' || this.optionSelected == 'semana') {
            this.currentIndex++;
            this.saveOnLocalStorage();
            for (let v of this.frequencyValues) { v.active = false; }
            this.optionSelected = '';
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Por favor, escolha uma frequência');
            this.wizard.navigation.goToStep(this.currentIndex);
        }
    }

    save() {
        if (this.optionSelected == 'dia' || this.optionSelected == 'mes' || this.optionSelected == 'semana') {
            this.saveOnLocalStorage();
            this.router.navigate(['/questionario/painel', this.guid]);
            var storageAnswers = this.storage.getAnswers(this.category, this.guid);
            console.log(storageAnswers);
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Por favor, escolha uma frequência');
        }
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

    ngAfterViewInit(): void {
        var el12 = document.getElementsByClassName("steps-12")
        console.log(el12);
        if (el12 && el12.length > 0) {
            el12[0].className = "steps-indicator steps-10";
        }
        var el16 = document.getElementsByClassName("steps-16")
        console.log(el16);
        if (el16 && el16.length > 0) {
            el16[0].className = "steps-indicator steps-10";
        }
        this._changeDetectionRef.detectChanges();
        this.wizard.navigation.goToStep(this.currentIndex);
    }

    canExit() {
        if (this.optionSelected == 'dia' || this.optionSelected == 'mes' || this.optionSelected == 'semana') {
            return true;
        }
        return false;
    }
}