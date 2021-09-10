import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getAll(): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(this.appService.API_URL + 'category/get-all');
  }
}
