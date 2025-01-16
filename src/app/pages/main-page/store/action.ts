import { createAction, props } from '@ngrx/store';
import {Post} from "../../../serviceAPI/service-page/main-page-service/main-page-interface";

export const getPostAction = createAction(
  '[Main Page] Get posts'
);

export const getPostSuccessAction = createAction(
  '[Main Page] Get posts success',
  props<{ posts: Post[] }>()
);

export const getPostErrorAction = createAction(
  '[Main Page] Set posts error',
);
