import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTitle } from './store/action';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectTitle } from './store/selector';
import { initialMainPageState } from './store/state';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  title: Signal<string>;

  constructor(private store: Store) {
    this.title = toSignal(this.store.select(selectTitle), {
      initialValue: initialMainPageState.title,
    });
  }

  public setNewTitle(): void {
    this.store.dispatch(setTitle({ title: 'NEW TITLTE' }));
  }
}
