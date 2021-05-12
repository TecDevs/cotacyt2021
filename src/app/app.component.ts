import { Component, OnInit } from '@angular/core';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cotacyt2021';
  userData: {};
  constructor(public utilService: UtilService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem('autor-data'));
  }
  ngOnInit(): void {
    if (this.userData) {
      this.router.navigateByUrl('app/user/register-project');
    }
  }
}
