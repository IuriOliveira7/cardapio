import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  cadastrarDados(dados: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados);
  }
  
}
