import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormProyectService {

  constructor(private http: HttpClient, private appService: AppService) { }
}
