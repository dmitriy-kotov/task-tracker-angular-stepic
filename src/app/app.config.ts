import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { mainPageReducer } from './pages/main-page/store/reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MainPageEffects } from './pages/main-page/store/effect';
import { provideHttpClient } from '@angular/common/http';
import { ColumnEffects } from './feature/column/store/effect';
import { columnReducer } from './feature/column/store/reducer';
import { taskReducer } from './feature/task/store/reducer';
import { TaskEffects } from './feature/task/store/effect';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      mainPage: mainPageReducer,
      columnState: columnReducer,
      taskState: taskReducer,
    }), // Register the reducer
    provideEffects([MainPageEffects, ColumnEffects, TaskEffects]),
    provideHttpClient(), // Подключаем HttpClient
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideAnimationsAsync(),
  ],
};
