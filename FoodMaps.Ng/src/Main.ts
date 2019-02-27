import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './App/App';


enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);