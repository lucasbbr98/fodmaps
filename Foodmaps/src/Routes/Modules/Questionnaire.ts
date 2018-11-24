import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';
import { IsLoggedIn } from './../../Services/Accessors/IsLoggedIn';

import { QuestionnaireDashboardComponent } from './../Questionnaire/Dashboard/QuestionnaireDashboard';
import { QuestionnaireQuestionsComponent } from './../Questionnaire/Questions/QuestionnaireQuestions';
import { QuestionnairePatientDataComponent } from './../Questionnaire/Data/Patient/QuestionnairePatientData';
import { QuestionnairePatientAnswersComponent } from './../Questionnaire/Answers/Patients/QuestionnairePatientAnswers';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: 'painel/:guid', component: QuestionnaireDashboardComponent },
            { path: 'respostas/:guid', component: QuestionnairePatientDataComponent, canActivate: [IsLoggedIn]},
            { path: 'perguntas/:guid/:category', component: QuestionnaireQuestionsComponent },
            { path: 'paciente/completos/:patientId', component: QuestionnairePatientAnswersComponent, canActivate: [IsLoggedIn] },
        ]
    ),
    declarations: [QuestionnaireDashboardComponent, QuestionnaireQuestionsComponent, QuestionnairePatientDataComponent, QuestionnairePatientAnswersComponent]
})
export class QuestionnaireModule { }