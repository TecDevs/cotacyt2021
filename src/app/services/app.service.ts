import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // TODO: api url
  API_URL = 'http://localhost/APIS-CORAZAI-2.0/author/';
  constructor() { }
}
