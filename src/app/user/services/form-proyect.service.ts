import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormProyectService {

  constructor(private http: HttpClient, private appService: AppService) { }

  registerProject( body: any ): Observable<any> {
    return this.http.post( this.appService.API_URL + 'project/create-one-author', body );
}
}
