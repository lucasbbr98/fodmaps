import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';
import { AdminOnly } from './../../Services/Accessors/RoleBased';
import { AdminComponent } from './../Admin/Admin';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: '', pathMatch: 'full', redirectTo: 'panel' },
            { path: 'panel', component: AdminComponent, canActivate: [AdminOnly] },

        ],

    ),
    declarations: [
        AdminComponent
    ]
})
export class AdminModule { }