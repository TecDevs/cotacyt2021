import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LevelEnglish } from '../models/level-english.model';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class LevelEnglishService {

  constructor(private httt: HttpClient, private appService: AppService) { }

  getLevelsEnglish() {
    return [
      {idLevel: 0, level: '0% - 40%'},
      {idLevel: 1, level: '41% - 60%'},
      {idLevel: 2, level: '61% - 80%'},
      {idLevel: 3, level: '81% - 100%'},
    ];
  }
}
