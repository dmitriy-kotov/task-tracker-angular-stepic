import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { getPostAction, getPostSuccessAction, getPostErrorAction } from './action';
import { Post } from '../../../serviceAPI/service-page/main-page-service/main-page-interface';
import {PostService} from "../../../serviceAPI/service-page/main-page-service/main-page";

@Injectable()
export class MainPageEffects {
  getPost$;
  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {

    this.getPost$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getPostAction), // Фильтруем действия по типу getPost
        switchMap(() =>
          this.postService.getPosts().pipe(
            // При успешном получении постов, диспатчим getPostSuccess
            map((posts: Post[]) => getPostSuccessAction({posts})),
            // При ошибке диспатчим getPostError
            catchError((error) => {
              console.error('Ошибка при получении постов:', error);
              return of(getPostErrorAction());
            })
          )
        )
      )
    );
  }
}
