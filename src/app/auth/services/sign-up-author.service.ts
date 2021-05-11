import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpAuthorService {

  constructor(private http: HttpClient, private appService: AppService) { }
}
