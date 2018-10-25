import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';

import { HomeComponent } from './../Home/Home';
import { TermsComponent } from './../Terms/Terms';
import { IsLoggedIn } from './../../Services/Accessors/IsLoggedIn';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: '', component: HomeComponent, canActivate: [IsLoggedIn] },
            { path: 'terms', component: TermsComponent },
        ]
    ),
    declarations: [
        HomeComponent, TermsComponent
    ]
})
export class HomeModule { }