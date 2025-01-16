import {Post} from "../../../serviceAPI/service-page/main-page-service/main-page-interface";

export interface MainPageState {
  posts: Post[];
}

export const initialMainPageState: MainPageState = {
  posts: [],
}
