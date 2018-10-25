import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './App/App';

//This will automatically get called if you do webpack build production script.
//if (process.env.NODE_ENV === 'production') {
//    enableProdMode();
//}
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);