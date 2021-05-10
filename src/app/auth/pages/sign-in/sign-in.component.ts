import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formSignIn = this.fb.group({
      // TODO: datos de login
    });
  }

  ngOnInit(): void {
  }

}
