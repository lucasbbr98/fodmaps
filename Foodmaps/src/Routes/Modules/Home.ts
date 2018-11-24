import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';

import { HomeComponent } from './../Home/Home';
import { TermsComponent } from './../Terms/Terms';
import { AboutComponent } from './../About/About';
import { SupportComponent } from './../Support/Support';
import { InstructionsComponent } from './../Instructions/Instructions';
import { PapersComponent } from './../Papers/Papers';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: '', component: AboutComponent },
            { path: 'termos', component: TermsComponent },
            { path: 'sobre', component: AboutComponent },
            { path: 'apoio', component: SupportComponent },
            { path: 'instrucoes', component: InstructionsComponent },
            { path: 'publicacoes', component: PapersComponent },
        ]
    ),
    declarations: [
        HomeComponent, TermsComponent, AboutComponent, SupportComponent, InstructionsComponent, PapersComponent
    ]
})
export class HomeModule { }