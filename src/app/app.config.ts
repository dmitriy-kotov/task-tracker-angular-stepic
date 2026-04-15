import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideRouter(routes),
    provideStore({}),
    provideStoreDevtools({
      maxAge: 25, // Сохраняет последние 25 состояний
      logOnly: !isDevMode(), // Ограничивает расширение режимом только для логирования
      autoPause: true, // Приостанавливает запись действий и изменений состояния, когда окно расширения не открыто
      trace: false, // Если установлено в true, включает трассировку стека для каждого диспетчеризованного действия
      traceLimit: 75, // Максимальное количество кадров трассировки стека (если trace установлен в true)
      connectInZone: true, // Устанавливает соединение внутри зоны Angular, если установлено в true
    }),
  ]
};
