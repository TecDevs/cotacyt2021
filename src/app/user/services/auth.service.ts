import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormProyectService {

  constructor( private http: HttpClient, private appService: AppService ) { }


  registerAuth( body: any ): Observable<any> {
      return this.http.post( this.appService.API_URL + '', body );
  }
}
