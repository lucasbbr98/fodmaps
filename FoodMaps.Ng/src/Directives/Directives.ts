import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './Button/Button';
import { TextBoxComponent } from './TextBox/TextBox';
import { StrengthBarComponent } from './StrengthBar/StrengthBar';
import { SearchPatientPipe, SearchQuestionnairePipe } from './SearchPipe/SearchPipe';
import { GlobalComponent } from '../Global/GlobalComponent';

//All of the Directives are included in this module, add more here if you see fit
@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [ //Remember to include them in exports and declarations otherwise other Modules won't be able to use them
        GlobalComponent,
        ButtonComponent,
        TextBoxComponent,
        StrengthBarComponent,
        SearchPatientPipe,
        SearchQuestionnairePipe
    ],
    declarations: [
        GlobalComponent,
        ButtonComponent,
        TextBoxComponent,
        StrengthBarComponent,
        SearchPatientPipe,
        SearchQuestionnairePipe
    ]
})
export class DirectivesModule { }