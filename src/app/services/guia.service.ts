import { Guia } from './../models/guia';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService, 
  ) { }
  
  postGuia(guia): Observable<any> {
    const url = `${this.apiService.API_URL + 'guia'}`;
    return this.http.post(url, guia, httpOptions)      
  }

  getGuia(): Observable<any> {
    return this.http.get(this.apiService.API_URL + 'guia', httpOptions)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getGuiaById(id: number): Observable<Guia> {
    const url = `${this.apiService.API_URL + 'guia'}/${id}`;
    return this.http.get<Guia>(url, httpOptions)
    .pipe(
      tap(guia => console.log(`fetched guia id=${id}`)),
      catchError(this.handleError<Guia>(`getGuiaById id=${id}`))
        
      
    )
  }  

  putGuia(guia): Observable<any> {
    const url = `${this.apiService.API_URL + 'guia'}`;
    return this.http.put(url, guia, httpOptions)
  }
  
  deleteGuiafugo(id: number): Observable<{}> {
    const url = `${this.apiService.API_URL + 'guia'}/${id}`;
    return this.http.delete(url, httpOptions)
  }
}