import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// В данном корневом файле мы подключаем конфигурационный файл.
// Такая практика позволяет оставить main.ts в чистоте и легко найти файл, содержащий все конфигурации проекта.

// Файл main.ts — это точка входа для приложения Angular. Он используется для:
// 1. Инициализации приложения (запуск метода bootstrapApplication).
// 2. Подключения корневого компонента (AppComponent).
// 3. Указания конфигурации приложения (appConfig).
// Благодаря этому файл main.ts служит своеобразным стартовым местом для работы приложения и его настройки.
