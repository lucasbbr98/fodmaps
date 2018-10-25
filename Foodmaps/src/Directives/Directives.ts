import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ButtonComponent } from './Button/Button';
import { TextBoxComponent } from './TextBox/TextBox';
import { StrengthBarComponent } from './StrengthBar/StrengthBar';
import { SearchPatientPipe, SearchQuestionnairePipe } from './SearchPipe/SearchPipe';

//All of the Directives are included in this module, add more here if you see fit
@NgModule({
    imports: [
        LocalStorageModule.withConfig({ prefix: 'agrega-app', storageType: 'localStorage' }),
        FormsModule,
        CommonModule
    ],
    exports: [ //Remember to include them in exports and declarations otherwise other Modules won't be able to use them
        ButtonComponent,
        TextBoxComponent,
        StrengthBarComponent,
        SearchPatientPipe,
        SearchQuestionnairePipe
    ],
    declarations: [
        ButtonComponent,
        TextBoxComponent,
        StrengthBarComponent,
        SearchPatientPipe,
        SearchQuestionnairePipe
    ]
})
export class DirectivesModule { }