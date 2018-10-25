import { NgModule } from '@angular/core';
import { ModuleHelper } from './ModuleHelper';

import { NotFoundComponent } from './../404/404';

@NgModule({
    imports: ModuleHelper.getImports(
        [
            { path: '', component: NotFoundComponent }
        ]
    ),
    declarations: [
        NotFoundComponent
    ]
})
export class NotFoundModule { }