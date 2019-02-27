import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NetworkService } from '../../../../Services/NetworkService';
import { LoaderService } from '../../../../Services/LoaderService';
import { StorageService } from '../../../../Services/StorageService';
import { ErrorService } from '../../../../Services/Errors/ErrorService';
import { User, Patient } from '../../../../Services/Models/DatabaseModels'

export interface GetPatientsModel {
    patients: Patient[];
}

@Component({
    selector: 'patients',
    templateUrl: './Patients.html',
    styleUrls: ['./Patients.scss']
})
export class PatientsComponent implements OnInit {

    public toasterconfig: ToasterConfig;
    public user: User;
    public model: GetPatientsModel;
    public patients: Patient[] = [];
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

        // Gets patients from user
        if (navigator.onLine) {
            this.net.get<GetPatientsModel>(`User/GetPatients`).subscribe(t => {
                var tempPatients = t.patients;
                if (tempPatients.length > 0) {
                    for (let p of tempPatients) {
                        p.name = p.name + " " + p.surname;
                        p.surname = "";
                    }
                    this.patients = tempPatients;
                }
                else {
                    this.toasterService.pop("info", "Pacientes", "Não encontramos nenhum paciente associado a sua conta no banco de dados. Você pode adicionar pacientes clicando no botão + no seu perfil.");
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

    seePatient(patient: Patient) {
        if (patient == null || patient.id == null || patient.id <= 0) {
            this.toasterService.pop("error", "Erro", "Houve um erro interno, por favor tente recarregar a página");
            return;
        }
        this.router.navigate(['/conta/paciente', patient.id], { queryParams: { name: patient.name + ' ' + patient.surname } });
    }

}