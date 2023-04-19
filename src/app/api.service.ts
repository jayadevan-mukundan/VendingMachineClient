import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json, charset=utf-8',
      'accept': 'text/plain',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'credentials': 'same-origin'
    }),
    timeout: 5000 // Set custom timeout in milliseconds
  };

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get<any>('https://localhost:7076/drink/drinklist');
  }

  saveItems(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:7076/drink/drinklist/save', data, this.httpOptions);
  }

  restock(): Observable<any> {
    return this.http.post<any>('https://localhost:7076/drink/drinklist/restock', null, this.httpOptions);
  }
}