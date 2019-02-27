import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';

import { HomeComponent } from './../Home/Home';
import { TermsComponent } from './../Terms/Terms';
import { AboutComponent } from './../About/About';
import { SupportComponent } from './../Support/Support';
import { InstructionsComponent } from './../Instructions/Instructions';
import { PapersComponent } from './../Papers/Papers';
import { Info1Component } from './../Info/Info1';
import { Info2Component } from './../Info/Info2';
import { Info3Component } from './../Info/Info3';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: '', component: AboutComponent },
            { path: 'termos', component: TermsComponent },
            { path: 'sobre', component: AboutComponent },
            { path: 'apoio', component: SupportComponent },
            { path: 'instrucoes', component: InstructionsComponent },
            { path: 'publicacoes', component: PapersComponent },
            { path: 'informacoes/sii', component: Info1Component },
            { path: 'informacoes/fodmaps', component: Info2Component },
            { path: 'informacoes/avaliacao-dietetica', component: Info3Component },
        ]
    ),
    declarations: [
        HomeComponent, TermsComponent, AboutComponent, SupportComponent, InstructionsComponent, PapersComponent, Info1Component, Info2Component, Info3Component
    ]
})
export class HomeModule { }