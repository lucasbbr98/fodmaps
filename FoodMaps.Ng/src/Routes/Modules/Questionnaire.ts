import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';
import { IsLoggedIn } from './../../Services/Accessors/IsLoggedIn';

import { QuestionnaireDashboardComponent } from './../Questionnaire/Dashboard/QuestionnaireDashboard';
import { QuestionnaireQuestionsComponent } from './../Questionnaire/Questions/QuestionnaireQuestions';
import { QuestionnairePatientDataComponent } from './../Questionnaire/Data/Patient/QuestionnairePatientData';
import { QuestionnairePatientReportComponent } from './../Questionnaire/Data/Patient/Report/QuestionnairePatientReport';
import { QuestionnairePatientAnswersComponent } from './../Questionnaire/Answers/Patients/QuestionnairePatientAnswers';

import { QuestionnaireResearchDataComponent } from './../Questionnaire/Data/Research/QuestionnaireResearchData';
import { QuestionnaireResearchReportComponent } from './../Questionnaire/Data/Research/Report/QuestionnaireResearchReport';


@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: 'painel/:guid', component: QuestionnaireDashboardComponent },
            { path: 'perguntas/:guid/:category', component: QuestionnaireQuestionsComponent },
            { path: 'paciente/completos/:patientId', component: QuestionnairePatientAnswersComponent, canActivate: [IsLoggedIn] },
            { path: 'paciente/relatorio/:guid', component: QuestionnairePatientReportComponent, canActivate: [IsLoggedIn] },
            { path: 'respostas/:guid', component: QuestionnairePatientDataComponent, canActivate: [IsLoggedIn] },
            { path: 'pesquisas/respostas/:guid', component: QuestionnaireResearchDataComponent, canActivate: [IsLoggedIn] },
            { path: 'pesquisa/relatorio/:guid', component: QuestionnaireResearchReportComponent, canActivate: [IsLoggedIn] }
        ]
    ),
    declarations: [QuestionnaireDashboardComponent, QuestionnaireQuestionsComponent, QuestionnairePatientDataComponent,
        QuestionnairePatientAnswersComponent, QuestionnairePatientReportComponent,
        QuestionnaireResearchDataComponent, QuestionnaireResearchReportComponent]
})
export class QuestionnaireModule { }