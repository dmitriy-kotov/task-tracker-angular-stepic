import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MainPageState } from "./state";

// Указываем тип состояния при создании селектора
export const selectPostState = createFeatureSelector<MainPageState>('mainPage');

export const selectPosts = createSelector(
  selectPostState,
  (state: MainPageState) => state.posts
);
