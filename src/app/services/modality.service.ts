import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ModalityInterface } from '../models/modality.model';
import { ResponseInterface } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ModalityService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getAll(): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(this.appService.API_URL + 'modality/get-all');
  }
}
