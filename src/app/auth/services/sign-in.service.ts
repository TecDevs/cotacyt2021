import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient, private appService: AppService) { }
}
