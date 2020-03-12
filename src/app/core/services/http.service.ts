import { Injectable } from '@angular/core';
import { Base } from 'src/app/shared/models/base';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DialogService } from './dialog.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T extends Base> {
  protected url: string;

  constructor(
    private httpClient: HttpClient,
    public dialogService: DialogService,
  ) { }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + id)
      .pipe(catchError(this.handleError));
  }

  create(object: T): Observable<T> {
    return this.httpClient.post<T>(this.url, object)
      .pipe(catchError(this.handleError));
  }

  update(object: T): Observable<T> {
    return this.httpClient.put<T>(this.url + object.id, object)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned: ${err.error.message}`;
    }
    // TODO: mover a dialog.service
    Swal.fire({
      icon: 'error',
      title: 'Ups ...',
      text: '¡Algo salió mal!',
      showCloseButton: true,
      confirmButtonText: '¿Por qué tengo este problema?',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          `Code: ${err.status} (${err.error.error})`,
          errorMessage,
          'warning'
        );
      }
    });
    return throwError(errorMessage);
  }
}
