import { ResponseAula } from './aulaResponse';
import { Aula } from './aula.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private readonly API = 'http://localhost:8080/turma';

  constructor(private http: HttpClient) { }

  getBuscarAula(aula: number): Observable<ResponseAula>{
      return this.http.get<ResponseAula>(`${this.API}/${aula}`);
  }

  postInserirAula(aula: Aula): Observable<ResponseAula>{
    return this.http.post<ResponseAula>(`${this.API}`, aula);
  }

  postEditarAula(aula: Aula): Observable<ResponseAula>{
    return this.http.post<ResponseAula>(`${this.API}`, aula);
  }
}
