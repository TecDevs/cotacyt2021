import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpAuthorService {

  constructor(private http: HttpClient, private appService: AppService) { }

  registerAuth(body: any): Observable<any> {
    return this.http.post(this.appService.API_URL + 'author/create', body);
  }
}
