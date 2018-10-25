import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { Routes, RouterModule } from '@angular/router';
import { DirectivesModule } from './../../Directives/Directives';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts';
import { ArchwizardModule } from 'angular-archwizard';

export class ModuleHelper {
    static getImports(routes: Routes) : any[] {
        return [
            RouterModule.forChild(routes),
            CommonModule,
            FormsModule,
            ToasterModule,
            DirectivesModule,
            Ng2SmartTableModule,
            ChartsModule,
            ArchwizardModule
        ];
    }
}