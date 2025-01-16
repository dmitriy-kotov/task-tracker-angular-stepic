import {Component, Signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {selectPosts} from "./store/selector";
import {initialMainPageState} from "./store/state";
import {Post} from "../../serviceAPI/service-page/main-page-service/main-page-interface";
import {getPostAction} from "./store/action";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  posts: Signal<Post[]>;
  constructor(private store: Store) {
    this.store.dispatch(getPostAction()); //Наш action который начинает весь поток действий который мы описали выше.

    this.posts = toSignal(
      this.store.select(selectPosts),
      {initialValue: initialMainPageState.posts}
    )
  };
}
