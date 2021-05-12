import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient, private appService: AppService) { }

  loginAuth( body: any ): Observable<any> {
    return this.http.post( this.appService.API_URL + 'author/login', body )
}
}
