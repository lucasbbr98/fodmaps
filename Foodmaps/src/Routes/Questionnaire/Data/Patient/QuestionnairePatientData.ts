﻿import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../Services/NetworkService';
import { LoaderService } from '../../../../Services/LoaderService';
import { ErrorService } from '../../../../Services/Errors/ErrorService';
import { User, QuestionnaireDataViewModel } from '../../../../Services/Models/DatabaseModels';


export interface GetQuestionnaireData {
    data: QuestionnaireDataViewModel[];
}

export interface CSVModel {
    alimento: string;
    frequencia: string;
    quantidade: number;
    oligossacarideo: number;
    poliol: number;
    lactose: number;
    frutose: number;
    nome: string;
    sobrenome: string;
    peso: number;
    altura: number;
    idade: Date;
}


@Component({
    selector: 'questionnaire-patient-data',
    templateUrl: './QuestionnairePatientData.html',
    styleUrls: ['./QuestionnairePatientData.scss']
})
export class QuestionnairePatientDataComponent implements OnInit {

    // General Chart (Total)
    public doughnutChartLabels: string[] = ['Frutose', 'Lactose', 'Oligossacarídeo', 'Poliól'];
    public doughnutChartData: number[] = [0, 0, 0, 0];
    public doughnutChartType: string = 'doughnut';

    // Group Chart (Top 5)
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    // Fodmap Chart (Top 5)
    public barChartLabels: Array<any>;

    public barChartData: any[] = [
        { data: [0, 0, 0, 0, 0], label: 'Frutose' }
    ];

    private guid: string = '';
    public datetime: Date;
    public name: string = '';
    public toasterconfig: ToasterConfig;
    public user: User;
    public data: QuestionnaireDataViewModel[];
    public answers: CSVModel[] = [];

    // Fodmaps

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
        private errorService: ErrorService
    ) { }


    ngOnInit(): void {
        this.route.params.subscribe(p => {
            this.guid = p['guid'] || '';
            this.name = this.route.snapshot.queryParamMap.get('name') || "";
            this.datetime = new Date(this.route.snapshot.queryParamMap.get('datetime')) || null;
        });

        // Forces top navigation
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
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
            this.net.get<GetQuestionnaireData>(`Questionnaire/GetData/` + this.guid).subscribe(t => {
                var data = t.data;
                if (data && data.length > 0) {
                    this.data = data;
                    this.updateGeneralChart();
                    this.populateFodmaps();
                }
                else {
                    this.toasterService.pop("error", "Erro", "O paciente ainda não respondeu o questionário");
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

                let csvData: CSVModel = {
                    alimento: d.food.name, frequencia: d.answer.frequency, quantidade: d.answer.value,
                    frutose: d.food.frutose, lactose: d.food.lactose, poliol: d.food.poliol, oligossacarideo: d.food.oligossacarideo,
                    nome: d.patient.name, sobrenome: d.patient.surname, peso: d.patient.weight, altura: d.patient.height, idade: d.patient.birthday
                };
                this.answers.push(csvData);
            }
        }

        //Formatting
        frutoseCount = Number(frutoseCount.toFixed(2));
        lactoseCount = Number(lactoseCount.toFixed(2));
        oligoCount = Number(oligoCount.toFixed(2));
        poliolCount = Number(poliolCount.toFixed(2));

        this.doughnutChartData = [frutoseCount, lactoseCount, oligoCount, poliolCount]

        var total = frutoseCount + lactoseCount + oligoCount + poliolCount


        this.doughnutChartLabels = [
            'Frutose ' + (total / frutoseCount).toString() + '%',
            'Lactose ' + (total / lactoseCount).toString() + '%',
            'Oligossacarídeo ' + (total / oligoCount).toString() + '%',
            'Poliól ' + (total / poliolCount).toString() + '%'
        ]

    }

    populateFodmaps() {
        if (!this.data || this.data.length <= 0)
            return;

        // Iterator to retrieve top 5 values
        var top = [0, 1, 2, 3, 4]

        var frutoseArray = this.data.sort((d1, d2) => {
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
        for (let i of top) {
            this.frutoseData[i] = Number((frutoseArray[i].food.frutose * frutoseArray[i].answer.value * frutoseArray[i].answer.multiplier).toFixed(2));
            this.frutoseLabels[i] = frutoseArray[i].food.name;
        }

        var lactoseArray = this.data.sort((d1, d2) => {
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
        for (let i of top) {
            this.lactoseData[i] = Number((lactoseArray[i].food.lactose * lactoseArray[i].answer.value * lactoseArray[i].answer.multiplier).toFixed(2));
            this.lactoseLabels[i] = lactoseArray[i].food.name;
        }

        var oligoArray = this.data.sort((d1, d2) => {
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
        for (let i of top) {
            this.oligoData[i] = Number((oligoArray[i].food.oligossacarideo * oligoArray[i].answer.value * oligoArray[i].answer.multiplier).toFixed(2));
            this.oligoLabels[i] = oligoArray[i].food.name;
        }

        var poliolArray = this.data.sort((d1, d2) => {
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
        for (let i of top) {
            this.poliolData[i] = Number((poliolArray[i].food.poliol * poliolArray[i].answer.value * poliolArray[i].answer.multiplier).toFixed(2));
            this.poliolLabels[i] = poliolArray[i].food.name;
        }
        this.barChartLabels = this.frutoseLabels;
        setTimeout(() => {
            this.barChartData = [{ data: this.frutoseData, label: 'Frutose' }];
        }, 100);
    }

    showFodmap(value) {
        //'Frutose', 'Lactose', 'Oligossacarídeo', 'Poliól'
        switch (value) {
            case "Frutose": {
                this.barChartLabels = this.frutoseLabels;
                setTimeout(() => {
                    this.barChartData = [{ data: this.frutoseData, label: value }];
                }, 100);
                break;
            }
            case "Lactose": {
                this.barChartLabels = this.lactoseLabels;
                setTimeout(() => {
                    this.barChartData = [{ data: this.lactoseData, label: value }];
                }, 100);
                break;
            }
            case "Oligossacarídeo": {
                this.barChartLabels = this.oligoLabels;
                setTimeout(() => {
                    this.barChartData = [{ data: this.oligoData, label: value }];
                }, 100);
                break;
            }
            case "Poliól": {
                this.barChartLabels = this.poliolLabels;
                setTimeout(() => {
                    this.barChartData = [{ data: this.poliolData, label: value }];
                }, 100);
                break;
            }
            default: {
                this.barChartLabels = this.frutoseLabels;
                setTimeout(() => {
                    this.barChartData = [{ data: this.frutoseData, label: value }];
                }, 100);
                break;
            }
        }
    }

    seeReport() {
        this.router.navigate(['questionario/paciente/relatorio/', this.guid]);
    }

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    download() {
        var csvData = this.ConvertToCSV(this.answers);
        var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'fodmapsdata.csv';
        a.click();
    }

    ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = 'sep=,\r\n';
        var row = "";

        var index;
        for (index in objArray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (index in array[i]) {
                if (line != '') line += ',';

                line += array[i][index];
            }
            str += line + '\r\n';
        }
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return str;
    }
}