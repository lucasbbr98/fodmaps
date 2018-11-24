﻿import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';

import { LoginComponent } from './../Account/Login/Login';
import { RegisterComponent } from './../Account/Register/Register';
import { RegisterAdditionalComponent } from './../Account/Register/Additional/RegisterAdditional';

import { IsLoggedIn } from './../../Services/Accessors/IsLoggedIn';
import { ProfileComponent } from './../Account/Profile/Profile';
import { PatientsComponent } from './../Account/Actions/Patients/Patients';
import { PatientInfoComponent } from './../Account/Actions/Patients/Info/PatientInfo';
import { ResearchesComponent } from './../Account/Actions/Researches/Researches';

@NgModule({

    imports: ModuleHelper.getImports(
        [
            { path: '', pathMatch: 'full', redirectTo: 'profile'}, 
            { path: 'login', component: LoginComponent },
            { path: 'cadastro', component: RegisterComponent },
            { path: 'update', component: RegisterAdditionalComponent, canActivate: [IsLoggedIn] },
            { path: 'perfil', component: ProfileComponent, canActivate: [IsLoggedIn] },
            { path: 'pacientes', component: PatientsComponent, canActivate: [IsLoggedIn] },
            { path: 'paciente/:id', component: PatientInfoComponent, canActivate: [IsLoggedIn] },
            { path: 'pesquisas', component: ResearchesComponent, canActivate: [IsLoggedIn] }

        ]
    ),
    declarations: [
        LoginComponent,
        RegisterComponent,
        RegisterAdditionalComponent,
        ProfileComponent,
        PatientsComponent,
        PatientInfoComponent,
        ResearchesComponent
    ]
})
export class AccountModule { }