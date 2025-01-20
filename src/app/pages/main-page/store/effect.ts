import { Injectable } from '@angular/core';
import { Actions} from '@ngrx/effects';



@Injectable()
export class MainPageEffects {
  constructor(
    private actions$: Actions,
  ) {}
}
