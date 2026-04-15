import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainPageState } from './state';

// Создаем feature selector для 'mainPage'
export const selectMainPageState = createFeatureSelector<MainPageState>('mainPage');

// Создаем селектор для получения заголовка
export const selectTitle = createSelector(
  selectMainPageState,
  (state: MainPageState) => state.title
);
