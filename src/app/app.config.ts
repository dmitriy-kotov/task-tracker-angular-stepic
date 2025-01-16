import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {mainPageReducer} from "./pages/main-page/store/reducer";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {MainPageEffects} from "./pages/main-page/store/effect";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ mainPage: mainPageReducer }), // Register the reducer
    provideEffects([MainPageEffects]),
    provideHttpClient(), // Подключаем HttpClient
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),]
};
