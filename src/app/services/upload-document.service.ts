import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ModalityInterface } from '../models/modality.model';
import { ResponseInterface } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UploadDocument {

  constructor(private http: HttpClient, private appService: AppService) { }

  upload(body: any): Observable<any> {
    return this.http.post( this.appService.API_URL + 'project/upload-register-form', body, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
