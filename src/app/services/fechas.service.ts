import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getFechas(): Observable<any> {
    return this.http.get<any>(this.appService.API_URL + 'project/obtener-fechas');
  }
}
