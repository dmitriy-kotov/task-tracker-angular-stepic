import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as rxThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Post} from "./main-page-interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  /**
   * Получить список постов
   * @returns Observable<Post[]>
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Ошибка на стороне клиента или сети
      console.error('Произошла ошибка:', error.error.message);
    } else {
      // Бэкенд вернул неуспешный ответ
      console.error(
        `Бэкенд вернул код ${error.status}, ` +
        `тело ответа: ${error.error}`);
    }
    // Возвращаем наблюдаемый с сообщением об ошибке для пользователя
    return rxThrowError(() => new Error('Что-то пошло не так; пожалуйста, попробуйте снова позже.'));
  }
}
