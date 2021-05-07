import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.scss']
})
export class FormProyectComponent implements OnInit {

  formRegisterProyect: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formRegisterProyect = this.fb.group({
      // TODO: add form parameters

      // informacion del proyecto

      // informacion del asesor
    });
  }
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
