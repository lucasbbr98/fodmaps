import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../../Services/NetworkService';
import { LoaderService } from '../../../../../Services/LoaderService';
import { ErrorService } from '../../../../../Services/Errors/ErrorService';
import { User, QuestionnaireDataViewModel } from '../../../../../Services/Models/DatabaseModels';
import { StorageService } from '../../../../../Services/StorageService';


export interface GetQuestionnaireData {
    data: QuestionnaireDataViewModel[];
}

@Component({
    selector: 'questionnaire-patient-report',
    templateUrl: './QuestionnairePatientReport.html',
    styleUrls: ['./QuestionnairePatientReport.scss']
})
export class QuestionnairePatientReportComponent implements OnInit {

    private guid: string = '';
    public toasterconfig: ToasterConfig;
    public user: User;
    public data: QuestionnaireDataViewModel[];

    public name: string = '';
    public nutricionist: string = '';
    public crn: string = '';
    public age: number = 0;
    public weight: number = 0;
    public height: number = 0;
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
            this.net.get<GetQuestionnaireData>(`Questionnaire/GetData/` + this.guid).subscribe(t => {
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

        // Updating Frutose according to 
        for (let d of this.data) {
            if (d && d.food && d.answer) {
                frutoseCount = frutoseCount + (d.food.frutose * d.answer.value / d.answer.multiplier);
                lactoseCount = lactoseCount + (d.food.lactose * d.answer.value / d.answer.multiplier);
                oligoCount = oligoCount + (d.food.oligossacarideo * d.answer.value / d.answer.multiplier);
                poliolCount = poliolCount + (d.food.poliol * d.answer.value / d.answer.multiplier);
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
        this.age = this.calculateAge(this.data[0].patient.birthday);
        this.height = this.data[0].patient.height;
        this.weight = this.data[0].patient.weight;
        this.datetime = this.data[0].questionnaire.modifiedOn;

    }

    populateFodmaps() {
        if (!this.data || this.data.length <= 0)
            return;

        var fData = this.data.filter(d => d.food.frutose > 0);
        var frutoseArray = fData.sort((d1, d2) => {

            var d1Value = d1.food.frutose * d1.answer.value / d1.answer.multiplier;
            var d2Value = d2.food.frutose * d2.answer.value / d2.answer.multiplier;

            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        var i = 0;
        for (let f of frutoseArray) {
            if (i >= 5) { break; }
            this.frutoseData[i] = Number((f.food.frutose * f.answer.value / f.answer.multiplier).toFixed(2));
            this.frutoseLabels[i] = f.food.name;
            i++;
        }

        var lData = this.data.filter(d => d.food.lactose > 0);
        var lactoseArray = lData.sort((d1, d2) => {

            var d1Value = d1.food.lactose * d1.answer.value / d1.answer.multiplier;
            var d2Value = d2.food.lactose * d2.answer.value / d2.answer.multiplier;

            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        var i = 0;
        for (let f of lactoseArray) {
            if (i >= 5) { break; }
            this.lactoseData[i] = Number((f.food.lactose * f.answer.value / f.answer.multiplier).toFixed(2));
            this.lactoseLabels[i] = f.food.name;
            i++;
        }
        var oData = this.data.filter(d => d.food.oligossacarideo > 0);
        var oligoArray = oData.sort((d1, d2) => {

            var d1Value = d1.food.oligossacarideo * d1.answer.value / d1.answer.multiplier;
            var d2Value = d2.food.oligossacarideo * d2.answer.value / d2.answer.multiplier;
            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        var i = 0;
        for (let f of oligoArray) {
            if (i >= 5) { break; }
            this.oligoData[i] = Number((f.food.oligossacarideo * f.answer.value / f.answer.multiplier).toFixed(2));
            this.oligoLabels[i] = f.food.name;
            i++;
        }
        var pData = this.data.filter(d => d.food.poliol > 0);
        var poliolArray = pData.sort((d1, d2) => {
            var d1Value = d1.food.poliol * d1.answer.value / d1.answer.multiplier;
            var d2Value = d2.food.poliol * d2.answer.value / d2.answer.multiplier;

            if (d1Value > d2Value) {
                return -1;
            }
            else if (d1Value < d2Value) {
                return 1;
            }

            return 0;
        });
        var i = 0;
        for (let f of poliolArray) {
            if (i >= 5) { break; }
            this.poliolData[i] = Number((f.food.poliol * f.answer.value / f.answer.multiplier).toFixed(2));
            this.poliolLabels[i] = f.food.name;
            i++;
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