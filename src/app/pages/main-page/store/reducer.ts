import { createReducer, on } from '@ngrx/store';
import {initialMainPageState} from "./state";
import {getPostSuccessAction} from "./action";

export const mainPageReducer = createReducer(
  initialMainPageState,
  on(getPostSuccessAction, (state, { posts }) =>
    ({
      ...state,
      posts: posts
    }))
);
