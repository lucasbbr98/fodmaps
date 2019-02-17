import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../../Services/NetworkService';
import { LoaderService } from '../../../../../Services/LoaderService';
import { ErrorService } from '../../../../../Services/Errors/ErrorService';
import { User, QuestionnaireDataViewModel, Patient } from '../../../../../Services/Models/DatabaseModels';
import { StorageService } from '../../../../../Services/StorageService';


export interface GetQuestionnaireData {
    data: QuestionnaireDataViewModel[];
}

@Component({
    selector: 'questionnaire-research-report',
    templateUrl: './QuestionnaireResearchReport.html',
    styleUrls: ['./QuestionnaireResearchReport.scss']
})
export class QuestionnaireResearchReportComponent implements OnInit {

    private guid: string = '';
    public toasterconfig: ToasterConfig;
    public user: User;
    public data: QuestionnaireDataViewModel[];

    public name: string = '';
    public nutricionist: string = '';
    public totalPeople: number = 0;
    public malePeople: number = 0;
    public femalePeople: number = 0;
    public datetime: Date;

    public oligo: number = 0;
    public poli: number = 0;
    public frutose: number = 0;
    public lactose: number = 0;

    // Fodmaps
    public top: Array<number> = [0, 1, 2, 3, 4]
    public frutoseData: number[] = [0, 0, 0, 0, 0];
    public frutoseLabels: Array<any> = ['Alimento 1', 'Alimento 2', 'Alimento 3', 'Alimento 4', 'Alimento 5'];

    public lactoseData: number[] = [0, 0, 0, 0, 0];
    public lactoseLabels: Array<any> = ['Alimento 1', 'Alimento 2', 'Alimento 3', 'Alimento 4', 'Alimento 5'];

    public oligoData: number[] = [0, 0, 0, 0, 0];
    public oligoLabels: Array<any> = ['Alimento 1', 'Alimento 2', 'Alimento 3', 'Alimento 4', 'Alimento 5'];

    public poliolData: number[] = [0, 0, 0, 0, 0];
    public poliolLabels: Array<any> = ['Alimento 1', 'Alimento 2', 'Alimento 3', 'Alimento 4', 'Alimento 5'];

    constructor(
        private net: NetworkService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private errorService: ErrorService,
        private storage: StorageService,
    ) { }


