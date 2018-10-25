import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';

import { QuestionnaireDashboardComponent } from './../Questionnaire/Dashboard/QuestionnaireDashboard';
import { QuestionnaireQuestionsComponent } from './../Questionnaire/Questions/QuestionnaireQuestions';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: 'painel/:guid', component: QuestionnaireDashboardComponent },
            { path: 'perguntas/:guid/:category', component: QuestionnaireQuestionsComponent },
        ]
    ),
    declarations: [QuestionnaireDashboardComponent, QuestionnaireQuestionsComponent]
})
export class QuestionnaireModule { }