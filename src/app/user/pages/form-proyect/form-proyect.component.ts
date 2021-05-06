import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.scss']
})
export class FormProyectComponent implements OnInit {

  constructor() { }
  autors = false;
  ngOnInit(): void {
  }
  changeModality(value: any): void {
    console.log(this.autors);
    if (value === '1') {
      this.autors = false;
    } else {
      this.autors = true;
    }
  }

}