    ngOnInit(): void {
        this.route.params.subscribe(p => {
            this.guid = p['guid'] || '';
        });
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
        this.user = this.storage.user;
        this.toasterconfig = new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 7000,
            positionClass: 'centered',
            limit: 1
        });

        if (this.guid == '') {
            this.toasterService.pop('error', 'Erro', 'Conexão interrompida, por favor tente atualizar a página.')
            return;
        }
        // Gets patient data
        if (navigator.onLine) {
            this.net.get<GetQuestionnaireData>(`Questionnaire/GetResearchData/` + this.guid).subscribe(t => {
                var data = t.data;
                if (data && data.length > 0) {
                    this.data = data;
                    this.updateGeneralChart();
                    this.populateReport();
                    this.populateFodmaps();
                }
                else {
                    this.toasterService.pop("error", "Erro", "Ops, ocorreu algum erro com esse questionário.");
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


    updateGeneralChart() {
        if (!this.data || this.data.length <= 0)
            return;

        var frutoseCount = 0;
        var lactoseCount = 0;
        var oligoCount = 0;
        var poliolCount = 0;
        for (let d of this.data) {
            if (d && d.food && d.answer) {
                frutoseCount = frutoseCount + (d.food.frutose * d.answer.value * d.answer.multiplier);
                lactoseCount = lactoseCount + (d.food.lactose * d.answer.value * d.answer.multiplier);
                oligoCount = oligoCount + (d.food.oligossacarideo * d.answer.value * d.answer.multiplier);
                poliolCount = poliolCount + (d.food.poliol * d.answer.value * d.answer.multiplier);
            }
        }

        //Formatting
        this.frutose = Number(frutoseCount.toFixed(2));
        this.lactose = Number(lactoseCount.toFixed(2));
        this.oligo = Number(oligoCount.toFixed(2));
        this.poli = Number(poliolCount.toFixed(2));

    }

    populateReport() {
        this.name = this.data[0].patient.name + " " + this.data[0].patient.surname;
        this.datetime = this.data[0].questionnaire.modifiedOn;
        this.totalPeople = this.data.length;
        this.femalePeople = this.totalPeople - this.malePeople;
    }


    populateFodmaps() {
        if (!this.data || this.data.length <= 0)
            return;
        var peopleArray: Patient[] = []
        this.data.filter(function (item) {
            var i = peopleArray.findIndex(x => (x.name + ' ' + x.surname) == (item.patient.name + ' ' + item.patient.surname));
            if (i <= -1) {
                peopleArray.push(item.patient);
            }
            return null;
        });

        this.totalPeople = peopleArray.length;
        var maleCounter = 0;
        for (let p of peopleArray) {
            if (p.gender == 'Masculino') {
                maleCounter++;
            }
        }
        this.malePeople = maleCounter;
        this.femalePeople = this.totalPeople - this.malePeople;

        let frutoseArray = this.data.concat().sort((d1, d2) => {
            var d1Value = d1.food.frutose * d1.answer.value * d1.answer.multiplier;
            var d2Value = d2.food.frutose * d2.answer.value * d2.answer.multiplier;
            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        var counter = 0;
        var adds = 0;
        while (adds < 5) {
            if (counter == 0) {
                this.frutoseData[counter] = Number((frutoseArray[counter].food.frutose * frutoseArray[counter].answer.value * frutoseArray[counter].answer.multiplier).toFixed(2));
                this.frutoseLabels[counter] = frutoseArray[counter].food.name;
                adds++;
                counter++;
            }
            else {
                if (frutoseArray[counter - 1].food.name == frutoseArray[counter].food.name) {
                    this.frutoseData[counter - 1] = this.frutoseData[counter - 1] + Number((frutoseArray[counter].food.frutose * frutoseArray[counter].answer.value * frutoseArray[counter].answer.multiplier).toFixed(2));
                    frutoseArray.splice(counter, 1);
                }
                else {
                    this.frutoseData[counter] = Number((frutoseArray[counter].food.frutose * frutoseArray[counter].answer.value * frutoseArray[counter].answer.multiplier).toFixed(2));
                    this.frutoseLabels[counter] = frutoseArray[counter].food.name;
                    counter++;
                    adds++;
                }
            }
        }

        let lactoseArray = this.data.concat().sort((d1, d2) => {
            var d1Value = d1.food.lactose * d1.answer.value * d1.answer.multiplier;
            var d2Value = d2.food.lactose * d2.answer.value * d2.answer.multiplier;
            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        adds = 0;
        counter = 0;
        while (adds < 5) {
            if (counter == 0) {
                this.lactoseData[counter] = Number((lactoseArray[counter].food.lactose * lactoseArray[counter].answer.value * lactoseArray[counter].answer.multiplier).toFixed(2));
                this.lactoseLabels[counter] = lactoseArray[counter].food.name;
                adds++;
                counter++;
            }
            else {
                if (lactoseArray[counter - 1].food.name == lactoseArray[counter].food.name) {
                    this.lactoseData[counter - 1] = this.lactoseData[counter - 1] + Number((lactoseArray[counter].food.lactose * lactoseArray[counter].answer.value * lactoseArray[counter].answer.multiplier).toFixed(2));
                    lactoseArray.splice(counter, 1);
                }
                else {
                    this.lactoseData[counter] = Number((lactoseArray[counter].food.lactose * lactoseArray[counter].answer.value * lactoseArray[counter].answer.multiplier).toFixed(2));
                    this.lactoseLabels[counter] = lactoseArray[counter].food.name;
                    counter++;
                    adds++;
                }
            }
        }


        let oligoArray = this.data.concat().sort((d1, d2) => {
            var d1Value = d1.food.oligossacarideo * d1.answer.value * d1.answer.multiplier;
            var d2Value = d2.food.oligossacarideo * d2.answer.value * d2.answer.multiplier;
            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        adds = 0;
        counter = 0;
        while (adds < 5) {
            if (counter == 0) {
                this.oligoData[counter] = Number((oligoArray[counter].food.oligossacarideo * oligoArray[counter].answer.value * oligoArray[counter].answer.multiplier).toFixed(2));
                this.oligoLabels[counter] = oligoArray[counter].food.name;
                adds++;
                counter++;
            }
            else {
                if (oligoArray[counter - 1].food.name == oligoArray[counter].food.name) {
                    this.oligoData[counter - 1] = this.oligoData[counter - 1] + Number((oligoArray[counter].food.oligossacarideo * oligoArray[counter].answer.value * oligoArray[counter].answer.multiplier).toFixed(2));
                    oligoArray.splice(counter, 1);
                }
                else {
                    this.oligoData[counter] = Number((oligoArray[counter].food.oligossacarideo * oligoArray[counter].answer.value * oligoArray[counter].answer.multiplier).toFixed(2));
                    this.oligoLabels[counter] = oligoArray[counter].food.name;
                    counter++;
                    adds++;
                }
            }
        }

        let poliolArray = this.data.concat().sort((d1, d2) => {
            var d1Value = d1.food.poliol * d1.answer.value * d1.answer.multiplier;
            var d2Value = d2.food.poliol * d2.answer.value * d2.answer.multiplier;
            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        adds = 0;
        counter = 0;
        while (adds < 5) {
            if (counter == 0) {
                this.poliolData[counter] = Number((poliolArray[counter].food.poliol * poliolArray[counter].answer.value * poliolArray[counter].answer.multiplier).toFixed(2));
                this.poliolLabels[counter] = poliolArray[counter].food.name;
                adds++;
                counter++;
            }
            else {
                if (poliolArray[counter - 1].food.name == poliolArray[counter].food.name) {
                    this.poliolData[counter - 1] = this.poliolData[counter - 1] + Number((poliolArray[counter].food.poliol * poliolArray[counter].answer.value * poliolArray[counter].answer.multiplier).toFixed(2));
                    poliolArray.splice(counter, 1);
                }
                else {
                    this.poliolData[counter] = Number((poliolArray[counter].food.poliol * poliolArray[counter].answer.value * poliolArray[counter].answer.multiplier).toFixed(2));
                    this.poliolLabels[counter] = poliolArray[counter].food.name;
                    counter++;
                    adds++;
                }
            }
        }
    }

    calculateAge(birthdate): number {
        var timeDiff = Math.abs(Date.now() - Date.parse(birthdate));
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }

    print() {
        window.print();
    }
}