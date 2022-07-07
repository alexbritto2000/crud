import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

import { throwError } from "rxjs/internal/observable/throwError";

@Injectable()
export class TodoService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token"
    });

    this.headers = this.headers.set('Authorization', 'new aut');
  }

  getTodos() {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/todos`, {headers: this.headers })
      .pipe(map(data => data));
  }

  getTodoData(todoId: number = 1) {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        observe: "response"
      })
      .pipe(catchError(error => this.handleError(error)));
  }

  putTodoData(data: any) {
    return this.http.put(
      `https://jsonplaceholder.typicode.com/todos/${data.id}`,
      data
    );
  }

  postTodoData(data: any) {
    return this.http.post(`https://jsonplaceholder.typicode.com/todos`, data);
  }

  deleteTodoData(todoId: any) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
